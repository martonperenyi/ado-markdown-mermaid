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
		}),
		new HtmlWebpackPlugin({
			template: 'index.html',
			filename: 'context-action.html',
			chunks: ['context-action']
		}),
		new HtmlWebpackPlugin({
			template: 'hub.html',
			filename: 'hub.html',
			chunks: ['hub']
		}),
		new HtmlWebpackPlugin({
			template: 'index.html',
			filename: 'modal-viewer.html',
			chunks: ['modal-viewer']
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
