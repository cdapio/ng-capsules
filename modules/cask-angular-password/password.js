/**
 * caskPassword
 *
 * implements "click2show" behavior
 *
 * <cask-password data-value="password"></cask-password>
 */

angular.module('cask-angular-password').directive('caskPassword',
function caskPasswordDirective (caskFocusManager) {
  return {
    restrict: 'E',
    templateUrl: 'cask-angular-password/click2show.html',
    replace: true,
    scope: {
      value: '='
    },
    link: function(scope, element, attrs) {

      scope.uid = ['caskPassword', Date.now(), Math.random().toString().substr(2)].join('_');

      scope.doToggle = function() {
        var show = !scope.show;
        scope.show = show;
        if (show) {
          caskFocusManager.select(scope.uid);
        }
      };

    }

  };
});
