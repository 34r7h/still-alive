'use strict';

describe('Directive: register', function ()
{

    // load the directive's module
    beforeEach(module('stillalive'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope)
    {
        scope = $rootScope.$new();
    }));

    it('should do something', inject(function ($compile)
    {
        element = $compile('<register></register>');
        expect(true).toBe(true);
    }));
});