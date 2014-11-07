/**
 * caskConfirmable
 *
 * adds a "caskConfirm" method on the scope. call that, and
 *  the expression in "cask-confirmable" attribute will be evaluated
 *  after the user accepts the confirmation dialog. Eg:
 *
 * <a ng-click="caskConfirm()"
 *       cask-confirmable="doDelete(model)"
 *       data-confirmable-title="Hold on..."
 *       data-confirmable-content="Are you absolutely sure?"
 * >delete</a>
 */

angular.module('cask-angular-confirmable').directive('caskConfirmable',
function caskConfirmableDirective ($modal) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      scope.caskConfirm = function () {

        var modal, modalScope;

        modalScope = scope.$new(true);

        modalScope.doConfirm = function() {
          modal.hide();
          scope.$eval(attrs.caskConfirmable);
        };

        modal = $modal({
          scope: modalScope,
          template: 'cask-angular-confirmable/confirm-modal.html',
          title: attrs.confirmableTitle || 'Confirmation',
          content: attrs.confirmableContent || 'Are you sure?',
          placement: 'center',
          show: true
        });

      };

    }
  };

});
