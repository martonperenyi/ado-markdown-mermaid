import * as SDK from "azure-devops-extension-sdk";

SDK.register("mermaid_context_action", () => {
    return {
        execute: async (context) => {
            let filePath = '';
            try {
                console.log("Context action called with:", JSON.stringify(context, null, 2));

                const item = context.item || context;
                if (!item || !item.path) {
                    alert("Mermaid viewer: no file path found in context.");
                    return;
                }

                filePath = item.path;
                const isMarkdownFile = filePath.toLowerCase().endsWith('.md') ||
                                     filePath.toLowerCase().endsWith('.mmd');

                if (!isMarkdownFile) {
                    alert("Mermaid viewer: not a markdown file.");
                    return;
                }

                const project = context.gitRepository?.project?.name;
                if (!project) {
                    alert("Mermaid viewer: could not determine project name.\nGo to Code > Mermaid Viewer and enter: " + filePath);
                    return;
                }

                // Build absolute hub URL from the parent frame's location
                // Parent URL is like: https://tfs.example.com/DefaultCollection/Project/_git/Repo/...
                // We need:            https://tfs.example.com/DefaultCollection/Project/_apps/hub/...
                const parentUrl = window.top.location.href;
                const projIndex = parentUrl.indexOf('/' + project + '/');
                if (projIndex < 0) {
                    alert("Mermaid viewer: could not parse TFS URL.\nGo to Code > Mermaid Viewer and enter: " + filePath);
                    return;
                }

                const baseUrl = parentUrl.substring(0, projIndex);
                const hubId = "javiramos1.ado-markdown-mermaid-enhanced.mermaid-hub";
                const hubUrl = `${baseUrl}/${project}/_apps/hub/${hubId}?filePath=${encodeURIComponent(filePath)}`;

                console.log("Navigating to:", hubUrl);

                // Use navigation service with absolute URL
                try {
                    const navService = await SDK.getService("ms.vss-features.host-navigation-service");
                    if (navService) {
                        await navService.navigate(hubUrl);
                        return;
                    }
                } catch (e) {
                    console.warn("Navigation service unavailable, falling back:", e);
                }

                // Fallback: direct navigation on parent frame
                window.top.location.href = hubUrl;

            } catch (error) {
                console.error("Error in Mermaid context action:", error);
                alert("Mermaid viewer error: " + error.message + "\nFile: " + filePath);
            }
        }
    };
});

SDK.init();
