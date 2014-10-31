/**
 * myTitleFilter
 * intended for use in the <title> tag.
 */

angular.module('cask.filters.myTitleFilter', []).filter('myTitleFilter', 
function myTitleFilter () {

  return function(state) {
    var title = state.data && state.data.title;
    return (title ? title + ' | ' : '') + 'Coopr';
  };

});
