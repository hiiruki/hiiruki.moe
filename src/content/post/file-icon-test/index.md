---
title: "File Icon Test"
description: "Testing file icons in code blocks"
publishDate: "2026-03-02T12:00:00+07:00"
updatedDate: "2026-03-02T12:00:00+07:00"
tags: ["test", "markdown"]
lang: "id"
pinned: true
draft: false
# coverImage:
#   src: "./images/cover.webp"
#   alt: "Cover image"
---

```js title="line-markers.js" del={2} ins={3} {4}
export function demo() {
  console.log("deleted");
  console.log("inserted");
  return "neutral";
}
```

```ts title="file.ts"
export const demo = (): string => "ok";
```

```ruby title="file.rb"
def demo = "ok"
```

```python title="file.py"
def demo():
    return "ok"
```

```bash title="file.sh"
echo "ok"
```

```cpp title="file.cpp"
#include <iostream>
int main(){ std::cout << "ok\n"; }
```

```go title="file.go"
package main
func main() {}
```

```java title="file.java"
class Main { public static void main(String[] a) {} }
```

```c title="file.c"
int main(void){ return 0; }
```

```json title="data.json"
{ "ok": true }
```

```yaml title="config.yml"
ok: true
```

```sql title="query.sql"
SELECT 1;
```

```html title="index.html"
<p>ok</p>
```

```css title="styles.css"
body { }
```