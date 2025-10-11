# Markdown & Mermaid Test

This document tests various markdown features with the **marked** parser.

## Text Formatting

This is a paragraph with **bold text**, *italic text*, ***bold and italic***, ~~strikethrough~~, and `inline code`.

> This is a blockquote.
> It can span multiple lines.
> > And even be nested!

---

## Lists

### Unordered List
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
    - Double nested item
- Item 3

### Ordered List
1. First item
2. Second item
   1. Nested numbered item
   2. Another nested item
3. Third item

### Task List
- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task

---

## Tables

| Feature | Status | Priority |
|---------|--------|----------|
| Markdown parsing | ✅ Working | High |
| Mermaid diagrams | ✅ Working | High |
| Tables | 🧪 Testing | Medium |
| Code blocks | ✅ Working | High |

### Alignment Test

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left         | Center         | Right         |
| Test         | Test           | Test          |

---

## Code Blocks

### JavaScript
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
  return true;
}
```

### Python
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

### Inline Code
Use the `marked.parse()` function to convert markdown to HTML.

---

## Links and Images

[Visit GitHub](https://github.com)

[Link with title](https://example.com "Example Website")

Auto-link: https://www.example.com

---

## Mermaid Diagrams

### Sequence Diagram
```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop HealthCheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```

### Flowchart
```mermaid
flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> E[Fix issue]
    E --> B
    C --> F[Deploy]
    F --> G[End]
```

### Mind Map
```mermaid
mindmap
  root((Markdown Test))
    Text Features
      Bold
      Italic
      Strikethrough
      Code
    Lists
      Ordered
      Unordered
      Tasks
    Advanced
      Tables
      Links
      Images
      Code Blocks
    Diagrams
      Mermaid
      Charts
      Flowcharts
```

### Gantt Chart
```mermaid
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1
    Research           :a1, 2024-01-01, 30d
    Design             :a2, after a1, 20d
    section Phase 2
    Development        :a3, after a2, 45d
    Testing            :a4, after a3, 15d
    section Phase 3
    Deployment         :a5, after a4, 10d
```

### Class Diagram
```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +String color
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat
```

---

## Nested Elements

1. **First Level**
   - Unordered nested
   - With *italic* text
   
2. **Second Level**
   > A blockquote inside a list
   > 
   > With multiple lines
   
3. **Third Level**
   ```javascript
   // Code block in a list
   const test = true;
   ```

---

## Horizontal Rules

Above

---

Below

***

Another one

___

Done!
