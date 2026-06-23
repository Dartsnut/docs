---
title: Deploy To Machine
description: Machine deployment notes for Dartsnut emulator and agent workflows.
permalink: /emulator-agent/deploy-to-machine/
---

<div class="doc">
  <article class="doc-content" markdown="1">

# Deploy To Machine

Use the Deploy panel to run the active workspace on a real Dartsnut machine.
Deploy is intended for testing the current game or widget on hardware after it
already works in the emulator.

The Deploy panel appears when the active workspace has a valid `conf.json`.

## Basic Flow

1. Create, save, or open the game or widget workspace you want to test.
2. Run it in the emulator first.
3. Open the **Deploy** panel.
4. Choose a bound device, or enter the device IP address manually.
5. Click **Connect**.
6. After the panel shows **Connected**, click **Run**.
7. Watch the remote log while testing on the machine.
8. Click **Reload** after making changes.
9. Click **Stop** when you are done testing.
10. Click **Disconnect** before moving to another machine or closing the app.

## Selecting A Machine

If you are signed in and have bound devices, choose one from **Bound device**.
When the device has reported an IP address, the app fills it in automatically.

Use **Enter IP manually** when:

1. You are not signed in.
2. The device is not bound to your account.
3. The bound device has not reported an IP address yet.
4. You already know the target IP or hostname.

The machine must be on the same network and reachable from your computer.

## Connection Controls

| Control | What it does |
| --- | --- |
| Connect | Connects to the selected machine and prepares it for a debug run. |
| Disconnect | Ends the connection and returns the machine to normal runtime behavior. |
| Run | Sends the active workspace to the machine and starts it. |
| Reload | Restarts the current machine run after changes. |
| Stop | Stops the debug run and restores the normal device runtime. |

## Widget Parameters

For widget workspaces, the Deploy panel includes the same parameter editor as
the Emulator panel.

1. Edit the widget parameters.
2. Click **Apply + Reload**.
3. Check the machine and remote log.

Use this to test the same widget with different field values on hardware.

## Local Network Permission

On macOS, the first connection may trigger a Local Network permission prompt.
Allow Dartsnut Agent, then retry the connection. If needed, use the panel button
to open System Settings and enable Dartsnut Agent under Local Network.

## When To Deploy

Deploy to a machine when:

1. The emulator flow already works.
2. You need to check real display, controls, audio, or device behavior.
3. You are validating a final version before review.
4. You are reproducing an issue that only happens on hardware.

</article>
</div>
