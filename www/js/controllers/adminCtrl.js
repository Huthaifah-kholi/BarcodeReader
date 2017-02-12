app.
controller('adminCtrl', ['$scope', '$stateParams','$auth','$rootScope','$state','$http','APIserver',

function ($scope, $stateParams, $auth, $rootScope, $state, $http, APIserver ) 
{
    // get the data users from DB
    $http.get(APIserver+'/api/users')
    .success(function(data) {
        console.log(data);
        $scope.users = data;
        debugger;
    })
    .error(function(data) {
        console.error('Repos error', data);
    })

    $scope.changeBarcode = function(id,user_id)
    {
        // console.log("the id to send",id);
        var newid = 
        {
            newId : id,
            newUserId : user_id

        }
        // debugger;
        $http.post(APIserver+'/genrateBarcode',newid)
	        .then(
		        function successCallback(response) 
		        {
		            console.log("the barcode cahnged");
		        },
		        function errorCallback(response) 
		        {
		            console.log("error",response);
		        })
    }// end of "$scope.genarateBarcode" function

    $scope.logout = function() 
    {
        $auth.logout()
	        .then(function()
		        {
		            localStorage.removeItem('userObjStr');
		            $rootScope.authenticated = false;
		            $rootScope.currentUser = null;
		            $state.go('login');
		        });
    }

    function displayUses(data) {

        return ;
    }
}])
