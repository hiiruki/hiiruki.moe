---
title: "How to Install AIX OS on IBM Power System"
description: "How to install AIX OS on IBM Power System"
publishDate: "2025-11-16T22:38:48+07:00"
updatedDate: "2026-04-26T06:24:00+07:00"
tags: ["aix", "ibm", "unix"]
lang: "en"
pinned: true
draft: false
coverImage:
  src: "./images/cover.png"
  alt: "Cover image"
---

## Intro

[AIX](https://en.wikipedia.org/wiki/IBM_AIX "IBM AIX @ Wikipedia") is a Unix operating system developed by IBM for its Power Systems hardware. It is a proprietary operating system that is used in enterprise environments for high-availability and mission-critical applications.

In my company, we use AIX OS as the base operating system for our production servers running [IBM Db2](https://en.wikipedia.org/wiki/IBM_Db2 "IBM DB2 @ Wikipedia"). Database workloads are separated from application and hypervisor layers, which improves both security and performance.

The latest hardware we use is IBM [Power S924](https://www.ibm.com/docs/en/power9/9009-42A "IBM Power S924 @ IBM") a.k.a [Power9](https://en.wikipedia.org/wiki/POWER9 "POWER9 @ Wikipedia") server.

It is a very stable operating system and we have never had any issues with it.

## Steps

1. Insert AIX CD/DVD

2. Press <kbd>1</kbd> to select the next step to ***“SMS Menu”***

	![](./images/install_aix_1.jpeg)

3. Press <kbd>3</kbd> to select the next step to ***“Continue to Password Entry”***

	![](./images/install_aix_2.jpeg)
	
4. Type the default password **“admin”**

	![](./images/install_aix_3.jpeg)
	
5. Press <kbd>5</kbd> to continue to ***“Select Boot Options”***

	![](./images/install_aix_4.jpeg)

6. Press <kbd>1</kbd> to continue to ***“Select Install/Boot Device”***

	![](./images/install_aix_5.jpeg)

7. Since this guide uses a CD/DVD device, press <kbd>2</kbd> to select ***“CD/DVD”***

	![](./images/install_aix_6.jpeg)

8. Press <kbd>6</kbd> to select ***“List All Device”***

	![](./images/install_aix_7.jpeg)

9. Select ***“SATA”*** because the device used is CD/DVD

10. Select **_“Normal Boot”_** and wait for the reboot process to complete

11. Press <kbd>1</kbd> and press <kbd>Enter</kbd>

	![](./images/install_aix_8.png)

12. Press <kbd>2</kbd> to continue to ***“Change/Show Installation Settings and Install”***, and press <kbd>Enter</kbd>

	![](./images/install_aix_9.png)

13. Change ***“Select Edition”*** to ***“Enterprise”***

	Press <kbd>5</kbd> then press <kbd>Enter</kbd> until it changes to ***“Enterprise”***
	If RAID, press <kbd>1</kbd> to set the use of hard disk for OS and installation type
	If not RAID, press <kbd>0</kbd> to install
	
	And make sure to press <kbd>4</kbd> to ensure the FTP/IP installation is **“yes”**

	![](./images/install_aix_10.jpeg)

14. Press <kbd>1</kbd> to continue to ***“Continue with Installed”***

	![](./images/install_aix_11.jpeg)

	![](./images/install_aix_12.jpeg)

15. After the installation is complete, it will enter the AIX OS. Next, enter the initial server setting process

	![](./images/install_aix_13.png)

16. Click ***“Accept”*** on the following screen

	![](./images/install_aix_14.jpeg)

17. Click ***“Next”*** on the following screen

	![](./images/install_aix_15.jpeg)

18. Click ***“Next”*** on the following screen

	![](./images/install_aix_16.jpeg)

19. Set the date, time, and time zone to **+7 (THAIST)**. Then click ***“Next”***

	![](./images/install_aix_17.jpeg)

20. Set the desired password, and click ***“Next”***

	![](./images/install_aix_18.jpeg)

21. Select ***“Manually configure TCP/IP”***, and click ***“Next”***

	![](./images/install_aix_19.jpeg)

22. Fill in the ***“Host name”*** and ***“IP Address	”***, and click ***“Next”***

	![](./images/install_aix_20.png)

23. Select ***“Network Interface (en0 01-00 Standart Ethernet Network Interface)”***, and click ***“Next”***

	![](./images/install_aix_21.jpeg)

24. Skip the following section, and click ***“Next”***

	![](./images/install_aix_22.jpeg)

25. Click ***“Next”*** on the following screen

	![](./images/install_aix_23.png)

	![](./images/install_aix_24.png)

	![](./images/install_aix_25.jpeg)

26. Select ***“Finish now, and do not start Configuration Assistant when restarting the operating system”***, and click ***“Finish”***

	![](./images/install_aix_26.jpeg)

27. After the process is complete, remove the AIX CD/DVD and turn off the server first

28. Turn on the server again, open the terminal again

	Or it can also be done remotely using the server's IP Address via the xmanager application on a laptop/PC. To perform disk settings, open putty on a laptop/PC using the server's IP Address and user root

29. Run the `topas` command <br>
	Check the default size of paging space 512 M, change the **Number of Additional logical partitions** to **100** using the `smitty chps` command

30. First check the existing disks using the `df -g` command

31. Change the GB blocks of mounted `/`, `/usr`, `/var` and `/tmp` to **5**, `/home` to **100** and `/opt` to **20**, using the `chfs -a size=+(value to add)G (mounted name)` command

	:::note
	- If the value is positive (+), it will increase the GB blocks<br>
	- If the value is negative (-), it will decrease the GB blocks
	:::

	Example :<br>
	`chfs -a size=+25G /data`<br>
	`chfs -a size=-25G /logpath`

	Or<br>

	`chfs -a size=+4G /var`

	GB Blocks of `/var` is 1.00, to make it 5.00 requires an additional 4.00 GB

	![](./images/install_aix_27.jpeg)

32. Perform Security Limits Settings,
using the `vi /etc/security/limits` command

33. Update the default value of limits to the following value:

	![](./images/install_aix_28.jpeg)

34. To delete, press <kbd>esc</kbd> then press <kbd>x</kbd><br>
To type, press <kbd>esc</kbd> then press <kbd>i</kbd><br>
To delete a line, press <kbd>esc</kbd> then press <kbd>dd</kbd><br>
To save, press <kbd>esc</kbd> then press <kbd>:wq!</kbd><br>
To exit without saving, press <kbd>esc</kbd> then press <kbd>:q!</kbd>

35. Use the `smitty` command, then select ***“System Environment”*** and press <kbd>Enter</kbd>

	![](./images/install_aix_29.png)

36. Select ***“Change / Show Characteristics of Operating System”*** and press <kbd>Enter</kbd>

	![](./images/install_aix_30.jpeg)

37. Change ***“Maximum number of PROCESSES allowed per user”*** to ***“4096”*** and press <kbd>Enter</kbd>

	![](./images/install_aix_31.jpeg)

38. Select ***“Change / Show Date and Time”*** and press <kbd>Enter</kbd>

	![](./images/install_aix_32.png)

39. Select ***“Change Time Zone Using User Inputted Values”*** and press <kbd>Enter</kbd>

	![](./images/install_aix_33.png)

40. Leave the ***“Day Light Saving Time ID”*** field empty and press <kbd>Enter</kbd>

	![](./images/install_aix_34.png)

41. Use the `smitty device` command, then select ***“I/O Completion Ports”*** and press <kbd>Enter</kbd>

	![](./images/install_aix_35.png)

42. Select ***“Change / Show Characteristics of I/O Completion Ports”***
Change ***“STATE to be configured at system restart”*** to ***“Available”*** and press <kbd>Enter</kbd>

	![](./images/install_aix_36.png)

	Ensure that ***“Configure Defined I/O Completion Ports”*** is also set to ***“Available”***

	![](./images/install_aix_37.png)

43. Restart server using the `shutdown -Fr now` command

44. Congratulations! The AIX OS installation process is complete.






## References

- [IBM AIX @ IBM](https://www.ibm.com/products/aix "IBM AIX @ IBM")
- [IBM AIX @ Wikipedia](https://en.wikipedia.org/wiki/IBM_AIX "IBM AIX @ Wikipedia")
- [IBM Power S924 @ IBM](https://www.ibm.com/docs/en/power9/9009-42A "IBM Power S924 @ IBM")
- [POWER9 @ Wikipedia](https://en.wikipedia.org/wiki/POWER9 "POWER9 @ Wikipedia")
- [IBM Db2 @ Wikipedia](https://en.wikipedia.org/wiki/IBM_Db2 "IBM DB2 @ Wikipedia")
- [IBM Db2 @ IBM](https://www.ibm.com/products/db2-database "IBM Db2 @ IBM")