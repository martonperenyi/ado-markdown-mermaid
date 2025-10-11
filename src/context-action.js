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

                // Get the current project and repository information
                const project = context.gitRepository?.project?.name || 'DefaultProject';
                const repoName = context.gitRepository?.name || 'DefaultRepo';
                const filePath = item.path;

                // Try direct URL navigation (most reliable)
                const baseUrl = window.location.origin;
                const hubUrl = `${baseUrl}/${project}/_apps/hub/javiramos1.ado-markdown-mermaid-enhanced.mermaid-hub?filePath=${encodeURIComponent(filePath)}`;
                console.log("Opening Mermaid hub:", hubUrl);
                window.open(hubUrl, '_blank');
                
            } catch (error) {
                console.error("Error in Mermaid context action:", error);
                alert("Failed to open Mermaid viewer. Please navigate to Code > Mermaid Viewer manually and enter the file path: " + item.path);
            }
        }
    };
});

SDK.init();
