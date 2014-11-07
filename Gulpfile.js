var gulp = require('gulp'),
    gulpPlugin = require('gulp-load-plugins')(),
    fs = require('fs'),
    del = require('del'),
    merge = require('merge-stream'),
    jshint = require('gulp-jshint'),
    karma = require('karma').server,
    argv = require('yargs').argv,
    path = require('path');


function tplCache(item) {
  return gulpPlugin.angularTemplatecache('tpl.html.js', {
    module: item,
    root: item + '/'
  });
}

gulp.task('zip', function () {
  var output = merge(),
      inputModule = argv.module,
      directories = fs.readdirSync('./modules/');

  if (inputModule) {
    directories = [inputModule];
  }
  directories.forEach(function(item) {

    var stream = gulp.src([
        './modules/' + item + '/**/*',
        '!./modules/' + item + '/test/*'
      ])
      .pipe(
        gulpPlugin.if('*.less', gulpPlugin.less())
      )
      .pipe(
        gulpPlugin.if('*.js', gulpPlugin.ngAnnotate())
      )
      .pipe(
        gulpPlugin.if('*.html', tplCache(item))
      )
      .pipe(gulpPlugin.zip(item + '.zip'))
      .pipe(gulp.dest('./zip/'));

      output = merge(output, stream);
  });
  return output;
});

gulp.task('clean', function(cb) {
  del(['zip/*'], cb);
});

gulp.task('test-build', function(cb) {
  var modules = fs.readdirSync('./modules/');
  modules.forEach(function(item) {
    gulp.src([
      './modules/' + item + '/**/*.html'
    ])
    .pipe(gulpPlugin.angularTemplatecache('tpl.html.js', {
      module: item,
      root: item + '/'
    }))
    .pipe(gulp.dest('./modules/' + item + '/test/templates/'));
  });
  cb();
});

gulp.task('jshint', function() {
  return gulp.src([
    './modules/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter())
    .pipe(jshint.reporter('fail'));
});

gulp.task('test', ['jshint'], function(done) {
  karma.start({
    configFile: __dirname + '/test/karma-conf.js'
  }, done);
});
