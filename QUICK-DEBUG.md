# 🔍 Quick Debug Steps for Context Menu

## Test the Context Menu:

1. **Right-click on any .md file** in Azure DevOps repository
2. **Open Browser Developer Tools** (F12)  
3. **Go to Console tab**
4. **Right-click again** and look for console messages

## Expected Console Output:
```
Context action called with: {object with gitRepository, item, etc.}
```

## If You See Errors:
- Note the exact error message
- Check if the extension appears in your organization's extension list
- Verify the extension is enabled for your project

## Quick Test Commands:

### Check if extension files are loading:
```javascript
// In browser console, check if SDK is available:
console.log(window.SDK || 'SDK not loaded');
```

### Manual navigation test:
```javascript  
// Try to navigate to hub manually:
window.open('/YourProject/_apps/hub/javiramos1.ado-markdown-mermaid-enhanced.mermaid-hub', '_blank');
```

Replace 'YourProject' with your actual project name.

## Immediate Success Test:

**Go directly to:** `Code → Mermaid Viewer` tab and test the sample content to verify the extension is working.
