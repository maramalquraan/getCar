angular.module('get-car')

// Our treasure hunt ..
.component('add', {

  bindings: {
   userin: '<'
  },
	controller: function ($scope, $http){
      // uploading the image ..
      $scope.image = document.getElementById("image").onchange = function(evt){
        var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
        if(FileReader && files && files.length){
          var fr = new FileReader();
          fr.onload = function(){
                $scope.image.src =  fr.result;
          };
          fr.readAsDataURL(files[0]);

        }
      };
      
    $scope.add = function(){
      //collect data from user in one obj

    $scope.car = {type : $scope.type , color : $scope.color , price : $scope.price , image : $scope.image.src, username: $scope.$ctrl.userin[0], phone: $scope.$ctrl.userin[1], option: $scope.SaleOrRent};
    if($scope.car.type !== undefined && $scope.car.color !== undefined  && $scope.car.price !== undefined && $scope.car.image !== undefined){
      //send the car to the server
    $http.post("/add" , $scope.car)
      .then(function(data){
        $scope.add = false;
        window.location = "../../index.html"
      }, function(data){
          console.log("ERROR !!")
        });
    console.log($scope.car)
  };
};
  
},
	templateUrl: `
    client/templates/add.html
	`
});