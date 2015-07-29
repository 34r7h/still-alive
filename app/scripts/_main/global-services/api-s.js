/**
 * @ngdoc service
 * @name stillalive.Api
 * @description
 * # Api
 * Service in the stillalive.
 */
angular.module('stillalive')
	.service('Api', function ($firebaseAuth, $firebaseArray, $firebaseObject, $rootScope, $log) {
		'use strict';

		// Init
		var ref = new Firebase('https://still-alive.firebaseio.com');
		var authObj = $firebaseAuth(ref);
		$rootScope.user = authObj.$getAuth();
		console.log('$rootScope.user',$rootScope.user);

		// Util
		function keyString (futureKey){
			return futureKey.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
		}


		// API
		function createUser(email, name, pass) {
			var ref = new Firebase('https://still-alive.firebaseio.com').child('users');
			var indexRef = new Firebase('https://still-alive.firebaseio.com/index').child('users');
			var authObj = $firebaseAuth(ref);
			var userObject = $firebaseObject(ref);
			var indexObject = $firebaseObject(indexRef);
			authObj.$createUser({
				email: email,
				password: pass
			}).then(function(userData) {
				userObject[userData.uid] = {
					subscribeTo:[email],
					subscribeFrom:[email],
					settings:{

					},
					email:email,
					name:name
				};
				userObject.$save().then(function(){
					email= keyString(email);
					name= keyString(name);
					if( !indexObject['email'] ) indexObject['email'] = {};
					if( !indexObject['name'] ) indexObject['name'] = {};
					indexObject['email'][email]=userData.uid;
					indexObject['name'][name]=userData.uid;
					indexObject.$save();
				});

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
			console.log('remove user', email);
			var ref = new Firebase('https://still-alive.firebaseio.com/');
			var dbObject = $firebaseObject(ref).$loaded().then(function(data){
				console.log('dbObject',data.index.users.email);
				var keyEmail = keyString(email);
				var userId = data.index.users.email[keyEmail];
				console.log('userId',userId);
				var userObject = data.users[userId];
				console.log('userObject',userObject);

				var removeRef = new Firebase('https://still-alive.firebaseio.com/users/'+userId);
				var removeIndexRef = new Firebase('https://still-alive.firebaseio.com/users/email/'+keyString(email));
				var removeObject = $firebaseObject(removeRef);
				removeObject.$remove();
				var removeIndex = $firebaseObject(removeIndexRef).$loaded().then(function(index){
					console.log('removeIndex', index);
				});
				index.$remove();
				console.log("User removed successfully!");
			});




			var authObj = $firebaseAuth(ref);

			authObj.$removeUser({
				email: email,
				password: pass
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

		function getSettings(user){
			var ref = new Firebase('https://still-alive.firebaseio.com/users/').child(user);
			var indexRef = new Firebase('https://still-alive.firebaseio.com').child('index');
			var userObject = $firebaseObject(ref);
			var indexObject = $firebaseObject(indexRef);
			userObject.$loaded(
				function(data) {
					$log.log(data.subscribeTo); // true
				},
				function(error) {
					$log.error("Error:", error);
				}
			);
		}

		function setSettings(user, settings){
			// user: whose settings we want
			// settings: settings config object
			var ref = new Firebase('https://still-alive.firebaseio.com/users/').child(user);
			var indexRef = new Firebase('https://still-alive.firebaseio.com').child('index');
			var userObject = $firebaseObject(ref);
			var indexObject = $firebaseObject(indexRef);
			userObject.$loaded(
				function(data) {
					$log.log(data.subscribeTo, settings); // true
				},
				function(error) {
					$log.error("Error:", error);
				}
			);

		}

		return {
			createUser: createUser,
			removeUser: removeUser,
			subscribe: subscribe,
			unsubscribe: unsubscribe,
			update: update,
			login: login,
			logout: logout,
			resetPassword: resetPassword,
			getSettings: getSettings,
			setSettings: setSettings
		};

		// AngularJS will instantiate a singleton by calling "new" on this function
	});