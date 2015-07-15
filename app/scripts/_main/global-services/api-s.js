/**
 * @ngdoc service
 * @name stillalive.Api
 * @description
 * # Api
 * Service in the stillalive.
 */
angular.module('stillalive')
	.service('Api', function ($firebaseAuth, $firebaseArray, $firebaseObject, $rootScope) {
		'use strict';

		// Init
		var ref = new Firebase('https://still-alive.firebaseio.com');
		var authObj = $firebaseAuth(ref);
		$rootScope.user = authObj.$getAuth();
		console.log('$rootScope.user',$rootScope.user);


		// API
		function createUser(email, name, pass) {
			var ref = new Firebase('https://still-alive.firebaseio.com').child('users');
			var indexRef = new Firebase('https://still-alive.firebaseio.com').child('index');
			var authObj = $firebaseAuth(ref);
			var userObject = $firebaseObject(ref);
			var indexObject = $firebaseObject(indexRef);
			authObj.$createUser({
				email: email,
				password: pass
			}).then(function(userData) {
				userObject[userData.uid] = {
					email:email,
					name:name,
					subscribeTo:[email],
					subscribeFrom:[email]
				};
				userObject.$save();
				indexObject.$save();

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

		function resetPassword(email){
			var ref = new Firebase('https://still-alive.firebaseio.com/');
			var authObj = $firebaseAuth(ref);
			authObj.$resetPassword({
				email: email
			}).then(function() {
				console.log("Password reset email sent successfully!");
			}).catch(function(error) {
				console.error("Error: ", error);
			});
		}

		function removeUser(email, pass) {
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

		function subscribe(email) {
			var ref = new Firebase('https://still-alive.firebaseio.com/');
			var indexRef = new Firebase('https://still-alive.firebaseio.com/index/');
			var refObject = $firebaseObject(ref);
			var indexRefObject = $firebaseObject(indexRef).$loaded(function(data){
				var subscribeTo = indexRefObject[email];
				var subscribeFrom = indexRefObject[$rootScope.user];
				var userRef = new Firebase('https://still-alive.firebaseio.com/users/'+subscribeFrom);
				console.log('subscribe to ', email, subscribeFrom, data);
			});


		}

		function unsubscribe() {
			console.log('unsubscribe');
		}

		function update() {
			console.log('update');
		}

		function login(email,pass) {
			$rootScope.user;
			console.log('login user');
			var ref = new Firebase("https://still-alive.firebaseio.com");
			var authObj = $firebaseAuth(ref);
			authObj.$authWithPassword({
				email: email,
				password: pass
			}).then(function(authData) {
				console.log("Logged in as:", authData.uid);
				$rootScope.user = authData.uid;

			}).catch(function(error) {
				console.error("Authentication failed:", error);
			});
		}

		function logout() {
			console.log('logout user');
			var ref = new Firebase('https://still-alive.firebaseio.com/');
			var authObj = $firebaseAuth(ref);
			authObj.$unauth();
			console.log('user unauth', authObj.$getAuth());
			$rootScope.user = undefined;
		}

		return {
			createUser: createUser,
			removeUser: removeUser,
			subscribe: subscribe,
			unsubscribe: unsubscribe,
			update: update,
			login: login,
			logout: logout,
			resetPassword: resetPassword
		};

		// AngularJS will instantiate a singleton by calling "new" on this function
	});