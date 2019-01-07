let path          = require('path'),
	express       = require('express'),
	app           = express(),

	config        = require('./config'),
	port          = config.dev.port,
	webpackConfig = require('./webpack.dev.conf'),
	webpack       = require('webpack'),

	compiler      = webpack(webpackConfig);

let devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	stats     : {
		colors: true,
		chunks: false
	}
});


let hotMiddleware = require('webpack-hot-middleware')(compiler);

compiler.plugin('compilation', function (compilation) {
	compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
		hotMiddleware.publish({
			action: 'reload'
		});
		cb();
	});
});

// 将页面路径指派到根路由, 由路由决定渲染何种页面
app.use(config.dev.assetsPublicPath, require('connect-history-api-fallback')());

app.use(devMiddleware);

app.use(hotMiddleware);

// 静态资源服务器
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static(config.dev.assetsSubDirectory));

let uri = 'http://localhost:' + port;

let _resolve;
let readyPromise = new Promise(resolve => {
	_resolve = resolve
});

console.log('> Starting dev server...');


devMiddleware.waitUntilValid(() => {

	console.log('> Listening at ' + uri + '\n');

	_resolve();

});

let server = app.listen(port);

module.exports = {
	ready: readyPromise,
	close: () => {
		server.close()
	}
};