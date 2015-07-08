/**
 * @ngdoc service
 * @name stillalive.Api
 * @description
 * # Api
 * Service in the stillalive.
 */
angular.module('stillalive')
	.service('Api', function ($firebaseAuth, $firebaseArray) {
		'use strict';
		var ref = new Firebase('https://still-alive.firebaseio.com/test').child('users');
		function createUser(email, pass) {
			var authObj = $firebaseAuth(ref);
			authObj.$createUser({
				email: email,
				password: pass
			}).then(function(userData) {
				console.log("User " + userData.uid + " created successfully!");
				var userArray = $firebaseArray(ref);
				userArray.$add(userData.uid);

				return authObj.$authWithPassword({
					email: email,
					password: pass
				});
			}).then(function(authData) {
				console.log("Logged in as:", authData.uid);
			}).catch(function(error) {
				console.error("Error: ", error);
			});
		}

		function removeUser() {
			console.log('remove user');
		}

		function subscribe() {
			console.log('subscribe');
		}

		function unsubscribe() {
			console.log('unsubscribe');
		}

		function update() {
			console.log('update');
		}

		function login() {
			console.log('login user');
		}

		function logout() {
			console.log('logout user');
			var authObj = $firebaseAuth(ref);
			authObj.$unauth();
			console.log('user unauthdd',authObj);
		}

		return {
			createUser: createUser,
			removeUser: removeUser,
			subscribe: subscribe,
			unsubscribe: unsubscribe,
			update: update,
			login: login,
			logout: logout
		};

		// AngularJS will instantiate a singleton by calling "new" on this function
	});