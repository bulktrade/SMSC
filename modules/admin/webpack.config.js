var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		'app': './src/app.ts',
		'vendor': './src/vendor.ts'
	},
	output: {
		path: "./node_modules/bundle",
		filename: "bundle.js"
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
	],

	resolve: {
		extensions: ['', '.ts', '.js']
	},

	module: {
		loaders: [
			{test: /\.ts$/, loader: 'ts-loader'}
		],
		noParse: [path.join(__dirname, 'node_modules', 'angular2', 'bundles')]
	},

	devServer: {
		historyApiFallback: true,
		proxy: {
			'/orientdb/*': {
				target: 'http://localhost:2480',
				rewrite: function (req) {
					req.url = req.url.replace(/^\/orientdb/, '');
				}
			}
		}
	}
};