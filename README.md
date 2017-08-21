# gulp-auto-trycatch
A tool design for auto add `try catch` handler for javascript code when build project.  

Developer can hack global error handler to deal errors, such as send it to monitor system.

This repo is `gulp` adpater for `gfs-auto-trycatch`
## Options
`errorHandleFuncName`: how to deal error, the default value is `GFS_TRY_CATCH_ERROR_HANDLE`,
you can use it like this:
```javascript
window.GFS_TRY_CATCH_ERROR_HANDLE = function(ERROR_VARIABLE_NAME, FILENAME, FUNCTION_NAME, LINE, COLUMN){
    // do your staff
    console.error('get log msg', ERROR_VARIABLE_NAME, FILENAME, FUNCTION_NAME, LINE, COLUMN)
}
```
if you want to use defined it, you need to config `gulpfile.js`:
```javascript
gulp.task('autoTryCatch', function(){
    return gulp.src(['./src/**/*.jsx', './src/**/*.es6'])
        .pipe(gulpAutoTryCatch({
          errorHandleFuncName: "defined_error_handle_name"
        }))
        .pipe(gulp.dest('./catch'));
});
```
then defined a global function `window.defined_error_handle_name = function(ERROR_VARIABLE_NAME, FILENAME, FUNCTION_NAME, LINE, COLUMN){/**do your staff**/}`

## Usage
```bash
$ npm install gulp-auto-trycatch --save-dev
```

```javascript
const gulp = require('gulp');
const gulpAutoTryCatch = require('gulp-auto-trycatch');

gulp.task('autoTryCatch', function () {
    return gulp.src(['./src/**/*.jsx', './src/**/*.es6'])
        .pipe(gulpAutoTryCatch())
        .pipe(gulp.dest('./catch'));
});
```

## Note
Currently only test in  `jsx` and `es6` syntax.
