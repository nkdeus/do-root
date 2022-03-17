const { series, src, dest } = require('gulp');
const gulp = require('gulp');
const merge = require('gulp-merge-json');
const uglify = require('gulp-uglify');
const fs = require('fs');
const mustache = require('gulp-mustache');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename')

function js() {
    return src(['js/**/*.js'])
    .pipe(uglify())
    .pipe(dest('render/js/'));

}

function json(){
    return src('datas/**/*.json')
    .pipe(merge({
        fileName: 'datas.json'
    }))
    .pipe(gulp.dest('./'));
}


function tpls(){
    return src('./views/*')
      .pipe(mustache('datas.json'))
      .pipe(gulp.dest('render/'));
}



function css() {
  return src([
    'css/style.css',
    'css/custom-css.css'
  ])
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(dest('css/'));

}




function test(cb) {
  // body omitted
    return(cb());
}

exports.build = series(js, json, tpls, css);


