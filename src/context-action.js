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

                // Open the hub in a new tab with the file path as a parameter
                const hubUrl = `${window.location.origin}/_apps/hub/javiramos1.ado-markdown-mermaid-enhanced.mermaid-hub?filePath=${encodeURIComponent(item.path)}`;
                window.open(hubUrl, '_blank');
                
            } catch (error) {
                console.error("Error in Mermaid context action:", error);
                alert("Failed to open Mermaid viewer: " + error.message);
            }
        }
    };
});

SDK.init();
