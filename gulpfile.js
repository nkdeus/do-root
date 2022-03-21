//https://vjeko.com/2019/02/04/__trashed-4/

const { series, src, dest } = require('gulp');
const gulp = require('gulp');
const merge = require('gulp-merge-json');
const uglify = require('gulp-uglify');
const fs = require('fs');
const mustache = require('gulp-mustache');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const watch = require('gulp-watch');
const Webflow = require('webflow-api');

// Initialize the API
//const api = new Webflow({ token: '99a2ac23ffb619e57a3bc45ee09ab989be5a23a686f820f00b8f39a6fdcaaa9e' });

// Fetch a site
//api.
const webflow = new Webflow({ token: '99a2ac23ffb619e57a3bc45ee09ab989be5a23a686f820f00b8f39a6fdcaaa9e' });
// Promise <[ Site ]>


gulp.task('wf', function(cb) {
  const sites = webflow.sites({ siteId: '5dc16504ff88ca19a432d1a7' });
  //sites.then(s => console.log(s));

  const collection = webflow.collection({ collectionId: '602eae28bcab61107a7dc07d' });
  collection.then(c => c.items().then(
    val => console.log(
      val.items[0].name,
      val.items[0].exemple
      )
  ));

  //const items = webflow.items({ collectionId: '602eae28bcab61107a7dc07d' }, { limit: 2 });

  //items.then(i => console.log(i.items[0]._id));

  


  return cb();
});

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
    .pipe(dest('render/css/'));

}

function cssprod() {
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




gulp.task('watch', function() {
  watch(['sources/views/**/*'], gulp.series(tpls));
  watch(['sources/css/**/*'], gulp.series(css));
  watch(['sources/js/**/*'], gulp.series(js));
  watch(['sources/datas/**/*'], gulp.series(json,tpls));
});

gulp.task('go', function(cb) {
  json();
  return cb();
});

gulp.task('gogo', function(cb) {
  tpls();
  return cb();
});

gulp.task('cssMerge', function(cb) {
  css();
  return cb();
});

gulp.task('cssDev', function(cb) {
  cssprod();
  return cb();
});




exports.build = series(js, json, tpls, css, imgs, removeFolder);


