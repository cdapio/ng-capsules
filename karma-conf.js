module.exports = function(config) {
  var karma = {
    basePath: './modules/',
    files: [
      '../bower_components/angular/angular.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      '../bower_components/jquery/dist/jquery.js',


      '*/module.js',
      '../test/templates/**/tpl.html.js',
      '*/*.js',
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
