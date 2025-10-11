# Changelog

All notable changes to the ADO Markdown Mermaid extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.9] - 2024-10-11

### Fixed
- 🔧 **Context Menu Restored**: Removed incorrect file extension constraints that were preventing the context menu from appearing
- 🧹 **Code Cleanup**: Fixed duplicate variable declarations in context action handler
- 🎯 **Simplified Navigation**: Streamlined context menu action to use direct URL navigation approach
- ⚡ **Better Error Handling**: Improved error messages with helpful guidance for users

## [1.0.8] - 2024-10-11

### Fixed
- 🔧 **Context Menu Navigation**: Improved context menu action with proper Azure DevOps navigation API
- 📂 **File Extension Constraints**: Added file extension constraints to context menu for better filtering
- 🔄 **Fallback Navigation**: Enhanced fallback navigation when primary navigation fails
- 🐛 **Error Handling**: Better error handling and user feedback for context menu actions

## [1.0.7] - 2024-10-11

### Added
- 🚀 **Alternative Solution**: Added multiple ways to view markdown with Mermaid diagrams
- 📍 **Context Menu Action**: Right-click on `.md` files to "Open with Mermaid"
- 🎯 **Dedicated Hub**: New "Mermaid Viewer" hub in the Code section for direct markdown viewing
- 📝 **Paste & Preview**: Hub allows pasting markdown content or loading from repository
- 📂 **File Path Loading**: Support for loading files directly via repository path
- 🔗 **URL Parameters**: Hub can auto-load files when called with `?filePath=` parameter
- 📋 **Sample Content**: Built-in sample markdown with various Mermaid diagram types

### Changed
- 🔧 **Simplified .md Support**: Removed complex override attempts, focused on .mmd files for direct rendering
- 🎨 **Enhanced UI**: Modern, responsive design for the hub interface
- 📦 **Multi-entry Build**: Webpack now builds separate bundles for each component

### Technical
- ✅ Works around Azure DevOps' built-in .md renderer limitation
- 🧩 Modular architecture with separate context actions, hub, and modal components
- 📈 Provides multiple user workflows for accessing Mermaid functionality

## [1.0.5] - 2024-10-11

### Added
- 📁 **Dual File Support**: Added support for both `.md` and `.mmd` file extensions
- 🧪 Test files for both formats to verify functionality
- 📄 Created sample `.mmd` file for testing Mermaid-specific markdown

### Fixed
- 🔧 **Critical Fix**: Restored complete working configuration from reference project
- ⚙️ Re-added essential `mimeTypes` and `defaultBehavior` properties that were incorrectly removed
- 🎯 Extension now matches exact working configuration from successful reference implementation

### Technical Changes
- Configuration now exactly matches proven working setup
- Support for both standard markdown (.md) and mermaid markdown (.mmd) files
- Maintained backward compatibility while expanding file type support

## [1.0.2] - 2024-10-11

### Fixed
- 🔧 **Critical Fix**: Corrected `vss-extension.json` manifest configuration
- 📝 Fixed description from ".mmd files" to ".md files" 
- ⚙️ Removed conflicting `mimeTypes` and `defaultBehavior` properties
- 🎯 Extension now properly registers and loads for markdown files

### Technical Changes
- Simplified extension manifest for better Azure DevOps compatibility
- Aligned configuration with working reference implementation

## [1.0.1] - 2024-10-11

### Fixed
- 🐛 Extension loading issue by reverting to `commonmark` library
- 🔧 Resolved compatibility problems that prevented Mermaid diagrams from rendering
- ✅ Extension now loads properly in Azure DevOps markdown files

### Technical Changes
- Reverted from `marked` library back to `commonmark` for stable HTML output
- Updated dependencies to include both `marked` and `commonmark` for future compatibility
- Maintained all existing Mermaid diagram support and markdown features

## [1.0.0] - 2024-10-11

### Added
- 🎉 Initial release of ADO Markdown Mermaid extension
- ✨ Mermaid diagram rendering support for Azure DevOps markdown files
- 📊 Support for all major Mermaid diagram types:
  - Flowcharts
  - Sequence diagrams
  - Class diagrams
  - State diagrams
  - Entity relationship diagrams
  - User journey diagrams
  - Gantt charts
  - Pie charts
  - Git graphs
  - Mind maps
- 📝 Enhanced markdown parsing using the `marked` library (v16.4.0)
- 🎨 Full markdown feature support including:
  - Tables with alignment
  - Task lists and checkboxes
  - Code blocks with syntax highlighting
  - Nested lists and blockquotes
  - Text formatting (bold, italic, strikethrough)
  - Links and inline code
- 🔧 Zero-configuration setup - works immediately after installation
- 🚀 Live rendering in Azure Repos file viewer
- 📱 Responsive design for all screen sizes
- 🎯 Seamless integration with existing markdown workflows

### Technical Details
- Built with webpack for optimized bundle size
- Uses Azure DevOps Extension SDK v4.0.2
- Mermaid.js v10.9.0 for diagram rendering
- Marked v16.4.0 for markdown parsing
- Supports `.md` file extensions
- Registered as `mermaid_renderer` content renderer

### Development Features
- 🛠️ Development server for local testing
- 📦 Automated build process with extension packaging
- 🧪 Comprehensive test markdown file with examples
- 📚 Complete documentation and marketplace overview

---

## About This Extension

**ADO Markdown Mermaid** transforms your Azure DevOps documentation by rendering interactive Mermaid diagrams directly in markdown files. Created by [Javier Ramos](https://github.com/javiramos1), this extension makes it easy to create and maintain visual documentation that stays in sync with your code.

### Links
- [GitHub Repository](https://github.com/javiramos1/ado-markdown-mermaid)
- [Report Issues](https://github.com/javiramos1/ado-markdown-mermaid/issues)
- [Mermaid Documentation](https://mermaid.js.org/)