angular.module('get-car')

// this part is responsible of showing the cars ..

.component('show', {
  bindings: {
  car: "<",
  userInfo :"<"
  },


  controller: function($http,$scope){
      $scope.arrayUser=[];
      $scope.arrayComment=[];

    $scope.deleteCar=function(id){
      // console.log('hiiiiii' , id)
      $http({
        method:"POST",
        url: "/deleteCar",
        data :JSON.stringify({ id : id})
      })
      .then(function succssesCallback(res){
         window.location = "../../index.html"
      })
    }
$scope.addCommentbtn=function(id){
      //console.log('hiiiiii' , id)
      console.log($scope.comment , $scope.username)
      $http({
        method:"PUT",
        url: "/addComment",
        data :JSON.stringify({ comment:$scope.comment,username:$scope.username , id : id })
      })
      .then(function succssesCallback(res){
         window.location = "../../index.html"
        console.log(res)
      
        //console.log($scope.array);
      })
    }
  },
    

   
  templateUrl: `client/templates/show.html`
});

/*
          Seem to be or not seem to be....
                    \
                         ,,,,,,
                        /e   ''(
                       (_ `     \
                      ___>       \
                     / ,_\-.___   \_
                    /  _)/ /        \
                    |  \  /  ` _     |
                  __\____/    /    ' |
                 /  _        /______/
                / _/ \,_____/o     (
                \__)/`              \
                   /   \__________/_/_
                 _/     \  \   )/     \
                /      /   |  /\      (
                \_____/ ___/  \ \  _/  \
           ______/_/___|_|     ) \     /
          /       o\     o\   /  /    /\
       ,,,'-----^--',,,,,,',,|_,,\_ ,,\/,,
*/