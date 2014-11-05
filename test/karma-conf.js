module.exports = function(config) {
  var karma = {
    basePath : '../',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/jquery/dist/jquery.js',


      'test/build/*/module.js',
      'test/build/**/*.js',
      'modules/*/test/**/*.js'
    ],
    autoWatch: true,

    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    plugins : [
      'karma-chrome-launcher',
      'karma-jasmine'
    ],
    reporters: ['progress']
  };

  config.set(karma);

};
