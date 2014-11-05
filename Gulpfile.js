var gulp = require('gulp'),
    gulpzip = require('gulp-zip'),
    fs = require('fs'),
    del = require('del'),
    debug = require('gulp-debug'),
    templateCache = require('gulp-angular-templatecache'),
    annotate = require('gulp-ng-annotate'),
    concat = require('gulp-concat'),
    merge = require('gulp-merge'),
    less = require('gulp-less'),
    path = require('path');


gulp.task('zip', ['clean', 'build-modules'], function () {
  var modules = fs.readdirSync('./modules/');
  modules.forEach(function(item) {
    gulp.src('./modules/' + item + '/build/*')
        .pipe(gulpzip(item + '.zip'))
        .pipe(gulp.dest('./zip/'));
  });
});

gulp.task('clean', function(cb) {
  del(['zip/*'], cb);
});

gulp.task('build-modules', function() {
  var modules = fs.readdirSync('./modules/');
  modules.forEach(function (item) {
    merge(
      gulp.src('./modules/' + item + '/*.html')
          .pipe(templateCache({
            module: item
          }))
          .pipe(concat(item + '-tpl.js'))
          .pipe(gulp.dest('./modules/' + item + '/build/'))
      ,
      gulp.src([
        './modules/' + item + '/*.{css,less}'
        ])
        .pipe(less())
        .pipe(concat(item + '.css'))
        .pipe(gulp.dest('./modules/' + item + '/build/'))
      ,
      gulp.src([
        './modules/' + item + '/module.js',
        './modules/' + item + '/*.js'
        ])
          .pipe(annotate())
          .pipe(concat(item + '.js'))
          .pipe(gulp.dest('./modules/' + item + '/build/'))
    );
  });
});


gulp.task('test', ['build-modules'], function(done) {
  karma.start({
    configFile: __dirname + '/karma-conf.js'
  }, done);
});
