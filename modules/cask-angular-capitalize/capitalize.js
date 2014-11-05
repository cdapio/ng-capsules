/**
 * myCapitalizeFilter
 * note that bootstrap gives us .text-capitalize, use it instead of this filter
 *  unless you really only want to capitalize the first character of a sentence.
 */

angular.module('cask-angular-capitalize').filter('caskCapitalizeFilter',
function caskCapitalizeFilter () {

  return function(input) {
    input = input ? input.toLowerCase() : '';
    return input.substr(0,1).toUpperCase() + input.substr(1);
  };

});
