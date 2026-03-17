---
title: "Hugo Open External Link in New Tab and Add Rel Attribute"
description: "How to add a render hook for link in Hugo"
publishDate: "2023-09-10T19:38:50+07:00"
updatedDate: ""
lang: "en"
# coverImage:
#   src: "./images/cover.webp"
#   alt: "Cover image"
tags: ["hugo", "render-hook", "goldmark"]
pinned: false
draft: false
---

Hugo is using [goldmark](https://github.com/yuin/goldmark/) as its markdown renderer and has a [render hook](https://gohugo.io/templates/render-hooks/) feature.

Previously, Hugo uses [Blackfriday](https://github.com/russross/blackfriday) as its markdown renderer in version below `v0.60.0`. Check the [changelog](https://github.com/gohugoio/hugo/releases/tag/v0.60.0) for more information.

### Method 1 (No JavaScript)

Make a file `layouts/_default/_markup/render-link.html` and add the following code:

```html showLineNumbers title="render-link.html"
<a href="{{ .Destination | safeURL }}"
{{ with .Title}} title="{{ . }}"{{ end }}
{{ if strings.HasPrefix .Destination "http" }}
    target="_blank" rel="external nofollow noopener noreferrer"
{{ end }}>
    {{ .Text | safeHTML }}
</a>
```

### Method 2 (JavaScript)

Make a file `layouts/partials/extend_head.html` and add the following code:

```html showLineNumbers title="extend_head.html"
<script>
    document.addEventListener('DOMContentLoaded', function () {
        var links = document.getElementsByTagName("a");
        var i;
        for (i = 0; i < links.length; i++) {
            if (location.hostname !== links[i].hostname) {
                links[i].rel = "external nofollow noopener noreferrer";
                links[i].target = "_blank";
            }
        }
    });
</script>
```

## References

- https://gohugo.io/templates/render-hooks/
- https://discourse.gohugo.io/t/open-external-links-in-new-tab-window/34000?page=2
- https://agrimprasad.com/post/hugo-goldmark-markdown/
- https://www.petanikode.com/hugo-render-hooks/
