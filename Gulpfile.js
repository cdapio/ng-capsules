var gulp = require('gulp'),
    gulpPlugin = require('gulp-load-plugins')(),
    fs = require('fs'),
    del = require('del'),
    path = require('path');


gulp.task('zip', ['clean'], function () {
  var modules = fs.readdirSync('./modules/');
  modules.forEach(function(item) {
    gulp.src('./modules/' + item + '/build/*')
        .pipe(gulpPlugin.debug())
        .pipe(gulpPlugin.zip(item + '.zip'))
        .pipe(gulp.dest('./zip/'));
  });
});

gulp.task('clean', function(cb) {
  del(['zip/*'], cb);
});

gulp.task('build-modules', ['build-clean'], function() {
  var modules = fs.readdirSync('./modules/');
  modules.forEach(function (item) {
    gulp.src('./modules/' + item + '/*.html')
        .pipe(gulpPlugin.angularTemplatecache({
          module: item
        }))
        .pipe(gulpPlugin.concat(item + '.html.js'))
        .pipe(gulp.dest('./modules/' + item + '/build/'));


    gulp.src([
      './modules/' + item + '/*.{css,less}'
      ])
      .pipe(gulpPlugin.less())
      .pipe(gulp.dest('./modules/' + item + '/build/'));

    gulp.src([
      './modules/' + item + '/*.js'
      ])
        .pipe(gulpPlugin.ngAnnotate())
        .pipe(gulp.dest('./modules/' + item + '/build/'));

    gulp.src(item + '/bower.json')
        .pipe(gulp.dest('./modules/' + item + '/build/'));
  });
});

gulp.task('build-clean', function(cb) {
  del('modules/**/build/*', cb);
});

gulp.task('test', ['build-modules'], function(done) {
  karma.start({
    configFile: __dirname + '/karma-conf.js'
  }, done);
});
