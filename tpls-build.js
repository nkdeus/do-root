// https://github.com/rogeriopvl/gulp-mustache

var gulp = require('gulp');
var mustache = require('gulp-mustache');

gulp.src('./views/*')
      .pipe(mustache('data-all.json'))
      .pipe(gulp.dest('./'));


