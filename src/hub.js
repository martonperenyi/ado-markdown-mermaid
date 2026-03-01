import * as SDK from "azure-devops-extension-sdk";
import { marked } from "marked";
import Mermaid from "mermaid";

class MermaidHub {
    constructor() {
        this.initialized = false;
        this.init();
    }

    async init() {
        try {
            await SDK.init();
            
            // Initialize Mermaid
            Mermaid.initialize({ 
                startOnLoad: false,
                theme: 'default',
                securityLevel: 'loose'
            });

            this.setupEventListeners();
            this.checkUrlParameters();
            this.initialized = true;
            
            console.log('Mermaid Hub initialized successfully');
        } catch (error) {
            console.error('Error initializing Mermaid Hub:', error);
            this.showMessage('Failed to initialize hub: ' + error.message, 'error');
        }
    }

    checkUrlParameters() {
        // Check URL parameters — passed from context action or direct navigation
        // The hub runs in an iframe; parameters may be on the iframe URL or the parent URL
        const iframeParams = new URLSearchParams(window.location.search);
        const parentParams = new URLSearchParams(window.top.location.search);

        const filePath = iframeParams.get('filePath') || parentParams.get('filePath');
        const repoName = iframeParams.get('repo') || parentParams.get('repo');

        if (filePath) {
            document.getElementById('file-path').value = filePath;
        }
        if (repoName) {
            document.getElementById('repo-name').value = repoName;
        }
        if (filePath) {
            setTimeout(() => this.loadFileFromRepository(), 1000);
        }
    }

