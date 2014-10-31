angular.module("cask.directives.myCustomHeader", [])
  .directive("myCustomHeader", function() {
    return {
      restrict: "E",
      scope: {
        title: "@"
      },
      templateUrl: "custom-header.html",
      link: function ($scope) {
        $scope.text = "Custom Header! - ";
      }
    };
  });
