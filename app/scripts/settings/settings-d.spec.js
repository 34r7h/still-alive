'use strict';

describe('Directive: settings', function ()
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
        element = $compile('<settings></settings>');
        expect(true).toBe(true);
    }));
});