    setupEventListeners() {
        // Render button
        document.getElementById('render-btn').addEventListener('click', () => {
            this.renderMarkdown();
        });

        // Clear button
        document.getElementById('clear-btn').addEventListener('click', () => {
            this.clearContent();
        });

        // Load sample button
        document.getElementById('load-sample-btn').addEventListener('click', () => {
            this.loadSample();
        });

        // Load file button
        document.getElementById('load-file-btn').addEventListener('click', () => {
            this.loadFileFromRepository();
        });

        // Auto-render on textarea changes (debounced)
        let timeout;
        document.getElementById('markdown-input').addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => this.renderMarkdown(), 1000);
        });
    }

    renderMarkdown() {
        try {
            const content = document.getElementById('markdown-input').value;
            
            if (!content.trim()) {
                this.showMessage('Please enter some markdown content', 'error');
                return;
            }

            // Parse markdown to HTML
            let resultHtml = marked(content);
            
            // Create container for rendered content
            const previewContainer = document.getElementById('preview-content');
            previewContainer.innerHTML = resultHtml;
            
            // Find and process Mermaid code blocks
            const mermaidBlocks = previewContainer.querySelectorAll('pre > code.language-mermaid');
            
            if (mermaidBlocks.length > 0) {
                mermaidBlocks.forEach((block, index) => {
                    // Get the mermaid source code
                    const mermaidCode = block.textContent;
                    
                    // Create a div to replace the code block
                    const mermaidDiv = document.createElement('div');
                    mermaidDiv.className = 'mermaid';
                    mermaidDiv.id = `mermaid-hub-${index}`;
                    mermaidDiv.textContent = mermaidCode;
                    
                    // Replace the pre>code block with our mermaid div
                    block.parentElement.parentElement.replaceChild(mermaidDiv, block.parentElement);
                });
                
                // Render all Mermaid diagrams
                Mermaid.run().then(() => {
                    this.showMessage(`Successfully rendered ${mermaidBlocks.length} Mermaid diagram(s)`, 'success');
                }).catch(error => {
                    console.error('Mermaid rendering error:', error);
                    this.showMessage('Some Mermaid diagrams could not be rendered. Please check the syntax.', 'error');
                });
            } else {
                this.showMessage('Markdown rendered successfully (no Mermaid diagrams found)', 'success');
            }
            
        } catch (error) {
            console.error('Error rendering markdown:', error);
            this.showMessage('Failed to render markdown: ' + error.message, 'error');
        }
    }

    clearContent() {
        document.getElementById('markdown-input').value = '';
        document.getElementById('file-path').value = '';
        document.getElementById('preview-content').innerHTML = `
            <p style="color: #666; text-align: center; padding: 50px;">
                Enter markdown content above and click "Render Preview" to see the result with Mermaid diagrams.
            </p>
        `;
        this.showMessage('Content cleared', 'success');
    }

    loadSample() {
        const sampleContent = `# Mermaid Markdown Sample

This is a sample markdown file with Mermaid diagrams to demonstrate the functionality.

## Architecture Overview

\`\`\`mermaid
graph TB
    A[User] --> B[Azure DevOps]
    B --> C[Repository]
    C --> D[Markdown File]
    D --> E[Mermaid Extension]
    E --> F[Rendered Diagram]
\`\`\`

## Process Flow

\`\`\`mermaid
sequenceDiagram
    participant U as User
    participant ADO as Azure DevOps
    participant EXT as Extension
    participant M as Mermaid

    U->>ADO: Opens markdown file
    ADO->>EXT: Calls extension
    EXT->>M: Renders diagrams
    M-->>EXT: Returns SVG
    EXT-->>ADO: Shows result
    ADO-->>U: Displays content
\`\`\`

## Entity Relationships

\`\`\`mermaid
erDiagram
    USER {
        string id
        string name
        string email
    }
    PROJECT {
        string id
        string name
        string description
    }
    REPOSITORY {
        string id
        string name
        string url
    }
    
    USER ||--o{ PROJECT : owns
    PROJECT ||--|| REPOSITORY : contains
\`\`\`

## Regular Markdown

This extension also supports all regular markdown features:

- **Bold text**
- *Italic text*
- \`inline code\`
- [Links](https://mermaid-js.github.io/mermaid/)

### Code Blocks

\`\`\`javascript
function renderMermaid(content) {
    return mermaid.render(content);
}
\`\`\`

> **Note:** This extension is designed to work with .mmd files by default, but this hub allows you to view any markdown content with Mermaid support.
`;

        document.getElementById('markdown-input').value = sampleContent;
        this.renderMarkdown();
    }

    async loadFileFromRepository() {
        const filePath = document.getElementById('file-path').value.trim();
        const repoName = document.getElementById('repo-name').value.trim();

        if (!filePath) {
            this.showMessage('Please enter a file path', 'error');
            return;
        }
        if (!repoName) {
            this.showMessage('Please enter a repository name', 'error');
            return;
        }

        try {
            this.showMessage('Loading file...', 'info');

            // Get project context
            const projectService = await SDK.getService("ms.vss-tfs-web.tfs-page-data-service");
            const project = await projectService.getProject();

            if (!project) {
                throw new Error('Could not determine current project');
            }

            // Build base URL from parent frame (handles on-prem TFS with collection path)
            const parentUrl = window.top.location.href;
            const projIndex = parentUrl.indexOf('/' + project.name + '/');
            const baseUrl = projIndex > 0 ? parentUrl.substring(0, projIndex) : window.top.location.origin;

            // Use Git Items API: GET {collection}/{project}/_apis/git/repositories/{repo}/items?path=...
            const apiUrl = `${baseUrl}/${project.name}/_apis/git/repositories/${encodeURIComponent(repoName)}/items?path=${encodeURIComponent(filePath)}&api-version=5.0&includeContent=true&$format=text`;

            const response = await fetch(apiUrl, {
                headers: {
                    'Accept': 'text/plain',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const content = await response.text();
            document.getElementById('markdown-input').value = content;
            this.renderMarkdown();
            this.showMessage(`File loaded: ${repoName}:${filePath}`, 'success');
            
        } catch (error) {
            console.error('Error loading file:', error);
            this.showMessage(`Failed to load file: ${error.message}`, 'error');
        }
    }

    showMessage(message, type = 'info') {
        const messageArea = document.getElementById('message-area');
        const className = type === 'error' ? 'error' : (type === 'success' ? 'success' : 'info');
        
        messageArea.innerHTML = `<div class="${className}">${message}</div>`;
        
        // Clear message after 5 seconds for success/info messages
        if (type !== 'error') {
            setTimeout(() => {
                messageArea.innerHTML = '';
            }, 5000);
        }
    }
}

// Register the hub service
SDK.register("mermaid_hub", () => {
    return new MermaidHub();
});

// Initialize immediately
new MermaidHub();
