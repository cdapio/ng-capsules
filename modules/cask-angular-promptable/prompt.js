/**
 * caskPrompt
 *
 * adds a "caskPrompt" method on the scope. call that, and
 *  the specified binding will be set to the user input 
 *  from a modal dialog. Eg:
 *
 * <a ng-click="caskPrompt('Please enter a new name', 'new '+model.name)"
 *       cask-promptable="model.name"
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
        setPromptable: function() {
          scope.$eval(attrs.caskPromptable + ' = ' + angular.toJson(m.$scope.value));
          m.hide();
        }
      });

      scope.$on('$destroy', function() {
        m.destroy();
      });

      m.$scope.$on('cask-promptable-modal.show', function() {
        caskFocusManager.select('caskPromptModal');
      });

      scope.caskPrompt = function (text, prefill) {
        if(!angular.isUndefined(text)) {
          m.$scope.title = text;
        }

        if(!angular.isUndefined(prefill)) {
          m.$scope.value = prefill;
        }
        else {
          m.$scope.value = scope.$eval(attrs.caskPromptable);
        }
        m.show();
      };

    }
  };

});
