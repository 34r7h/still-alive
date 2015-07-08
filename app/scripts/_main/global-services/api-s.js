/**
 * @ngdoc service
 * @name stillalive.Api
 * @description
 * # Api
 * Service in the stillalive.
 */
angular.module('stillalive')
	.service('Api', function ($firebaseAuth, $firebaseArray, $firebaseObject) {
		'use strict';

		function createUser(email, name, pass) {
			var ref = new Firebase('https://still-alive.firebaseio.com').child('users');
			var authObj = $firebaseAuth(ref);
			var userArray = $firebaseArray(ref);
			var userObject = $firebaseObject(ref);
			authObj.$createUser({
				email: email,
				password: pass
			}).then(function(userData) {
				userObject[userData.uid] = {
					email:email,
					name:name
				};
				userObject.$save();
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

		function removeUser(email,pass) {
			console.log('remove user');
			var ref = new Firebase('https://still-alive.firebaseio.com/');
			var authObj = $firebaseAuth(ref);
			var userId = authObj.$getAuth().uid;
			authObj.$removeUser({
				email: email,
				password: pass
			}).then(function() {
				var removeRef = new Firebase('https://still-alive.firebaseio.com/users/'+userId);
				var removeObject = $firebaseObject(removeRef);
				console.log('removeObject',removeObject);
				removeObject.$remove();
				console.log("User removed successfully!");
			}).catch(function(error) {
				console.error("Error: ", error);
			});
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
			var ref = new Firebase('https://still-alive.firebaseio.com/').child('users');
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