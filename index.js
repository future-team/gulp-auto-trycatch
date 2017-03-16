'use strict';
// through2 是一个对 node 的 transform streams 简单封装
const through = require('through2');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;
const gfsAutoTrycatch = require('/usr/local/lib/node_modules/gfs-auto-trycatch');
// 常量
const PLUGIN_NAME = 'gulp-auto-trycatch';
function prefixStream(prefixText) {
  const stream = through();
  stream.write(prefixText);
  return stream;
}
// 插件级别函数 (处理文件)
function gulpAutoTryCatch(config) {
  // let prefixText = PLUGIN_NAME;
  // if (!prefixText) {
  //   throw new PluginError(PLUGIN_NAME, 'Missing prefix text!');
  // }
  // prefixText = new Buffer(prefixText); // 预先分配
  // vinyl-fs 因为这个绕了好大一圈
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
    }
    let content = file.contents.toString();
    if (file.isStream()) {
      // file.contents = file.contents.pipe(prefixStream(prefixText));
      // content = file.toString();
    }
    if (file.isBuffer()) {
      // file.contents = Buffer.concat([prefixText, file.contents]);
      // content = file.toString('utf8');
    }
    // content = file.toString();
    const newFileContent = gfsAutoTrycatch(content, file, config);
    // rewirte contents
    file.contents = new Buffer(newFileContent);
    this.push(file);
    return cb();
  });
};

// 暴露（export）插件主函数
module.exports = gulpAutoTryCatch;