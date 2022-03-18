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
    return src(['sources/js/**/*.js'])
    .pipe(uglify())
    .pipe(dest('render/js/'));

}

function json(){
    return src('sources/datas/**/*.json')
    .pipe(merge({
        fileName: 'sources/datas.json'
    }))
    .pipe(gulp.dest('./'));
}


function tpls(){
    return src('sources/views/*')
      .pipe(mustache('sources/datas.json'))
      .pipe(gulp.dest('render/'));
}



function css() {
  return src([
    'sources/css/do.css',
    'sources/css/custom-css.css'
  ])
    .pipe(concat('styles.css'))
    .pipe(dest('sources/css/'));

}

function imgs(){
  return src(['sources/imgs/**/*.svg']) 
      .pipe(gulp.dest('render/imgs/'));
    
}

function removeFolder(cb){
   fs.rmdir('./render/partials', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("directory deleted successfully");
    }
  })

  return cb();
    
}




function go() {
  return  json();
}

function gogo() {
  return  tpls();
}

function cssMerge() {
  return  css();
}


gulp.task(gogo);
gulp.task(go);
gulp.task(cssMerge);

exports.build = series(js, json, tpls, css, imgs, removeFolder);

