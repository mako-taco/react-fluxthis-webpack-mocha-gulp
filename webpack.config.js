'use strict';

var cache = {};
var loaders = [
	{
		test: /\.jsx$/,
		loader: 'jsx-loader!babel-loader'
	},
	{
		test: /\.es6\.js$/,
		loader: 'babel-loader'
	},
	{
		test: /\.css$/,
		loader: 'style-loader!css-loader'
	}
];
var extensions = [
	'', '.js', '.jsx', '.es6.js'
];

module.exports = [{
	cache: cache,
	module: {
		loaders: loaders
	},
	entry: {
		main: './src/entry/main',
	},
	output: {
		path: './dist',
		filename: '[name].js'
	},
	resolve: {
		extensions: extensions,
		root: [
			__dirname,
			__dirname + '/src'
		],
	}
}, 
{
	cache: cache,
	module: {
		loaders: loaders
	},
	entry: {
		test: './test/entry/test',
	},
	output: {
		path: './test/fixtures',
		filename: '[name].js'
	},
	resolve: {
		extensions: extensions,
		root: [
			__dirname,
			__dirname + '/src',
			__dirname + '/test/tests'
		]
	}
}];