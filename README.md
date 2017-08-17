# gulp-auto-trycatch
gfs-auto-trycatch for gulp

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
