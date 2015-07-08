'use strict';

/**
* @ngdoc directive
* @name stillalive.directive:login
* @description
* # login
*/
angular.module('stillalive')
.directive('login', function ()
{
    return {
        templateUrl: 'scripts/login/login-d.html',
        
        restrict: 'EA',
        scope: {

        },
        link: function (scope, el, attrs)
        {

        },
        controller: function ($scope)
        {

        }
    };
});