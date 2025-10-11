import * as SDK from "azure-devops-extension-sdk";
import { Parser, HtmlRenderer } from "commonmark";
import Mermaid from "mermaid";

async function loadModalViewer() {
    try {
        await SDK.init();
        
        // Initialize Mermaid
        Mermaid.initialize({ 
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose'
        });

        // Get configuration from parent dialog
        const config = SDK.getConfiguration();
        const filePath = config.filePath;
        
        // Update file path display
        document.getElementById('file-path').textContent = filePath || 'Unknown file';
        
        // Load file content
        let content = config.fileContent;
        
        if (!content && filePath) {
            // If we don't have content, try to fetch it
            try {
                const response = await fetch(`/_api/_versioncontrol/itemcontent?path=${encodeURIComponent(filePath)}`);
                if (response.ok) {
                    content = await response.text();
                }
            } catch (error) {
                console.warn('Could not fetch file content:', error);
            }
        }
        
        if (!content) {
            showError('Could not load file content. Please make sure the file exists and is accessible.');
            return;
        }
        
        // Render the markdown with Mermaid support
        renderMarkdownWithMermaid(content);
        
    } catch (error) {
        console.error('Error initializing modal viewer:', error);
        showError('Failed to initialize viewer: ' + error.message);
    }
}

function renderMarkdownWithMermaid(rawContent) {
    try {
        // Parse markdown to HTML
        const reader = new Parser();
        const writer = new HtmlRenderer();
        const parsed = reader.parse(rawContent);
        let resultHtml = writer.render(parsed);
        
        // Create container for rendered content
        const container = document.getElementById('viewer-container');
        container.innerHTML = resultHtml;
        
        // Find and process Mermaid code blocks
        const mermaidBlocks = container.querySelectorAll('pre > code.language-mermaid');
        
        mermaidBlocks.forEach((block, index) => {
            // Get the mermaid source code
            const mermaidCode = block.textContent;
            
            // Create a div to replace the code block
            const mermaidDiv = document.createElement('div');
            mermaidDiv.className = 'mermaid';
            mermaidDiv.id = `mermaid-${index}`;
            mermaidDiv.textContent = mermaidCode;
            
            // Replace the pre>code block with our mermaid div
            block.parentElement.parentElement.replaceChild(mermaidDiv, block.parentElement);
        });
        
        // Render all Mermaid diagrams
        if (mermaidBlocks.length > 0) {
            Mermaid.run().catch(error => {
                console.error('Mermaid rendering error:', error);
                showError('Some Mermaid diagrams could not be rendered. Please check the diagram syntax.');
            });
        }
        
    } catch (error) {
        console.error('Error rendering markdown:', error);
        showError('Failed to render markdown: ' + error.message);
    }
}

function showError(message) {
    const container = document.getElementById('viewer-container');
    container.innerHTML = `<div class="error"><strong>Error:</strong> ${message}</div>`;
}

// Initialize when the page loads
loadModalViewer();
