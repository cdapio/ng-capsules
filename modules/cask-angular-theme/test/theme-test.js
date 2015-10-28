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

describe("Unit tests for cask-angular-theme provider", function () {

  // mock ngStorage dependency
  beforeEach(function() {
    angular.module('ngStorage', []);
    angular.mock.module(function ($provide) {
      $provide.value('$localStorage', {});
    });

  });

  // load the module
  beforeEach(module('cask-angular-theme'));

  // get the injectable
  var caskTheme;
  beforeEach(inject(function($injector) {
    caskTheme = $injector.get('caskTheme');
  }));


  // test it
  it('has a list() method', function() {
    expect(caskTheme.list).toEqual(jasmine.any(Function));
    expect(caskTheme.list().length).toEqual(1);
  });

  it('has a getClassName() method', function() {
    expect(caskTheme.getClassName).toEqual(jasmine.any(Function));
    expect(caskTheme.getClassName()).toEqual('theme-default');
  });

});
