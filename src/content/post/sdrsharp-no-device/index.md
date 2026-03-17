---
title: "How to Fix Airspy SDR# No Device Selected Error"
description: "How to fix the Airspy SDR# No Device Selected error."
publishDate: "2024-01-06T07:28:21+07:00"
updatedDate: ""
coverImage:
  src: "./images/cover.webp"
  alt: "Cover image"
tags: ["SDRSharp", "Airspy", "SDR", "Troubleshooting", "RTL-SDR", "radio-frequency", "rtlsdr", "rtl2832", "SoftwareDefinedRadio"]
lang: "en"
pinned: false
draft: false
---

## Introduction

[Airspy SDR#](https://airspy.com/download/) is a software-defined radio (SDR) application that can be used to receive radio signals. This application is developed by [Airspy](https://airspy.com/).

## Prerequisite

You must already configure the USB driver using [Zadig](https://zadig.akeo.ie/). You can follow the steps in the [RTL-SDR.com guide](https://www.rtl-sdr.com/rtl-sdr-quick-start-guide/).

## Steps

### 1. Download the missing DLL file

You can download the missing DLL file from [here](https://s.id/RTL-SDR-DLL). In this case, we only need the `rtlsdr.dll` file.

### 2. Copy the `rtlsdr.dll` file to the SDR# folder

Copy the `rtlsdr.dll` file to the SDR# folder. Ex: `/path/to/sdrsharp-x86/`

![Copy rtlsdr.dll](./images/copy-rtlsdr-dll.webp)

### 3. Configure the RTL-SDR device in SDR#

Click the hamburger menu (☰) in the top left corner of the SDR# window. Then, click the `Source` button. Choose `RTL-SDR USB` in the `Source` dropdown menu.

![Configure RTL-SDR device](./images/configure-rtl-sdr-device.webp)

Then choose `Generic RTL2832U OEM (0)` in the Device dropdown

![Configure RTL-SDR device](./images/device.webp)

### 4. Start the Airspy SDR# using the `play` button.

Press the `play` button to start listening to the radio signals.

![Start SDR#](./images/start-sdrsharp.webp)

## References

- [[SOLVED] : No device selected in SDRSharp program using SDR DVB-T+DVD+FM by Titof Abdellatif ANFLOUS @ YouTube](https://youtu.be/AN9GBDfy0W0?si=t3G0a3HeRdPnxOxU)
- [RTL-SDR Quick Start Guide](https://www.rtl-sdr.com/rtl-sdr-quick-start-guide/)