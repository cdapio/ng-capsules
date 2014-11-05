/**
 * myConfirmable
 *
 * adds a "myConfirm" method on the scope. call that, and
 *  the expression in "my-confirmable" attribute will be evaluated
 *  after the user accepts the confirmation dialog. Eg:
 *
 * <a ng-click="myConfirm()" my-confirmable="doDelete(model)">delete</a>
 */

angular.module('cask-angular-confirmable').directive('caskConfirmable', 
function myConfirmableDirective ($window, $modal) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      scope.myConfirm = function () {

        // TODO: replace with a nice modal

        if($window.confirm('Are you sure?')) {
          confirmed();
        }

      };

      function confirmed() {
        scope.$eval(attrs.myConfirmable);
      }

    }
  };

});
