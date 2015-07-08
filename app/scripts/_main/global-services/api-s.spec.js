'use strict';

describe('Service: Api', function () {
    // load the service's module
    beforeEach(module('stillalive'));

    // instantiate service
    var Api;
    beforeEach(inject(function (_Api_) {
        Api = _Api_;
    }));

    it('should be defined', function () {
        expect(true).toBe(true);
    });

});