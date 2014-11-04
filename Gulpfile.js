var gulp = require('gulp'),
    gulpzip = require('gulp-zip'),
    fs = require('fs'),
    del = require('del'),
    path = require('path');


gulp.task('zip', ["clean"], function () {
  var modules = fs.readdirSync('./modules/');
  modules.forEach(function(item) {
    gulp.src('./modules/' + item + '/*')
        .pipe(gulpzip(item + '.zip'))
        .pipe(gulp.dest('./zip/modules/'));
  });
});

gulp.task('clean', function(cb) {
  del(['zip/*'], cb);
});
