/*global module, expect, inject, describe, it, before, beforeEach, after, afterEach, $*/

describe("Unit tests for cask-dropdown-combo-text directive", function() {
  beforeEach(module('cask-angular-dropdown-text-combo'));

  var scope, directiveScope, element;
  angular.module('mgcrea.ngStrap.dropdown', []);
  beforeEach(inject(function($rootScope, $compile) {
    element = angular.element(
      "<cask-dropdown-text-combo " +
            "data-model=\"model\"" +
            "data-dropdown-list=\"dropDownList\"" +
            "data-text-fields = \"textFields\"" +
            "data-asset-label=\"Provider\"" +
            "> "+
        "</cask-dropdown-text-combo>");
    scope = $rootScope.$new();
    scope.model = {
      "something": {
        "flavor": "value"
      },
      "somethingelse": {
        "flavor": "value"
      }
    };
    scope.textFields = [{
      name: "text1",
      placeholder: "somerandomplaceholder"
    }];
    scope.dropDownList = [
      {
        name: "something",
        value: "asadsa"
      },
      {
        name: "somethingelse",
        value: "asadsa"
      },
      {
        name: "field3",
        value: "asadsa"
      }];

    $compile(element)(scope);
    scope.$digest();

    directiveScope = element.isolateScope();

  }));

  it("Idealistic case where all data is perfect", function() {
    expect(directiveScope.dropdownValues.length).toBe(1);
  });


  it("should work with change in model", function() {
    scope.model.field3 = {
      flavor: "field3"
    };
    scope.$digest();
    expect(directiveScope.dropdownValues.length).toBe(0);
  });

  it("should work with deletion in model", function() {
    delete scope.model.field3;
    delete scope.model.something;
    scope.$digest();
    expect(directiveScope.dropdownValues.length).toBe(2);
  });

  it("should have valid label for text field", function() {
    expect(
      $(element).find("label[for='cask-ddtc-something-0']").text()
    ).toMatch("somerandomplaceholder");
  });
});
