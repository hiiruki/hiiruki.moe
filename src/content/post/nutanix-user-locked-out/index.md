---
title: "Fix Nutanix Prism Central User Locked Out Error"
description: "Fix Nutanix Prism Central User Locked Out Error"
publishDate: "2025-12-22T21:40:30+07:00"
updatedDate: "2026-03-21T03:35:00+07:00"
tags: ["nutanix", "prism-central"]
lang: "en"
pinned: false
draft: false
# coverImage:
#   src: "./images/cover.png"
#   alt: "Cover image"
---

## Intro

When I try login to Nutanix Prism Central I got this error:

:::warning
We encountered a user locked out error. Please try again.
:::

This is caused by too many incorrect login attempt.

![Nutanix user locked out error](./images/nutanix-user-locked-out-error.png)

## Solution

SSH to Nutanix CVM and login as `nutanix`

![SSH CVM Nutamix](./images/ssh-cvm-nutanix.png)

Run this command to resetting (unlocking) the login failure lock for the `admin` user on all CVMs in the cluster

```bash
allssh sudo faillock --user admin --reset
```

![ faillock](./images/faillock.png)

Now try to login again, now you can view the Nutanix Prism Central again.

![Dashboard Nutanix](./images/dashboard-nutanix.png)