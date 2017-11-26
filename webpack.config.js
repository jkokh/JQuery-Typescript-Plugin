const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

const configType = process.env.NODE_ENV;

const pluginName = 'test-plugin';

let distConfig = {
	externals: {
		jquery: 'jQuery'
	},
	entry: './src/plugin/plugin.ts',
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx']
	},
	module: {
		rules: [
			{
				test: /\.sass/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.ts/,
				use: 'ts-loader'
			},
			{test: /\.handlebars$/, loader: "handlebars-loader"}
		]
	},
	output: {
		path: __dirname + '/dist',
		filename: pluginName + '.min.js'
	},
	plugins: [
		new ExtractTextPlugin(pluginName + ".min.css"),
		new webpack.optimize.UglifyJsPlugin()
	]
};

let demoConfig = {
	entry: [
		'./src/plugin/plugin.ts',
		'./src/demo/app.ts'
	],
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx']
	},
	module: {
		rules: [
			{
				test: /\.sass/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.ts/,
				exclude: ['/node_modules/', '*.d.ts'],
				use: 'ts-loader',

			},
			{test: /\.handlebars$/, loader: "handlebars-loader"}
		]
	},
	output: {
		path: __dirname + '/demo',
		filename: 'demo.min.js'
	},

	plugins: [
		new HtmlWebpackPlugin({
			/* minify: {
				 collapseWhitespace: true
			 },*/
			//hash: true,
			filename: 'index.html',
			template: 'src/demo/index.html'
		}),
		new ExtractTextPlugin("demo.min.css"),
		new webpack.optimize.UglifyJsPlugin()
	]
};

let devConfig = {
	devtool: 'inline-source-map',
	entry: [
		'./src/plugin/plugin.ts',
		'./src/demo/app.ts'
	],
	resolve: {
		extensions: ['.ts', '.js', '.json']
	},
	module: {
		rules: [
			{
				test: /\.sass/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader", options: {
						sourceMap: true
					}
				}, {
					loader: "sass-loader", options: {
						sourceMap: true
					}
				}]
			},
			{
				test: /\.ts/,
				exclude: '/node_modules/',
				use: {
					loader: 'ts-loader',
					options: {
						compilerOptions: {
							"sourceMap": true,
							"inlineSources": true
						}
					}
				}
			},
			{test: /\.handlebars$/, loader: "handlebars-loader"}
		]
	},
	devServer: {
		hot: true,
		port: 8000,
		stats: "errors-only",
		open: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/demo/index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
};

switch (configType) {
	case 'dist':
		config = distConfig;
		break;
	case 'demo':
		config = demoConfig;
		break;
	default:
		config = devConfig;
}

module.exports = config;
