# Changelog

All notable changes to the ADO Markdown Mermaid extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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