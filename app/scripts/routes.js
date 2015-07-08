/**
 * @ngdoc overview
 * @name stillalive.routes
 * @description
 * # stillalive.routes
 *
 * Routes module. All app states are defined here.
 */

angular.module('stillalive')
  .run(function($rootScope){
      $rootScope.routes = [
        'home',
        'register',
        'subscribe',
        'settings',
        'admin',
        'subscribers',
        'login'

      ]
  })
    .config(function ($stateProvider)
    {
        'use strict';

        $stateProvider
          .state( 'home', {
              url: '/home',
              template: '<h2>Welcome to a new way to make sure people are alive.</h2>'
          }

        )
            .state('register', {
                url: '/register',
                template: '<register></register>'
            })
            .state('subscribe', {
                url: '/subscribe',
              template:'<subscribe></subscribe>'
            })
            .state('settings', {
                url: '/settings',
              template:'<settings></settings>'
            })
            .state('subscribers', {
                url: '/subscribers',
              template: '<subscribers></subscribers>'
            })
            .state('admin', {
                url: '/admin',
              template: '<admin></admin>'
            })
            .state('login', {
                url: '/login',
              template: '<login></login>'
            })
            /* STATES-NEEDLE - DO NOT REMOVE THIS */;

    });