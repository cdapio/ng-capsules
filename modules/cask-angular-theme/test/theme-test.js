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