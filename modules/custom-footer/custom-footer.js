angular.module("cask.directives.myCustomFooter", [])
  .directive("myCustomFooter", function() {
    return {
      restrict: "E",
      templateUrl: "custom-footer.html",
      link: function ($scope) {
        $scope.text = "Custom Footer! - ";
      }
    };
  });
