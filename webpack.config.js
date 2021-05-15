const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: {
		'react-web-notifications.min': './src/index.js'
	},
	externals: {
		react: {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			}
		]
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'dist'),
		publicPath: 'dist/',
		library: 'ReactWebNotifications',
		libraryTarget: 'umd'
	}
};
