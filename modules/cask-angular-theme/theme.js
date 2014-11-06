/**
 * caskTheme
 */

var module = angular.module('cask-angular-theme');

module.constant('CASK_THEME_EVENT', {
  changed: 'cask-theme-changed'
});

module.provider('caskTheme', function CaskThemeProvider () {

  var THEME_LIST = ['default'];

  this.setThemes = function (t) {
    if(angular.isArray(t) && t.length) {
      THEME_LIST = t;
    }
  }

  this.$get = function ($localStorage, $rootScope, CASK_THEME_EVENT) {
    return new (function () {

      this.current = $localStorage.theme || THEME_LIST[0];

      this.set = function (theme) {
        if (THEME_LIST.indexOf(theme)!==-1) {
          this.current = theme;
          $localStorage.theme = theme;
          $rootScope.$broadcast(CASK_THEME_EVENT.changed, this.getClassName());
        }
      };

      this.list = function () {
        return THEME_LIST;
      };

      this.getClassName = function () {
        return 'theme-' + this.current;
      };

    })();
  };

});
