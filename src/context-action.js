import * as SDK from "azure-devops-extension-sdk";

SDK.register("mermaid_context_action", () => {
    return {
        execute: async (context) => {
            let filePath = '';
            try {
                console.log("Context action called with:", JSON.stringify(context, null, 2));

                // Check if this is a markdown file
                const item = context.item || context;
                if (!item || !item.path) {
                    console.error("No item path found in context");
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

                console.log("Attempting to navigate to Mermaid hub with file:", filePath);

                const project = context.gitRepository?.project?.name;

                // Use the SDK navigation service to get the host URL correctly
                // This works in both cloud and on-prem TFS (handles iframes properly)
                const navService = await SDK.getService("ms.vss-features.host-navigation-service");

                if (navService && project) {
                    // Navigate within TFS to the hub page
                    const hubId = "javiramos1.ado-markdown-mermaid-enhanced.mermaid-hub";
                    const params = { filePath: filePath };
                    await navService.navigate(
                        `${project}/_apps/hub/${hubId}?filePath=${encodeURIComponent(filePath)}`
                    );
                } else {
                    // Fallback: use parent window location
                    const parentUrl = window.top.location.href;
                    // Extract base up to project: https://tfs.example.com/Collection
                    const projIndex = parentUrl.indexOf('/' + project + '/');
                    const baseUrl = projIndex > 0 ? parentUrl.substring(0, projIndex) : '';

                    if (baseUrl && project) {
                        const hubUrl = `${baseUrl}/${project}/_apps/hub/javiramos1.ado-markdown-mermaid-enhanced.mermaid-hub?filePath=${encodeURIComponent(filePath)}`;
                        console.log("Navigating to:", hubUrl);
                        window.top.location.href = hubUrl;
                    } else {
                        alert("Could not determine TFS URL. Go to Code > Mermaid Viewer and enter: " + filePath);
                    }
                }

            } catch (error) {
                console.error("Error in Mermaid context action:", error);
                alert("Mermaid viewer error: " + error.message + "\nFile: " + filePath);
            }
        }
    };
});

SDK.init();
