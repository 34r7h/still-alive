'use strict';

describe('Directive: subscribers', function ()
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
        element = $compile('<subscribers></subscribers>');
        expect(true).toBe(true);
    }));
});