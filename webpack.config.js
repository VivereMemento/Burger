const path = require('path'); // для разной среды разработки linux/windows
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extarctCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/uglify');
const images = require('./webpack/images');
const devserver = require('./webpack/devserver');

const PATHS = {
	source: path.join(__dirname, 'source'),
	build: path.join(__dirname, 'build')
};

const common = merge([
	{
		entry: {
			'index': PATHS.source + '/pages/index/index.js'
		},
		output: {
			path: PATHS.build,
			filename: 'js/[name].js'
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				chunks: ['index', 'common'],
				template: PATHS.source + '/pages/index/index.pug'
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'common'
			}),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery'
			})
		]
	},
	pug(),
	images()
]);

module.exports = function(env) {
	if (env === 'production'){
		return merge([
			common,
			extarctCSS(),
			uglifyJS()
		])
	}
	if (env === 'development'){
		return merge([
			common,
			devserver(),
			sass(),
			css()
		])
	}
};