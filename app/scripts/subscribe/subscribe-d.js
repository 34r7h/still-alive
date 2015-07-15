'use strict';

/**
* @ngdoc directive
* @name stillalive.directive:subscribe
* @description
* # subscribe
*/
angular.module('stillalive')
.directive('subscribe', function ()
{
    return {
        templateUrl: 'scripts/subscribe/subscribe-d.html',
        
        restrict: 'EA',
        scope: {

        },
        link: function (scope, el, attrs)
        {

        },
        controllerAs: 'subscribe',
        controller: function ($scope, Api)
        {
            this.subscribe = Api.subscribe;
        }
    };
});