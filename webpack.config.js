const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'index_bundle.js',
	},
	plugins: [new HtmlWebpackPlugin({
		template: 'index.html'
	})],
	module: {
		rules: [
			{
				test: /\.md$/,
				use: 'raw-loader'
			}
		]
	}
};
