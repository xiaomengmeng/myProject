let merge             = require('webpack-merge'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	FriendlyErrors    = require('friendly-errors-webpack-plugin'),

	webpack           = require('webpack'),
	baseWebpackConfig = require('./webpack.base.conf'),
	config            = require('./config'),
	utils             = require('./utils'),
	version           = utils.getVersion();

Object.keys(baseWebpackConfig.entry).forEach((name) => {
	baseWebpackConfig.entry[ name ] = [ './build/dev-client' ].concat(baseWebpackConfig.entry[ name ]);
});

module.exports = merge(baseWebpackConfig, {
	mode   : 'development',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'VERSION'    : JSON.stringify(version),
				'NODE_ENV'   : JSON.stringify('dev'),
				'BUILD_ENV'  : JSON.stringify(process.argv.splice(2)[ 0 ] || 'dev'),
				'PUBLIC_PATH': JSON.stringify(config.dev.assetsPublicPath)
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new FriendlyErrors()
	]
});

let pages = utils.getEntries('./src/pages/**/page.html');
for (let page in pages) {
	if (pages.hasOwnProperty(page)) {
		let conf = {
			filename      : page + '.html',
			template      : pages[ page ],
			inject        : true,
			excludeChunks : Object.keys(pages).filter(item => item !== page), //排除其他页面chunk，接受公共chunk
			chunksSortMode: 'dependency'
		};

		module.exports.plugins.push(new HtmlWebpackPlugin(conf));
	}
}