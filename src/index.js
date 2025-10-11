import * as SDK from "azure-devops-extension-sdk";
import Mermaid from "mermaid";
import dev from '../dev/dev.js'
import mermaidViewer from './viewer.js'

const isProd = process.env.NODE_ENV == 'production'

if (isProd) {
	await (async function () {
		SDK.init({ loaded: false })

		Mermaid.initialize({ startOnLoad: false });

		SDK.register("mermaid_renderer", function (context) {
			return mermaidViewer;
		});

		SDK.notifyLoadSucceeded();
	}());
} else {
	dev.render()
}
