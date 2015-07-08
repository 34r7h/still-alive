'use strict';

/**
* @ngdoc directive
* @name stillalive.directive:register
* @description
* # register
*/
angular.module('stillalive')
.directive('register', function ()
{
    return {
        templateUrl: 'scripts/register/register-d.html',
        
        restrict: 'EA',
        scope: {

        },
        link: function (scope, el, attrs)
        {

        },
        controllerAs: 'register',
        controller: function ($scope, Api)
        {
            this.createUser = Api.createUser;
            this.logout = Api.logout;
        }
    };
});