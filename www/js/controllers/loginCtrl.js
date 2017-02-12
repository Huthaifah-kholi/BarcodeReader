app.controller('loginCtrl', ['$scope', '$stateParams','$auth','$state', '$http','$rootScope','$ionicPopup', 'APIserver',
function ($scope, $stateParams, $auth, $state, $http, $rootScope, $ionicPopup, APIserver) 
{
    $scope.login = function (auth) 
    {
        var user = 
        {
        	email: auth.email,
            password: auth.password
        };
        $auth
          	.login(user)
              	.then(function (response) 
              	{
                  	console.log(response.data);
					// debugger;
                  	return $http.get(APIserver+'/api/authenticate/user');
          		})
          		.catch(function (response) 
          		{
					// console.log("error response", response);
	              	$ionicPopup.alert(
	              	{
		                title: 'Check your data',
		                template: 'Your email or password not correct'
					});
	            })
				.then(function(response) {
					var userObj = response.data.user;
					var userObjStr = JSON.stringify(userObj);
					localStorage.setItem('userObjStr', userObjStr);
					$rootScope.authenticated = true;
					$rootScope.currentUser = userObj;

					if (userObj.role === "admin") 
					{
						$state.go('admin');
					}
					else 
					{
						$state.go('user');
					}
				});
    }// end "$scope.login" functoin
}])