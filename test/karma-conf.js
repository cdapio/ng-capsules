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
 
module.exports = function(config) {
  var karma = {
    basePath: '../modules/',
    files: [
      '../bower_components/angular/angular.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      '../bower_components/jquery/dist/jquery.js',
      '../modules/cask-angular-socket-datasource/bower_components/sockjs-client/dist/sockjs.js',
      '../modules/cask-angular-socket-datasource/bower_components/node-uuid/uuid.js',

      '*/module.js',
      '**/test/templates/tpl.html.js',
      '*/*.js',
      '*/test/*.js'
    ],
    autoWatch: true,

    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    plugins : [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-mocha-reporter'
    ],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    reporters: ['mocha']
  };

  if(process.env.TRAVIS){
    karma.browsers = ['Chrome_travis_ci'];
    karma.singleRun =  true;
  }

  config.set(karma);
};
