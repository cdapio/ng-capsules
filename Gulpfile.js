/*
 * Copyright © 2015 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

var gulp = require('gulp'),
    gulpPlugin = require('gulp-load-plugins')(),
    fs = require('fs'),
    del = require('del'),
    merge = require('merge-stream'),
    jshint = require('gulp-jshint'),
    karma = require('karma').Server,
    argv = require('yargs').argv,
    install = require('gulp-install'),
    path = require('path');


function tplCache(item) {
  return gulpPlugin.angularTemplatecache('tpl.html.js', {
    module: item,
    root: item + '/'
  });
}

// gulp zip --module=cask-angular-eventpipe
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
      .pipe(gulpPlugin.if('*.html', gulpPlugin.minifyHtml({loose: true, quotes: true})))
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

gulp.task('bower-install', function(cb) {
  return gulp.src(['./modules/*/bower.json'])
    .pipe(install());
});

gulp.task('test-build', ['bower-install'], function(cb) {
  var modules = fs.readdirSync('./modules/');
  modules.forEach(function(item) {
    gulp.src([
      './modules/' + item + '/**/*.html'
    ])
    .pipe(gulpPlugin.minifyHtml({loose: true, quotes: true}))
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
    './modules/**/*.js',
    '!./modules/**/bower_components/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter())
    .pipe(jshint.reporter('fail'));
});

gulp.task('test', ['jshint'], function(done) {
  new karma({
    configFile: __dirname + '/test/karma-conf.js'
  }, done).start();
});
