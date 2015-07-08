'use strict';

describe('Directive: subscribe', function ()
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
        element = $compile('<subscribe></subscribe>');
        expect(true).toBe(true);
    }));
});