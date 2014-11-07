/**
 * caskFocus
 *
 * add the cask-focus attribute to elements that you will want to trigger focus/select on
 *  then in the controller, use caskFocusManager to trigger the DOM event
 *
 * in template:
 * <input type="text" cask-focus="aNameForTheField" />
 *
 * in controller, inject caskFocusManager, then:
 * caskFocusManager.focus('aNameForTheField');
 */

angular.module('cask-angular-focus').directive('caskFocus',
function caskFocusDirective ($timeout, caskFocusManager) {
  return {

    restrict: 'A',

    link: function (scope, element, attrs) {

      attrs.$observe('caskFocus', function (newVal) {

        var cleanup = caskFocusManager.is.$watch(newVal, function (o) {
          if(o) {
            $timeout(function() {
              if(o.focus) {
                element[0].focus();
              }
              else if(o.select) {
                element[0].select();
              }
            });
          }
        });

        scope.$on('$destroy', function() {
          cleanup();
        });
      });

    }
  };
});
