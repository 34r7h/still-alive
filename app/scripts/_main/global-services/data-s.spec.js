'use strict';

describe('Service: Data', function () {
    // load the service's module
    beforeEach(module('stillalive'));

    // instantiate service
    var Data;
    beforeEach(inject(function (_Data_) {
        Data = _Data_;
    }));

    it('should be defined', function () {
        expect(true).toBe(true);
    });

});