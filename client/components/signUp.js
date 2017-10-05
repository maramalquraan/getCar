angular.module('get-car')
// Join us now or be ready to fight ..
/*             .-. \_/ .-.
               \.-\/=\/.-/
            '-./___|=|___\.-'
           .--| \|/`"`\|/ |--.
          (((_)\  .---.  /(_)))
           `\ \_`-.   .-'_/ /`_
             '.__       __.'(_))
                 /     \     //
                |       |__.'/
                \       /--'`
           .--,-' .--. '----.
           '----`--'  '--`----'
*/
.component('signUp', {
  controller: function($scope, $http){
    
      $scope.addUser=function(){
        $scope.newUse = {
          name: $scope.newUser.name,
          password: $scope.newUser.password,
          numberPhon: parseInt($scope.newUser.numberPhon),
          email: $scope.newUser.email
        };
  
        $scope.newUser.name = "";
        $scope.newUser.password = "";
        $scope.newUser.numberPhon = "";
        $scope.newUser.email = "";

        $http.post("/signUp", $scope.newUse).then(function(data){
          // this one to hide the sing up template ..
          $scope.$parent.signUp = false;
          window.location = "../../index.html";
        }, function(data){
          console.log("error??");
        }) 
      }
    },
	
	templateUrl: `
    client/templates/signUp.html
	`
});

       // // // // // // // // // // // // // // //   ,:
       //                                           ,' |
       //                                          /   :
       //                                       --'   /
       //                                       \/ />/
       //                                       / <//_\
       //                                    __/   /
       //                                    )'-. /
       //                                    ./  :\
       //                                     /.' '
       //                                   '/'
       //                                   +
       //                                  '
       //                                `.
       //                            .-"-
       //                           (    |
       //                        . .-'  '.
       //                       ( (.   )8:
       //                   .'    / (_  )
       //                    _. :(.   )8P  `
       //                .  (  `-' (  `.   .
       //                 .  :  (   .a8a)
       //                /_`( "a `a. )"'
       //            (  (/  .  ' )=='
       //           (   (    )  .8"   +
       //             (`'8a.( _(   (
       //          ..-. `8P    ) `  )  +
       //        -'   (      -ab:  )
       //      '    _  `    (8P"Ya
       //    _(    (    )b  -`.  ) +
       //   ( 8)  ( _.aP" _a   \( \   *
       // +  )/    (8P   (88    )  )
       //    (a:f   "     `"       `
