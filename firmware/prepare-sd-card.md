---
title: Prepare SD Card
description: Prepare the Raspberry Pi SD card for the Dartsnut PixelDart and PixelBoard runtime environment.
permalink: /firmware/prepare-sd-card/
---

<div class="doc">
  <article class="doc-content" markdown="1">

# Prepare SD Card

Prepare a Raspberry Pi SD card for the Dartsnut PixelDart and PixelBoard runtime environment.

## 1. Install Raspberry Pi OS

Use the [Raspberry Pi Imager](https://www.raspberrypi.com/software/) to write Raspberry Pi OS to the SD card.
For this setup, choose **Raspberry Pi OS Lite (64-bit)**.

<div class="image-steps" markdown="1">

<figure markdown="1">
![Raspberry Pi Imager start screen]({{ '/assets/images/prepare-sd-card/01-open-imager.png' | relative_url }})
<figcaption>Open Raspberry Pi Imager and select Raspberry Pi 4.</figcaption>
</figure>

<figure markdown="1">
![Choose device button in Raspberry Pi Imager]({{ '/assets/images/prepare-sd-card/02-select-device.png' | relative_url }})
<figcaption>Select Raspberry Pi OS(other)</figcaption>
</figure>

<figure markdown="1">
![Raspberry Pi device selection dialog]({{ '/assets/images/prepare-sd-card/03-choose-device.png' | relative_url }})
<figcaption>Select Raspberry Pi OS Lite (64-bit)</figcaption>
</figure>

<figure markdown="1">
![Choose OS button in Raspberry Pi Imager]({{ '/assets/images/prepare-sd-card/04-select-os.png' | relative_url }})
<figcaption>Select your SD Card</figcaption>
</figure>

<figure markdown="1">
![Raspberry Pi Imager operating system menu]({{ '/assets/images/prepare-sd-card/05-choose-os-menu.png' | relative_url }})
<figcaption>Recommanded to use dartsnut as the hostname, unless you know what you are doing.</figcaption>
</figure>

<figure markdown="1">
![Raspberry Pi OS Other menu option]({{ '/assets/images/prepare-sd-card/06-raspberry-pi-os-other.png' | relative_url }})
<figcaption>Pick your timezone</figcaption>
</figure>

<figure markdown="1">
![Choose storage button in Raspberry Pi Imager]({{ '/assets/images/prepare-sd-card/08-select-storage.png' | relative_url }})
<figcaption>We use username: rpi, password: rpi as our machine default, some of our maintainence apps depends on this.</figcaption>
</figure>

<figure markdown="1">
![Storage selection dialog in Raspberry Pi Imager]({{ '/assets/images/prepare-sd-card/09-choose-storage.png' | relative_url }})
<figcaption>Input Wi-Fi details, SSID would be the wifi name.</figcaption>
</figure>

<figure markdown="1">
![Next button after device OS and storage are selected]({{ '/assets/images/prepare-sd-card/10-next.png' | relative_url }})
<figcaption>Enable SSH. Or the rest of the guide WON'T work.</figcaption>
</figure>

<figure markdown="1">
![OS customisation prompt]({{ '/assets/images/prepare-sd-card/11-os-customisation.png' | relative_url }})
<figcaption>Your choice if you want to enable raspberry pi connect, we don't depend on it.</figcaption>
</figure>

<figure markdown="1">
![Confirm write warning dialog]({{ '/assets/images/prepare-sd-card/12-confirm-write.png' | relative_url }})
<figcaption>Confirm the write operation. This erases the selected SD card.</figcaption>
</figure>

<figure markdown="1">
![Writing progress in Raspberry Pi Imager]({{ '/assets/images/prepare-sd-card/13-writing.png' | relative_url }})
<figcaption>Wait while Raspberry Pi Imager writes and verifies the image.</figcaption>
</figure>

<figure markdown="1">
![Raspberry Pi Imager write complete screen]({{ '/assets/images/prepare-sd-card/14-finished.png' | relative_url }})
<figcaption>When the write is complete, eject the SD card and insert it into the Raspberry Pi.</figcaption>
</figure>

</div>

## 2. SSH Into the Raspberry Pi

After the Raspberry Pi boots and joins Wi-Fi, SSH into it from your computer:

```bash
ssh rpi@dartsnut.local
```

When prompted, use the password configured in Raspberry Pi Imager. The default in this guide is `rpi`.

Make sure there is only one `dartsnut` machine on the network when using `dartsnut.local`. If multiple devices share the same hostname, the local name can resolve to the wrong Raspberry Pi.

## 3. Install Git

```bash
sudo apt update
sudo apt install git
```

## 4. Clone the Project Repository

```bash
sudo mkdir /home/rpi
cd /home/rpi/
sudo git clone https://github.com/Dartsnut/dartsnut_rpi.git 
```

## 5. Run the Setup Script

```bash
cd /home/rpi/dartsnut_rpi
sudo chmod +x setup.sh
sudo ./setup.sh
```

## 6. Configure Device Information

After installation, edit the device configuration file:

```bash
sudo vi /home/rpi/dartsnut_rpi/device.json
```

Paste the following content according to your device type:

**PixelBoard:**
```json
{"name": "PixelBoard", "serial": "1234567890", "model": "PixelBoard", "brightness": "100", "volume": "100"}
```

**PixelDart:**
```json
{"name": "PixelDart", "serial": "1234567890", "model": "PixelDart", "brightness": "100", "volume": "100"}
```

## 7. Reboot the Device

```bash
sudo reboot
```

## Logs

- **Python service:** `journalctl -u dartsnut_python.service`

---

For questions, please refer to the project repository or contact the developer.

</article>
</div>
