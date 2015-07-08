'use strict';

/**
* @ngdoc directive
* @name stillalive.directive:admin
* @description
* # admin
*/
angular.module('stillalive')
.directive('admin', function ()
{
    return {
        templateUrl: 'scripts/admin/admin-d.html',
        
        restrict: 'EA',
        scope: {

        },
        link: function (scope, el, attrs)
        {

        },
        controllerAs: 'admin',
        controller: function ($scope, Api, Data)
        {
            this.Api = Api;
            this.Data = Data;
        }
    };
});