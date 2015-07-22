/**
 * @ngdoc service
 * @name stillalive.Data
 * @description
 * # Data
 * Service in the stillalive.
 */
angular.module('stillalive')
    .service('Data', function ($firebaseObject, $firebaseArray)
    {
        'use strict';
        var ref = new Firebase('https://still-alive.firebaseio.com');
        var fbObject = $firebaseObject(ref);
        var fbArray = $firebaseArray(ref);
        return {
            fbObject: fbObject,
            fbArray: fbArray
        };



        // AngularJS will instantiate a singleton by calling "new" on this function
    });