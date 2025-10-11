import { Parser, HtmlRenderer } from "commonmark";
import Mermaid from "mermaid";

const mermaidViewer = (function () {
	"use strict";
	return {
		renderContent: function (rawContent, options) {
			// Converte o markdown para HTML
			var reader = new Parser();
			var writer = new HtmlRenderer();
			var parsed = reader.parse(rawContent);
			var resultHtml = writer.render(parsed);

			// Recupera todos os nós com gráficos mermaid
			var container = document.getElementById('md-mermaid-viewer');
			container.innerHTML = resultHtml
			var mermaidParagraphs = container.querySelectorAll('pre > code.language-mermaid')

			// Realiza o parse das strings de linguagem
			var parser = new DOMParser();
			mermaidParagraphs.forEach((p) => {
				var parsed = parser.parseFromString(p.innerHTML, 'text/html')
				p.innerHTML = parsed.documentElement.textContent

				// Class que indicará o nó a ser renderizado
				p.classList.add('mermaid')
			})

			// Gera os gráficos mermaid 
			Mermaid.run()
		}
	};
}());

export default mermaidViewer


