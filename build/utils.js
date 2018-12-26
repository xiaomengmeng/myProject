let glob = require('glob');

//生成版本控制号
exports.getVersion = () => {
	let date = new Date();
	let fix  = (num) => num < 10 ? `0${num}` : num;

	let year    = date.getFullYear().toString(),
		month   = fix(date.getMonth() + 1),
		day     = fix(date.getDate()),
		hours   = fix(date.getHours()),
		minutes = fix(date.getMinutes()),
		seconds = fix(date.getSeconds());
}

//多页配置
exports.getEntries = (globPath) => {

	let entries = {};

	glob.sync(globPath).forEach(path => {
		let [ moduleName ]    = path.split('/').slice(-2, -1);
		entries[ moduleName ] = path;
	});
	return entries;
};