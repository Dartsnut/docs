---
title: App Interaction
description: App interaction notes for Dartsnut firmware.
permalink: /firmware/app-interaction/
---

<div class="doc">
  <article class="doc-content" markdown="1">

# App Interaction

This page summarizes the app-facing interaction points exposed by the
Dartsnut Raspberry Pi firmware.

Use Bluetooth Low Energy (BLE) for first-time setup and recovery when the
device may not be on Wi-Fi yet. Once the device is connected to the same local
network as the app, use the WebSocket API for normal device management.

## Interaction Flow

1. Find and connect to the device over BLE.
2. Use BLE to scan for Wi-Fi, connect to Wi-Fi, and confirm the assigned IP
   address.
3. Open a WebSocket connection to the device IP on the local network.
4. Use WebSocket actions for settings, app/game management, Bluetooth
   peripheral management, system status, updates, and runtime control.

## Bluetooth Setup API

The firmware exposes a Nordic UART-style BLE service for JSON messages.

| Item | Value |
| --- | --- |
| Service UUID | `6E400001-B5A3-F393-E0A9-E50E24DCCA9E` |
| RX characteristic, app to device | `6E400002-B5A3-F393-E0A9-E50E24DCCA9E` |
| TX characteristic, device to app | `6E400003-B5A3-F393-E0A9-E50E24DCCA9E` |
| RX properties | `write`, `write-without-response` |
| TX properties | `notify` |

The app acts as the BLE central. The Dartsnut device acts as the peripheral.
The device advertises as `{model}-{last 2 octets of BLE MAC}`, for example
`PixelDart-eeff` or `PixelBoard-a1b2`. Apps can scan by model prefix and show
the suffix to distinguish nearby devices.

### BLE Connection Steps

1. Scan for peripherals whose name starts with the expected model, such as
   `PixelDart` or `PixelBoard`.
2. Connect to the peripheral.
3. Discover the UART service and RX/TX characteristics by UUID.
4. Enable notifications on the TX characteristic.
5. Write UTF-8 JSON commands to RX.
6. Parse UTF-8 JSON responses from TX notifications.

```text
scanForPeripherals(namePrefix = "Pixel")
connect(peripheral)
discoverService(UART_SERVICE_UUID)
rx = discoverCharacteristic(RX_CHARACTERISTIC_UUID)
tx = discoverCharacteristic(TX_CHARACTERISTIC_UUID)
enableNotifications(tx)

write(rx, JSON.stringify({ command: "wifi_status" }))

onNotify(tx, data => {
  const msg = JSON.parse(utf8Decode(data))
})
```

### BLE Message Format

Requests are JSON objects with a required `command` field.

```json
{ "command": "wifi_status" }
```

```json
{
  "command": "connect_wifi",
  "ssid": "MyWiFi",
  "password": "secret123"
}
```

Successful responses include the original `command` plus command-specific
fields.

```json
{
  "command": "connect_wifi",
  "status": "success",
  "ip_address": "192.168.0.42"
}
```

Errors use the same shape as the WebSocket API, with an added `command` field
for BLE correlation.

```json
{
  "action": "connect_wifi",
  "error": "The WiFi password is incorrect (20-08)",
  "error_code": "2008",
  "command": "connect_wifi"
}
```

### BLE Commands

| Command | Purpose | Notes |
| --- | --- | --- |
| `scan_wifi` | Scan nearby Wi-Fi networks. | Results may arrive across multiple notifications. The final notification includes `end: true`. |
| `enable_wifi` | Turn Wi-Fi on. | Returns `status: "success"` when enabled. |
| `wifi_status` | Read Wi-Fi enabled/connected state, SSID, and IP address. | Use after onboarding to get the WebSocket host IP. |
| `connect_wifi` | Connect to Wi-Fi using `ssid` and `password`. | Returns `ip_address` on success. |
| `reconnect_wifi` | Force Wi-Fi reconnect. | Returns the current IP address on success. |
| `device_info` | Read device metadata. | Includes fields from `device.json` plus the Wi-Fi MAC address. |
| `locate_device` | Trigger device-side locate behavior. | The visible/audible effect depends on the firmware host. |

For `scan_wifi`, accumulate `networks` across notifications until
`end: true`.

```json
{ "command": "scan_wifi", "networks": ["SSID1", "SSID2"] }
```

```json
{ "command": "scan_wifi", "networks": ["LastSSID"], "end": true }
```

## WebSocket Management API

After the device is on Wi-Fi, the app should use WebSocket for richer and
higher-throughput operations.

| Item | Value |
| --- | --- |
| Transport | WebSocket over TCP |
| Host | Device IP address on the same LAN |
| Port | `9251` |
| Path | `/ws` |
| URL format | `ws://<device-ip>:9251/ws` |
| Subprotocol | None required |

```text
const ws = new WebSocket("ws://192.168.0.42:9251/ws")

ws.onopen = () => {
  ws.send(JSON.stringify({
    action: "get_device_info",
    req_id: "1"
  }))
}

ws.onmessage = event => {
  const msg = JSON.parse(event.data)
}
```

