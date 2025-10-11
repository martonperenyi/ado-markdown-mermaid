import * as SDK from "azure-devops-extension-sdk";

SDK.register("mermaid_context_action", () => {
    return {
        execute: async (context) => {
            try {
                console.log("Context action called with:", context);
                
                // Check if this is a markdown file
                const item = context.item || context;
                if (!item || !item.path) {
                    console.error("No item path found in context");
                    return;
                }
                
                const isMarkdownFile = item.path.toLowerCase().endsWith('.md') || 
                                     item.path.toLowerCase().endsWith('.mmd');
                
                if (!isMarkdownFile) {
                    console.log("Not a markdown file, skipping");
                    return;
                }

                // Use Azure DevOps SDK navigation service
                const filePath = item.path;
                console.log("Attempting to navigate to Mermaid hub with file:", filePath);
                
                // Use a simple approach: navigate to the hub using window.open with correct URL format
                const project = context.gitRepository?.project?.name;
                const repoUrl = context.gitRepository?.webUrl || context.gitRepository?.url || '';
                
                // Extract the base Azure DevOps URL from the repository URL
                let baseUrl = '';
                const urlMatch = repoUrl.match(/(https:\/\/dev\.azure\.com\/[^\/]+)/);
                if (urlMatch) {
                    baseUrl = urlMatch[1];
                } else {
                    // Fallback: try to construct from current location
                    const currentUrl = window.location.href;
                    const currentMatch = currentUrl.match(/(https:\/\/[^\/]+)/);
                    if (currentMatch) {
                        baseUrl = currentMatch[1];
                    }
                }
                
                if (baseUrl && project) {
                    const hubUrl = `${baseUrl}/${project}/_apps/hub/javiramos1.ado-markdown-mermaid-enhanced.mermaid-hub?filePath=${encodeURIComponent(filePath)}`;
                    console.log("Opening Mermaid hub at:", hubUrl);
                    window.open(hubUrl, '_blank');
                } else {
                    console.error("Could not construct hub URL. Project:", project, "BaseURL:", baseUrl);
                    alert("Could not open Mermaid viewer. Please navigate to Code > Mermaid Viewer manually and enter the file path: " + filePath);
                }
                
            } catch (error) {
                console.error("Error in Mermaid context action:", error);
                alert("Failed to open Mermaid viewer. Please navigate to Code > Mermaid Viewer manually and enter the file path: " + item.path);
            }
        }
    };
});

SDK.init();
