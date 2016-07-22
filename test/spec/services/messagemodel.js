'use strict';

describe('Service: MessageModel', function () {

  // load the service's module
  beforeEach(module('crudsampleApp'));

  // instantiate service
  var MessageModel;
  beforeEach(inject(function (_MessageModel_) {
    MessageModel = _MessageModel_;
  }));

  it('should do something', function () {
    expect(!!MessageModel).toBe(true);
  });

});
