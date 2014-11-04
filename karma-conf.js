module.exports = function(config) {
  var karma = {
    basePath: './modules/',
    files: [
      '../bower_components/angular/angular.min.js',
      '../bower_components/angular-mocks/angular-mocks.js',

      '*/build/*.js',
      '*/test/*.js'
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
