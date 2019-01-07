let config  = require('./config'),
	utils   = require('./utils'),
	path    = require('path'),
	version = utils.getVersion();


/*const complexEntry = Object.assing(
	utils.getEntries('./src/pages/!**!/entry.js')
)*/

module.exports = {
	entry : utils.getEntries('./src/pages/**/entry.js'),
	output: {
		path         : config.build.assetsRoot,
		publicPath   : config.dev.assetsPublicPath,
		filename     : '[name].[hash].js',
		chunkFilename: '[name].chunk.js'
	},
	module: {
		rules: [
			{
				test   : /\.js$/,
				loader : 'babel-loader',
				include: config.commonPath.rootPath,
				exclude: /(node_modules|bower_components)/
			}, {
				test   : /\.(png|svg|jpg|jpeg|gif|ico|eot|svg|ttf|woff)$/,
				loader : 'url-loader',
				options: {
					name : `[path][name].[ext]?v=${version}`,
					limit: 8192
				}

			}
		]
	},
	/*plugins: [
		new HtmlWebpackPlugin({
			filename: 'src/pages/index/page.html',
			template: path.resolve(__dirname, '../src/pages/index/page.html'),
			inject  : true
		})
	]*/
}