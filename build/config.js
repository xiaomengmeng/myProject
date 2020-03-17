let path     = require('path'),
	rootPath = path.resolve(__dirname, '../'),
	src      = path.join(rootPath, 'src');



alert(1)
module.exports = {
	build     : {
		assetsRoot         : path.resolve(__dirname, '../dist/student'),
		assetsSubDirectory : 'static',
		assetsPublicPath   : '/student/',
		productionSourceMap: false
	},
	dev       : {
		port              : 2020,
		assetsSubDirectory: 'static',
		assetsPublicPath  : '/student/',
		proxyTable        : {},
		cssSourceMap      : false
	},
	commonPath: {
		rootPath: rootPath,
		fallback: path.join(rootPath, 'node_modules'),
		src     : src
	}
}
