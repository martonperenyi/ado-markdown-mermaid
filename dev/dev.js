import md from './test.md'
import mermaidViewer from '../src/viewer.js'

export default {
	render: function () {
		mermaidViewer.renderContent(md)
	}
}
