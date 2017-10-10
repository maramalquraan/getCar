angular.module('get-car')

// HeadBar Component .. 

/*
              ___                 ___
        _____/___\_____        __|___|__
        """"("-_-")""""         ( o_o )      ~
          /\_)=o~/              _\~-~/_   _ _~
         / /\\\///\      ~     / \/|\/ \/\(|_|
         \__|\\//\ \   ~      / |.   .|\_/
  __________|//\\/_/___~______\_\_____|_____
           _______   |_|)      _______
           \_____/             \_____/
*/
.component('headbar', {
	bindings:{
		loog: "<"
	},
	controller : function($scope, $http) {

		// These functions connected with the app.js ..
		$scope.log = function () {
			$scope.$parent.change();
		};

		$scope.sign = function () {
			$scope.$parent.changes();
		};

		// The big getCar text in the top-left corner ..
		$scope.reset = function() {
			$scope.$parent.signUp = null;
			$scope.$parent.logIn = null;
			$scope.$parent.add = null;
			$scope.$parent.about = null;
			$scope.$parent.carAcc = null;

		};
		
		$scope.add = function () {
			$scope.$parent.addd();
		};

		$scope.abot = function () {
			$scope.$parent.shabout();
		};

		$scope.acc = function () {
			$scope.$parent.accc();
		};

		// the log out function ...
		this.out = function(){
			$http.get('/logout').then(function(data){
			  window.location = "../../index.html";
			});
		};
	},

	templateUrl: `
	client/templates/headbar.html
	`
});