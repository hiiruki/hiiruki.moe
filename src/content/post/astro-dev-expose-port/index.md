---
title: "How to expose port in Astro dev server"
description: "How to expose port in Astro dev server"
publishDate: "2026-03-02T12:00:00+07:00"
updatedDate: ""
tags: ["astro", "dev", "port"]
lang: "en"
pinned: false
draft: false
# coverImage:
#   src: "./images/cover.gif"
#   alt: "Cover image"
---

## Intro

By default, Astro dev server only expose port to localhost. But sometimes we need to expose port to network so that other devices can access it. Here's how to do it.

## How to

Start the Astro dev server with the `--host` flag.

```bash typed
$ npx astro dev --host 0.0.0.0 --port 4321
```

Check the Windows firewall to make sure that the port is open

```cmd typed prompt="C:\Users\hiiruki>"
C:\Users\hiiruki> netstat -an | findstr 4321
TCP 127.0.0.1:4321 0.0.0.0:0 LISTENING
```




