'use strict';

/**
* @ngdoc directive
* @name stillalive.directive:settings
* @description
* # settings
*/
angular.module('stillalive')
.directive('settings', function ()
{
    return {
        templateUrl: 'scripts/settings/settings-d.html',
        
        restrict: 'EA',
        scope: {

        },
        link: function (scope, el, attrs)
        {

        },
        controller: function ($scope, Data, Api, $rootScope)
        {
            this.getSubscribers = Api.getSettings($rootScope.user.uid);
            this.settings = Data.fbObject;
            console.log = this.settings.users;
        },
	      controllerAs: 'settings'
    };
});
