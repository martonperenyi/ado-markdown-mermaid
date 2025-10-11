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

                // Navigate to the hub using proper Azure DevOps navigation
                const navService = await SDK.getService("ms.vss-features.host-navigation-service");
                const extContext = SDK.getExtensionContext();
                
                // Navigate to the Mermaid hub with the file path as a parameter
                await navService.navigate(`${extContext.publisherId}.${extContext.extensionId}.mermaid-hub`, {
                    project: project,
                    filePath: filePath,
                    repository: repoName
                });
                
            } catch (error) {
                console.error("Error in Mermaid context action:", error);
                
                // Fallback: try to open the hub directly
                try {
                    const project = context.gitRepository?.project?.name;
                    const baseUrl = window.location.origin;
                    const hubUrl = `${baseUrl}/${project}/_apps/hub/javiramos1.ado-markdown-mermaid-enhanced.mermaid-hub?filePath=${encodeURIComponent(item.path)}`;
                    console.log("Fallback: opening URL directly:", hubUrl);
                    window.open(hubUrl, '_blank');
                } catch (fallbackError) {
                    console.error("Fallback failed:", fallbackError);
                    alert("Failed to open Mermaid viewer. Please navigate to Code > Mermaid Viewer manually.");
                }
            }
        }
    };
});

SDK.init();
