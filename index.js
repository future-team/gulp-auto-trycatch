'use strict';
// through2 是一个对 node 的 transform streams 简单封装
var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var objectAssign = require('object-assign')
var gfsAutoTrycatch = require('/usr/local/lib/node_modules/gfs-auto-trycatch');
// 常量
var PLUGIN_NAME = 'gulp-auto-trycatch';
function gulpAutoTryCatch(config) {
  // vinyl-fs 因为这个绕了好大一圈
  return through.obj(function(file, enc, cb) {
      if (file.isNull()) {
          cb(null, file);
      }
      if (file.isStream()) {
          cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
          return;
      }
    try {
        var fileOpts = objectAssign({}, config, {
            cwd: process.cwd(),
            path: file.path,
            filename: path.basename(file.path),
            filenameRelative: file.relative
        });
        var content = file.contents.toString();
        var newFileContent = gfsAutoTrycatch(content, fileOpts);
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