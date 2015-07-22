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
            Api.setSettings($rootScope.user.uid, {settings:'settings'});
            this.settings = Data.fbObject;
            console.log = this.settings.users;
        },
	      controllerAs: 'settings'
    };
});
