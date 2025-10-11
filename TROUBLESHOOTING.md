# 🔍 **Troubleshooting Guide - ADO Markdown Mermaid Extension**

## **Current Status: v1.0.8 Published ✅**

### **If Context Menu "Open with Mermaid" Doesn't Work:**

#### **Method 1: Use the Hub Directly** (Most Reliable)
1. Navigate to your Azure DevOps project
2. Go to **Code** → **Mermaid Viewer** tab
3. In the "Repository File Path" field, enter the path to your markdown file (e.g., `/README.md`)
4. Click **"Load from Repository"**

#### **Method 2: Copy/Paste Method** (Always Works)
1. Open your `.md` file in Azure DevOps normally
2. Copy the raw markdown content
3. Go to **Code** → **Mermaid Viewer** tab  
4. Paste the content in the large text area
5. Click **"Render Preview"**

#### **Method 3: Use .mmd Files** (Direct Integration)
1. Rename your file from `.md` to `.mmd` (e.g., `README.md` → `README.mmd`)
2. The file will automatically render with Mermaid support when viewed

### **Why Context Menu Might Not Work:**

1. **Browser Caching**: Azure DevOps might cache the old extension version
   - **Fix**: Hard refresh (Ctrl+F5) or clear browser cache

2. **Extension Permissions**: The extension might need additional permissions
   - **Fix**: Check if the extension is properly installed and enabled

3. **File Context**: Context menu might not appear for all file types/locations
   - **Fix**: Try right-clicking on different `.md` files in various repo locations

4. **Azure DevOps Version**: Some Azure DevOps instances have different extension behaviors
   - **Fix**: Use the hub method as the universal fallback

### **Debugging Steps:**

1. **Check Extension Installation**:
   - Go to your Azure DevOps organization settings
   - Navigate to Extensions
   - Verify "ADO Markdown Mermaid" is installed and enabled

2. **Browser Console Debugging**:
   - Press F12 to open Developer Tools
   - Go to Console tab
   - Right-click on a `.md` file
   - Look for any error messages starting with "Context action called with:" or error messages

3. **Test Hub Functionality**:
   - Go to Code → Mermaid Viewer
   - Try the "Load Sample" button
   - Verify that Mermaid diagrams render correctly

### **Contact & Support:**

If none of these methods work, the issue might be:
- Azure DevOps organization-specific policies
- Browser compatibility issues  
- Extension marketplace sync delays

**Recommended Approach**: Use the **Hub method** (Method 1 above) as it's the most reliable and doesn't depend on context menu integration.

---

## **Success Confirmation:**

✅ **Extension Published**: v1.0.8 live on marketplace  
✅ **Hub Available**: Code → Mermaid Viewer tab  
✅ **File Loading**: Repository path loading functional  
✅ **Copy/Paste**: Manual content input working  
✅ **.mmd Support**: Direct file extension support active  

The extension provides multiple ways to achieve the same goal, ensuring users always have a working method to view markdown with Mermaid diagrams! 🎉
