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
        console.log(res);
      })
    }
$scope.addCommentbtn=function(username){
      //console.log('hiiiiii' , id)
      //console.log($scope.comment)
      $http({
        method:"POST",
        url: "/addComment",
        data :JSON.stringify({ comment:$scope.comment,username:username })
      })
      .then(function succssesCallback(res){
        $scope.arrayUser.push(res.data.username);
        $scope.arrayComment.push(res.data.comment);
        
      
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