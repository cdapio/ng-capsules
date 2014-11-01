var gulp = require('gulp'),
    gulpzip = require('gulp-zip'),
    debug   = require("gulp-debug"),
    fs = require('fs'),
    path = require('path'),
    lodash = require('lodash'),
    tap = require('gulp-tap');


gulp.task('zip', function() {
  var modules = fs.readdirSync('./modules/');
  modules.forEach(lodash.curry(makeZip)('modules'));
});

function makeZip(component, item) {
  gulp.src('./' + component + '/' + item + '/*')
      .pipe(gulpzip(item + '.zip'))
      .pipe(gulp.dest('./zip/' + component + '/'));
}
