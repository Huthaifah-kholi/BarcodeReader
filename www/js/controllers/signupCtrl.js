app
.controller('signupCtrl', ['$scope', '$stateParams','$auth','$state',
    function ($scope, $stateParams, $auth, $state) 
    {
        var userMode = 'user';
        $scope.signup = function (signup) 
        {
	        
	        if (signup.adminAccount) 
	        {
	            userMode = 'admin';
	        }

            var newUser = 
            {
                name: signup.userName,
                email: signup.email,
                password: signup.password,
                role: userMode
            };
            // debugger;
            $auth.signup(newUser)
	            .then(function(response)
	            {
	                $state.go('login');
	            })
	            .catch(function (error) 
	            {
	                console.log("error response", error);
	            });
        };
    }
]);
