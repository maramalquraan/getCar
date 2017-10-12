angular.module('get-car')

// Sidebar Component
.component('filters', {
  // the data from the app component .. 
	bindings: {
		searchtt: '<'
	},

  controller: function($scope, $filter, $http,){
    // Our custom price filter
    $scope.rangeMin = 0;
    $scope.rangeMax = 1000000;

    // the custom filter function ..
    $scope.filterRange = function(obj) {
      return obj.price > $scope.rangeMin && obj.price <= $scope.rangeMax;
    };

    // choosing all of them ..
    $scope.all = function(){
      $scope.rangeMin = 0;
      $scope.rangeMax = 1000000;
    };

    // chosing the minimum range ..
    $scope.min = function(){
      $scope.rangeMin = 0;
      $scope.rangeMax = 10000;
    };

    // chosing the middle range .. 
    $scope.mid = function(){
      $scope.rangeMin = 10000;
      $scope.rangeMax = 30000;
    };

    // choosing the highest range ..
    $scope.max = function(){
      $scope.rangeMin = 30000;
      $scope.rangeMax = 1000000;
    };

	},

	templateUrl: `
    client/templates/filters.html
	`
});