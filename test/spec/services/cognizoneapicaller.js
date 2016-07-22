'use strict';

describe('Service: CognizoneAPICaller', function () {

  // load the service's module
  beforeEach(module('crudsampleApp'));

  // instantiate service
  var CognizoneAPICaller;
  beforeEach(inject(function (_CognizoneAPICaller_) {
    CognizoneAPICaller = _CognizoneAPICaller_;
  }));

  it('should do something', function () {
    expect(!!CognizoneAPICaller).toBe(true);
  });

});
