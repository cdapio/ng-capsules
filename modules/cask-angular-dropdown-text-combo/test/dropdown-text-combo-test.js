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
 
/*global module, expect, inject, describe, it, before, beforeEach, after, afterEach, $*/

describe("Unit tests for cask-dropdown-combo-text directive", function() {
  angular.module('mgcrea.ngStrap.dropdown', []);
  beforeEach(module('cask-angular-dropdown-text-combo'));

  var scope, directiveScope, element;
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
