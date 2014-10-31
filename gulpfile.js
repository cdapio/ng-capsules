var gulp = require('gulp'),
    gulpzip = require('gulp-zip'),
    debug   = require("gulp-debug"),
    fs = require('fs'),
    path = require('path'),
    lodash = require('lodash'),
    tap = require('gulp-tap');


gulp.task('zip', function() {
  var directives = fs.readdirSync('./directives/')
      services = fs.readdirSync('./services/'),
      filters = fs.readdirSync('./filters/');

  directives.forEach(lodash.curry(makeZip)("directives"));
  services.forEach(lodash.curry(makeZip)("services"));
  filters.forEach(lodash.curry(makeZip)("filters"));
});

function makeZip(component, item) {
  gulp.src('./' + component + '/' + item + '/*')
      .pipe(gulpzip(item + '.zip'))
      .pipe(gulp.dest('./zip/' + component + '/'));
}
