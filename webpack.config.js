const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: {
		index: './src/index.js',
		'context-action': './src/context-action.js',
		'modal-viewer': './src/modal-viewer.js',
		hub: './src/hub.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
			filename: 'index.html',
			chunks: ['index']
		})
	],
	module: {
		rules: [
			{
				test: /\.md$/,
				use: 'raw-loader'
			}
		]
	}
};