### WebSocket Message Format

Requests are JSON objects with an `action` field. Include a client-generated
`req_id` so the app can match responses to in-flight requests.

```json
{
  "action": "set_brightness",
  "req_id": "42",
  "brightness": 80
}
```

Successful responses include the `action`, the copied `req_id`, and any
action-specific data.

```json
{
  "action": "get_brightness",
  "brightness": 80,
  "req_id": "42"
}
```

Errors include `error` and `error_code`.

```json
{
  "action": "set_brightness",
  "error": "The brightness value is invalid (30-05)",
  "error_code": "3005",
  "req_id": "42"
}
```

### Common WebSocket Actions

#### Device Settings

| Action | Purpose |
| --- | --- |
| `get_device_info` | Read device name, serial, model, brightness, volume, MAC address, and SSID. |
| `set_device_name` | Update the device name stored in `device.json`. |
| `get_brightness` / `set_brightness` | Read or set display brightness. Raw brightness is `10` to `100`. |
| `get_volume` / `set_volume` | Read or set device volume, `0` to `100`. |
| `get_dim_window` / `set_dim_window` | Read or configure automatic dimming. |
| `set_time_zone` | Set the device time zone. |
| `locate_device` | Trigger locate behavior. |
| `reload_conf` | Ask firmware to reload configuration. |

```json
{
  "action": "set_dim_window",
  "req_id": "16",
  "dim_window_start": "22:00",
  "dim_window_end": "07:00",
  "dim_level": 10,
  "dim_restore_seconds": 30,
  "dim_window_enabled": true
}
```

#### App And Game Management

| Action | Purpose |
| --- | --- |
| `list_apps` | List installed apps/games. |
| `send_file` | Upload a base64-encoded file into the device `apps` directory. |
| `get_file` | Download a base64-encoded file from the device `apps` directory. |
| `read_json` / `write_json` | Read or write base64-encoded JSON under `apps`. |
| `create_directory` / `remove_directory` | Create or remove an app/game directory. |
| `list_files` | List files under an app/game directory. |
| `get_file_md5` | Read a file checksum. |
| `download_app` | Download and install an app/game. |
| `get_download_progress` | Poll download status for one or more game IDs. |
| `start_game` | Launch a game by `game_id`. |
| `get_widgets_screen` | Fetch current widget framebuffer data. |

For downloads, prefer the async pattern: call `download_app`, then poll
`get_download_progress` every 1 to 3 seconds until the status is completed or
an error is returned.

```json
{
  "action": "download_app",
  "req_id": "40",
  "game_id": "my_game",
  "url": "https://example.com/my_game.tar.gz",
  "md5": "abc123..."
}
```

```json
{
  "action": "get_download_progress",
  "req_id": "41",
  "game_ids": ["my_game"]
}
```

#### Bluetooth Peripheral Management

These WebSocket actions manage other Bluetooth devices, such as controllers,
speakers, or headphones, through the Raspberry Pi host Bluetooth stack.

| Action | Purpose |
| --- | --- |
| `bluetooth_scan` | Scan for nearby Bluetooth peripherals. |
| `bluetooth_list` | List paired peripherals. |
| `bluetooth_connect` | Pair, trust, and connect to a peripheral by MAC address. |
| `bluetooth_remove` | Unpair and disconnect a peripheral by MAC address. |

```json
{
  "action": "bluetooth_connect",
  "req_id": "33",
  "address": "AA:BB:CC:DD:EE:FF"
}
```

#### Network And System Control

| Action | Purpose |
| --- | --- |
| `get_wifi_rssi` | Read Wi-Fi signal strength. |
| `forget_wifi` | Clear saved Wi-Fi connections and reset Wi-Fi. |
| `reboot` | Reboot the device. |
| `get_ssh_status` | Check SSH service status. |
| `start_ssh` / `stop_ssh` | Start or stop SSH. |
| `get_version` | Read the installed firmware version. |
| `check_update` | Check for a newer firmware version. |
| `perform_update` | Run a firmware update. |

Some system actions are fire-and-forget. `forget_wifi` and `reboot` may close
the connection or may not return a final structured response.

## Client Behavior Notes

- Use BLE for onboarding and recovery; use WebSocket for normal operation.
- Always include `req_id` in WebSocket requests.
- Treat any response with `error_code` as a failure, even if other fields are
  present.
- Use generous BLE timeouts for Wi-Fi operations, typically 10 to 30 seconds.
- Debounce BLE commands such as `scan_wifi` and `wifi_status`.
- Keep BLE payloads small. Wi-Fi scan responses are chunked to fit BLE
  notification limits.
- Avoid tight polling for long-running WebSocket actions. Poll download
  progress every 1 to 3 seconds.
- The WebSocket API is intended for trusted local networks. Add your own
  authentication or transport protection if exposing it outside a private LAN.

</article>
</div>
