/**
 * caskPrompt
 *
 * adds a "caskPrompt" method on the scope. call that, and
 *  the specified binding will be set to the user input 
 *  from a modal dialog. Eg:
 *
 * <a ng-click="caskPrompt()"
 *       cask-promptable="model"
 *       data-prompt-title="Please enter a new name"
 * >rename</a>
 */

angular.module('cask-angular-promptable').directive('caskPromptable',
function caskPromptableDirective ($modal) {
  return {
    restrict: 'A',
    scope: {
      model: '=caskPromptable' 
    },
    link: function (scope, element, attrs) {

      scope.caskPrompt = function () {

        var modal, modalScope;

        modalScope = scope.$new(true);

        modalScope.setPromptable = function() {
          scope.model = modalScope.tempValue;
          modal.hide();
        };

        modalScope.tempValue = attrs.promptPrefill ? angular.copy(scope.model) : '';

        modalScope.title = attrs.promptTitle || 'Prompt';

        modal = $modal({
          scope: modalScope,
          template: 'cask-angular-promptable/prompt-modal.html',
          placement: 'center',
          show: true
        });

      };

    }
  };

});
