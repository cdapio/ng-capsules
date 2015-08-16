/**
 * caskPrompt
 *
 * adds a "caskPrompt" method on the scope. call that, and
 *  the specified binding will be set to the user input
 *  from a modal dialog. Eg:
 *
 * <a ng-click="caskPrompt('Please enter a new name', 'new '+model.name)"
 *       cask-promptable="model.name = $value"
 * >rename</a>
 */

angular.module('cask-angular-promptable').directive('caskPromptable',
function caskPromptableDirective ($modal, caskFocusManager) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      var m = $modal({
        template: 'cask-angular-promptable/prompt-modal.html',
        placement: 'center',
        show: false,
        prefixEvent: 'cask-promptable-modal'
      });

      angular.extend(m.$scope, {
        value: '',
        title: 'Prompt',
        evalPromptable: function() {
          scope.$eval(attrs.caskPromptable, {
            '$value': m.$scope.data.value
          });
          m.hide();
        }
      });

      // scope.$on('$destroy', function() {
      //   m.destroy();
      // });

      m.$scope.$on('cask-promptable-modal.show', function() {
        caskFocusManager.select('caskPromptModal');
      });

      scope.caskPrompt = function (text, prefill) {
        if(!angular.isUndefined(text)) {
          m.$scope.title = text;
        }
        if(!angular.isUndefined(prefill)) {
          // 2.3.1 version of angular-strap's modal creates a new scope for just the modal.
          // modalScope which gets created and destroyed as the modal is opened and closed.
          // Hence in order to get the 2-way binding we are passing in a reference instead of
          // a value.
          m.$scope.data = {};
          m.$scope.data.value = prefill;
        }
        m.show();
      };

    }
  };

});
