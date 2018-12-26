let config            = require('./config'),
	utils             = require('./utils'),
	path              = require('path');


/*const complexEntry = Object.assing(
	utils.getEntries('./src/pages/!**!/entry.js')
)*/

module.exports = {
	entry  : utils.getEntries('./src/pages/**/entry.js'),
	output : {
		path         : config.build.assetsRoot,
		publicPath   : config.dev.assetsPublicPath,
		filename     : '[name].[hash].js',
		chunkFilename: '[id].[chunkhash].js'
	},
	module : {},
	/*plugins: [
		new HtmlWebpackPlugin({
			filename: 'src/pages/index/page.html',
			template: path.resolve(__dirname, '../src/pages/index/page.html'),
			inject  : true
		})
	]*/
}