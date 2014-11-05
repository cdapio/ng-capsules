var gulp = require('gulp'),
    gulpPlugin = require('gulp-load-plugins')(),
    fs = require('fs'),
    del = require('del'),
    merge = require('merge-stream'),
    path = require('path');


gulp.task('zip', ['clean'], function () {
  var modules = fs.readdirSync('./modules/');
  var output = merge();
  modules.forEach(function(item) {

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
        gulpPlugin.if('*.html', gulpPlugin.angularTemplatecache('tpl.html.js', {
          module: item,
          root: item + '/'
        }))
      )
      .pipe(gulpPlugin.size({
        showFiles:true,
      }))
      .pipe(gulpPlugin.zip(item + '.zip'))
      .pipe(gulp.dest('./zip/'));

      output = merge(output, stream);
  });
  return output;
});

gulp.task('clean', function(cb) {
  del(['zip/*'], cb);
});

gulp.task('test', ['build-modules'], function(done) {
  karma.start({
    configFile: __dirname + '/karma-conf.js'
  }, done);
});
