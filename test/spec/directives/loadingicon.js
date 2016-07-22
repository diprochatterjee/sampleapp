'use strict';

describe('Directive: loadingicon', function () {

  // load the directive's module
  beforeEach(module('crudsampleApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<loadingicon></loadingicon>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the loadingicon directive');
  }));
});
