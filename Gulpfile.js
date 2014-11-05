var gulp = require('gulp'),
    gulpPlugin = require('gulp-load-plugins')(),
    fs = require('fs'),
    del = require('del'),
    merge = require('merge-stream'),
    path = require('path');


function tplCache(item) {
  return gulpPlugin.angularTemplatecache('tpl.html.js', {
    module: item,
    root: item + '/'
  });
}

gulp.task('zip', ['clean'], function () {
  var output = merge();
  fs.readdirSync('./modules/').forEach(function(item) {

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
      .pipe(gulp.dest('./zip'));

      output = merge(output, stream);
  });
  return output;
});

gulp.task('test-build', ['clean'], function () {
  var output = merge();
  fs.readdirSync('./modules/').forEach(function(item) {

    var stream = gulp.src([
        './modules/' + item + '/**/*.{html,js}'
      ])
      .pipe(
        gulpPlugin.if('*.js', gulpPlugin.ngAnnotate())
      )
      .pipe(
        gulpPlugin.if('*.html', tplCache(item))
      )
      .pipe(gulp.dest('./test/build'));

      output = merge(output, stream);
  });
  return output;
});

gulp.task('clean', function (cb) {
  del(['zip/*', 'test/build'], cb);
});
