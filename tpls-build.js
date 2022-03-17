// https://github.com/rogeriopvl/gulp-mustache

const gulp = require('gulp');
const fs = require('fs');
const mustache = require('gulp-mustache');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify')

var test = function(){
      fs.rmdir('./render/partials', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("directory deleted successfully");
            }
        })
}

gulp.src('./views/*')
      .pipe(mustache('data-all.json'))
      .pipe(gulp.dest('render/'));

gulp.src('css/style-purge.css')
      .pipe(cleanCSS())
      .pipe(gulp.dest('render/css/'));

gulp.src(['js/**/*.js'])
      .pipe(uglify())
      .pipe(gulp.dest('render/js/'));

gulp.src(['imgs/**/*.svg']) 
      .pipe(gulp.dest('render/imgs/'));



setTimeout(() => {
      test();
}, 2000);
      