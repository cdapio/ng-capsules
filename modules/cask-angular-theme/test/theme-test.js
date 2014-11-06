/*global module, expect, inject, describe, it, before, beforeEach, after, afterEach, $*/

describe("Unit tests for cask-angular-theme provider", function () {

  // mock ngStorage dependency
  beforeEach(function(){
    module('ngStorage');
    module(function ($provide) {
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
    expect(caskTheme.list).to.be(jasmine.any(Function));
  });

});
