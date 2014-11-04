/**
 * myPassword
 *
 * implements "click2show" behavior
 *
 * <my-password data-value="password"></my-password>
 */

angular.module('cask-angular-password', [
  'cask-angular-focus'
]).directive('caskPassword',
function myPasswordDirective (myFocusManager) {
  return {
    restrict: 'E',
    templateUrl: 'click2show.html',
    replace: true,
    scope: {
      value: '='
    },
    link: function(scope, element, attrs) {

      scope.uid = ['myPassword', Date.now(), Math.random().toString().substr(2)].join('_');

      scope.doToggle = function() {
        var show = !scope.show;
        scope.show = show;
        if (show) {
          myFocusManager.select(scope.uid);
        }
      };

    }

  };
});
