/*
 * Copyright © 2015 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

/**
 * caskSortable
 * makes a <table> sortable
 *
 * adds "sortable.predicate" and "sortable.reverse" to the scope
 *
 * <table my-sortable>
 *  <thead>
 *    <tr ng-class="{'sort-enabled': list.length>1}">
 *      <th data-predicate="createTime" data-predicate-default="reverse">creation time</th>
 *    </tr>
 *  </thead>
 *  <tbody>
 *   <tr ng-repeat="item in list | orderBy:sortable.predicate:sortable.reverse">
 *    <td>...
 */

angular.module('cask-angular-sortable').directive('caskSortable',
function caskSortableDirective ($log) {

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      var headers = element.find('th'),
          defaultPredicate,
          defaultReverse,
          noInitialSort;

      noInitialSort = (attrs.noInitialSort === 'true'? true: false);

      angular.forEach(headers, function(th) {
        th = angular.element(th);
        var a = th.attr('data-predicate-default');
        if(angular.isDefined(a)) {
          defaultPredicate = th;
          defaultReverse = (a==='reverse');
        }
      });

      if(!defaultPredicate) {
        defaultPredicate = headers.eq(0);
      }

      scope.sortable = {
        reverse: defaultReverse
      };

      if (noInitialSort) {
        scope.sortable.predicate = null;
      } else {
        scope.sortable.predicate = getPredicate(defaultPredicate.addClass('predicate'));
      }

      headers.append('<i class="fa fa-toggle-down"></i>');

      headers.on('click', function(event) {
        var th = angular.element(this),
            predicate = getPredicate(th);

        scope.$apply(function() {
          if(scope.sortable.predicate === predicate){
            scope.sortable.reverse = !scope.sortable.reverse;
            th.find('i').toggleClass('fa-flip-vertical');
          }
          else {
            headers.removeClass('predicate');
            headers.find('i').removeClass('fa-flip-vertical');
            scope.sortable = {
              predicate: predicate,
              reverse: false
            };
            th.addClass('predicate');
          }
        });
      });

    }
  };

  function getPredicate(node) {
    return node.attr('data-predicate') || node.text();
  }

});
