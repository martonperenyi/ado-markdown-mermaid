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
                
                try {
                    // Try to use the navigation service
                    const navService = await SDK.getService("ms.vss-features.host-navigation-service");
                    const hostPageContext = await SDK.getService("ms.vss-features.host-page-context-service");
                    
                    // Navigate to our hub with URL parameters
                    const navigationContext = {
                        filePath: filePath,
                        source: 'context-menu'
                    };
                    
                    await navService.navigate("javiramos1.ado-markdown-mermaid-enhanced.mermaid-hub", navigationContext);
                    
                } catch (navError) {
                    console.error("Navigation service failed:", navError);
                    
                    // Manual fallback: try to construct URL using current page context
                    const project = context.gitRepository?.project?.name;
                    if (project && window.parent) {
                        const hubUrl = `/${project}/_apps/hub/javiramos1.ado-markdown-mermaid-enhanced.mermaid-hub?filePath=${encodeURIComponent(filePath)}`;
                        console.log("Trying fallback URL:", hubUrl);
                        window.parent.location.href = hubUrl;
                    } else {
                        throw new Error("Could not determine project context for navigation");
                    }
                }
                
            } catch (error) {
                console.error("Error in Mermaid context action:", error);
                alert("Failed to open Mermaid viewer. Please navigate to Code > Mermaid Viewer manually and enter the file path: " + item.path);
            }
        }
    };
});

SDK.init();
