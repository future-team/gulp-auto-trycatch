'use strict';
// through2 是一个对 node 的 transform streams 简单封装
var through = require('through2');
var gutil = require('gulp-util');
var objectAssign = require('object-assign');
var path = require('path');
var gfsAutoTrycatch = require('/usr/local/lib/node_modules/gfs-auto-trycatch');
// 常量
var PLUGIN_NAME = 'gulp-auto-trycatch';


// TODO 生成source map
function gulpAutoTryCatch(config) {
  config = config || {};
  // vinyl-fs 因为这个绕了好大一圈
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
        cb(null, file);
        return ;
    }
    if (file.isStream()) {
        cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
        return;
    }
    try {
        var fileOpts = objectAssign({}, config, {
            sourceRoot: process.cwd(),
            filename: file.path,
            filenameRelative: path.relative(process.cwd(), file.path),
            sourceMap: Boolean(file.sourceMap)
        });
        var newFileContent = gfsAutoTrycatch(file.contents.toString(), fileOpts);
        file.contents = new Buffer(newFileContent);
        this.push(file);
    }catch (err){
        this.emit('error', new gutil.PluginError(PLUGIN_NAME, err, {
            fileName: file.path,
            showProperties: false
        }));
    }
    cb();
  });
};
module.exports = gulpAutoTryCatch;