# gulp-auto-trycatch
gfs-auto-trycatch for gulp

## Options
null

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