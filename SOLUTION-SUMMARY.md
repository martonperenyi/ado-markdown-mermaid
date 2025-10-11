# Azure DevOps Markdown Mermaid Extension - Alternative Solutions

## 🎯 **Problem Solved**

Azure DevOps has a built-in markdown renderer for `.md` files that takes precedence over custom extensions. This extension provides **multiple alternative ways** to view markdown files with Mermaid diagram support.

## 📦 **Solution Architecture**

### Version 1.0.7 - Comprehensive Alternative Approach

Instead of fighting the built-in renderer, we provide users with multiple convenient ways to access Mermaid functionality:

#### 1. 📁 **Direct .mmd File Support** 
- **What**: Files with `.mmd` extension render automatically
- **How**: Rename `README.md` → `README.mmd`  
- **Why**: Azure DevOps doesn't have a built-in renderer for `.mmd` files
- **Result**: ✅ Automatic Mermaid rendering in file viewer

#### 2. 📝 **Context Menu Action**
- **What**: Right-click menu option "Open with Mermaid" for `.md` files
- **How**: Right-click any markdown file in Azure Repos
- **Why**: Provides direct access without file renaming
- **Result**: ✅ Opens markdown with Mermaid support in new tab

#### 3. 🎯 **Dedicated Mermaid Viewer Hub**
- **What**: New tab in Code section called "Mermaid Viewer"
- **How**: Navigate to Code → Mermaid Viewer tab
- **Why**: Centralized location for all Mermaid viewing needs
- **Features**:
  - Load files by repository path
  - Paste markdown content directly
  - Auto-render with live preview
  - Sample content for learning
  - URL parameter support for deep linking

## 🚀 **User Workflows**

### Workflow A: Quick File Viewing
```
1. Right-click .md file → "Open with Mermaid"
2. View rendered content with diagrams
```

### Workflow B: Dedicated Viewing
```
1. Go to Code → Mermaid Viewer hub  
2. Enter file path: `/docs/architecture.md`
3. Click "Load from Repository"
4. View with full Mermaid support
```

### Workflow C: Content Pasting
```
1. Copy markdown from anywhere
2. Go to Mermaid Viewer hub
3. Paste into text area
4. Auto-preview renders
```

### Workflow D: Direct .mmd Support
```
1. Rename file: `README.md` → `README.mmd`
2. View file normally in Azure Repos
3. Automatic Mermaid rendering
```

## 🛠 **Technical Implementation**

### Extension Contributions
```json
{
  "contributions": [
    {
      "id": "mermaid-renderer", 
      "type": "ms.vss-code-web.content-renderer",
      "fileExtensions": ["mmd"]  // Only .mmd for direct rendering
    },
    {
      "id": "mermaid-markdown-context-menu",
      "type": "ms.vss-web.action", 
      "targets": ["ms.vss-code-web.source-item-menu"]  // Context menu
    },
    {
      "id": "mermaid-hub",
      "type": "ms.vss-web.hub",
      "targets": ["ms.vss-code-web.code-hub-group"]  // Dedicated hub
    }
  ]
}
```

### Build Architecture
- **Multi-entry Webpack**: Separate bundles for each component
- **Modular Design**: Independent context actions, hub, and renderer
- **Shared Dependencies**: CommonMark + Mermaid core functionality

### File Structure
```
src/
├── index.js          # Main .mmd file renderer
├── context-action.js # Right-click menu handler  
├── hub.js           # Dedicated viewer hub
├── modal-viewer.js  # Modal dialog component
└── viewer.js        # Shared rendering logic
```

## 📊 **Success Metrics**

✅ **Extension works for .mmd files** - Direct rendering success  
✅ **Context menu provides .md access** - Alternative workflow  
✅ **Hub enables flexible viewing** - Power user workflow  
✅ **Multiple user preferences supported** - Comprehensive solution  
✅ **No Azure DevOps platform fighting** - Works with the system  

## 🎉 **Benefits of This Approach**

### For End Users
- **Choice**: Multiple ways to access functionality
- **Flexibility**: Works with existing `.md` files AND new `.mmd` files  
- **Convenience**: Right-click access, dedicated hub, direct rendering
- **Learning**: Sample content and real-time preview

### For Developers  
- **Maintainable**: No hacks or workarounds with platform internals
- **Scalable**: Each component is independent and testable
- **Robust**: Works with Azure DevOps as designed, not against it
- **Future-proof**: If Azure DevOps adds extension override support, easy to adapt

## 🔮 **Future Enhancements**

1. **Export Features**: Save rendered diagrams as SVG/PNG
2. **Collaborative**: Share hub links with pre-loaded content  
3. **Templates**: Common diagram templates and snippets
4. **Integration**: Deep links from work items to diagrams
5. **Themes**: Support for different Mermaid themes

This comprehensive approach solves the original problem while providing a superior user experience with multiple access methods.
