app
.controller('userCtrl', ['$scope', '$stateParams','$auth','$rootScope','$state','$cordovaBarcodeScanner', '$ionicPlatform','$http','$ionicPopup','APIserver',
function ($scope, $stateParams, $auth, $rootScope, $state, $cordovaBarcodeScanner, $ionicPlatform, $http, $ionicPopup, APIserver) 
{
	// this is to get data from local storgae
	var readedBarCode=""
	// debugger;
	var localStorageObj = localStorage.getItem('userObjStr');
	var userObj = JSON.parse(localStorageObj);
	$scope.userCode = userObj.barcode;
	$scope.name = userObj.name;
	$scope.result = readedBarCode.text;
	console.log("user bar code from DB : ",$scope.userCode);

	// for logout
	$scope.logout = function() 
	{
		//auth service for logout
		$auth.logout().then(function() 
		{
		    localStorage.removeItem('userObjStr');
		    $rootScope.authenticated = false;
		    $rootScope.currentUser = null;
		    $state.go('login');
		});
	}// end of "$scope.logout" function

	// for scan barcode
	$scope.scan = function()
	{
		$ionicPlatform.ready(function() 
		{
		    $cordovaBarcodeScanner.scan()
		        .then(function(result) 
		        {
		            // Success! Barcode data is here
		            readedBarCode =
		            {
		                text : result.text,
		                format : result.format
		            };
		            console.log(result);
		            // debugger;
		            postBarcode(readedBarCode);

		        }, 
		        function(error) 
		        {
		            ////////$scope.scanResults = 'Error: ' + error;
		        });
		}); // end of ready function
	} // end of scan func


	postBarcode= function (barcodeData) 
	{
		// readedBarCode['userid']=
		console.log("post function" ,readedBarCode);
		debugger;
		$http.post(APIserver+'/checkBarcode', readedBarCode)
			.then(
			    function successCallback(response) 
			    {
			        if(response.data === "barcode not exist")
			        {
			            console.log("fdasdas");
			            debugger;
			            $ionicPopup
				            .alert({
								title: 'Barcode does not exist',
								template: 'This barcode does not exist in server !'
							});
			        }
			        else 
			        {
			            $ionicPopup
				            .alert({
				                title: 'Barcode does exist',
				                template: 'This barcode exist in server'
				            });
			        }
			},
			function errorCallback(response) 
			{
			    $ionicPopup
				    .alert({
						title: 'Check your Connection',
						template: 'There is a problem !'
					});
			})
	} // end of "$scope.postBarcode" function

}])