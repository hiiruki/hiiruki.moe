---
title: "How to Configure RAID HDD on IBM Power System for AIX OS"
description: "How to configure RAID HDD on IBM Power System for AIX OS"
publishDate: "2025-11-15T20:06:28+07:00"
updatedDate: "2026-03-21T00:18:36+07:00"
tags: ["aix", "ibm", "unix", "raid", "storage"]
lang: "en"
pinned: true
draft: false
coverImage:
  src: "./images/cover.png"
  alt: "Cover image"
---

## Intro

Before installing AIX OS, we need to configure RAID HDD first. This is because AIX OS requires a RAID configuration to be installed. In this guide, we will use [RAID 5](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_5 "RAID 5 @ Wikipedia") configuration.

## Steps

1. Connect the server power cable to the power source
2. Turn on the server first
3. Make sure the monitor, keyboard, and mouse are connected to the server
4. Check the VGA compatibility between the server and the monitor

:::note
If the VGA is not compatible or not available, replace the VGA with one that is compatible with the monitor, follow these steps:
- Turn off the server first via putty
- Log in using the appropriate IP, user, and password
- Run the command `shutdown –F now`
- Wait until the lights on the server blink
- Make sure all power sources connected to the server are disconnected
- Open the server and install the VGA
- Reconnect the power source to the server and wait for the lights on the server to blink
- Turn the server back on by pressing the power button
:::

5. Insert the AIX Utility RAID CD/DVD
6. After the server turns on, the following display will appear:

	![](./images/raid_hdd_aix_1.jpeg)

7. Press <kbd>1</kbd> to select the next step to ***“SMS Menu”***
8. Press <kbd>3</kbd> to select the next step to ***“Continue to Password Entry”***

	![](./images/raid_hdd_aix_2.jpeg)

9. Type the default password **“admin”**

	![](./images/raid_hdd_aix_3.jpeg)

10. Press <kbd>5</kbd> to continue to ***“Select Boot Options”***

	![](./images/raid_hdd_aix_4.jpeg)

11. Press <kbd>1</kbd> to continue to ***“Select Install/Boot Device”***

	![](./images/raid_hdd_aix_5.jpeg)

12. Since this guide uses a CD/DVD device, press <kbd>2</kbd> to select ***“CD/DVD”***

	![](./images/raid_hdd_aix_6.jpeg)

13. Press <kbd>6</kbd> to select ***“List All Devices”***

	![](./images/raid_hdd_aix_7.jpeg)

14. Select ***“SATA CD-ROM”*** because the device used is CD/DVD, in this guide it is at number 17

	![](./images/raid_hdd_aix_8.jpeg)

15. Press <kbd>2</kbd> to select ***“Normal Mode Boot”***

	![](./images/raid_hdd_aix_9.jpeg)

16. The next step is a reboot process, here is the display:

	![](./images/raid_hdd_aix_10.jpeg)

17. After the reboot process is complete, press <kbd>F1</kbd> and press <kbd>Enter</kbd>

	![](./images/raid_hdd_aix_11.jpeg)

18. Select ***“Task Selection (Diagnostics, Advanced Diagnostics, Service Aids, etc.)”***

	![](./images/raid_hdd_aix_12.jpeg)

19. Select ***“RAID Array Manager”***

	![](./images/raid_hdd_aix_13.jpeg)

20. Select ***“IBM SAS Disk Array Manager”***

	![](./images/raid_hdd_aix_14.jpeg)

21. Select ***“List SAS Disk Array Configuration”*** to see the default Disk Array configuration

	![](./images/raid_hdd_aix_15.jpeg)

22. Select ***“sissas0”*** or ***“sissas1”*** according to the available RAID Available Controller inside

	![](./images/raid_hdd_aix_16.jpeg)

23. After opening the available RAID Controller, press <kbd>F3</kbd> to return to ***“IBM SAS Disk Array Manager”***

	![](./images/raid_hdd_aix_17.jpeg)

24. Next, select ***“Create an Array candidate pdisk and Format to RAID block size”***

	![](./images/raid_hdd_aix_18.jpeg)

25. Select ***“sissas0”*** or ***“sissas1”*** according to the available RAID Available Controller inside

	![](./images/raid_hdd_aix_19.jpeg)

26. Press <kbd>F7</kbd> to mark all available ***“hdisk”***, then press <kbd>Enter</kbd>

	![](./images/raid_hdd_aix_20.jpeg)

27. The next step is a format process, here is the display when the format process is in progress:

	![](./images/raid_hdd_aix_21.jpeg)

28. Here is the display when the format process is complete:

	![](./images/raid_hdd_aix_22.jpeg)

29. The next step to create a RAID Disk, select ***“Create a SAS Disk Array”***

	![](./images/raid_hdd_aix_23.jpeg)

30. Select ***“sissas0”*** or ***“sissas1”*** according to the available RAID Available Controller inside

	![](./images/raid_hdd_aix_24.jpeg)

31. Select the recommended RAID level <kbd>5</kbd>, then press <kbd>Enter</kbd>

	![](./images/raid_hdd_aix_25.jpeg)

32. Select Stripe Size **“256 Kb”**

	![](./images/raid_hdd_aix_26.jpeg)

33. Press <kbd>F7</kbd> to mark all available pdisks, then press <kbd>Enter</kbd>

	![](./images/raid_hdd_aix_27.jpeg)

	![](./images/raid_hdd_aix_28.jpeg)

	![](./images/raid_hdd_aix_29.jpeg)

	![](./images/raid_hdd_aix_30.jpeg)

34. After the above process is complete, check ***“List SAS Disk Array Configuration”*** again

	![](./images/raid_hdd_aix_31.jpeg)

35. The hard disk is now in RAID condition and ready for the OS installation process. After the process is complete, remove the AIX Utility RAID CD/DVD and insert the AIX CD/DVD

## References

- [RAID configuration on the IBM Power platform @ IBM](https://developer.ibm.com/articles/au-aix-raid/ "RAID configuration on the IBM Power platform @ IBM")
- [RAID 5 @ Wikipedia](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_5 "RAID 5 @ Wikipedia")
- [Creating a RAID disk array on PowerLinux @ IBM](https://www.ibm.com/support/pages/creating-raid-disk-array-powerlinux "Creating a RAID disk array on PowerLinux @ IBM")
