angular.module('serviceController', [])

	// inject the Service service factory into our controller
	.controller('mainController', ['$scope','$http','Service', function($scope, $http, Service) {
		//{"id":3,"name":"echo3","endpoints":[{"option":{"host":"echo.jsontest.com","port":"80","path":"/status/200","method":"GET","headers":{}},"name":"Get All Content","status":{"status":"200"}},{"option":{"host":"echo.jsontest.com","port":"80","path":"/status/400","method":"GET","headers":{}},"name":"Get All Content","status":{"status":"400"}}],"status":{}}
		//var dummyService1 = {"id":1,"name":"echo","endpoints":[{"option":{"host":"echo.jsontest.com","port":"80","path":"/status/200","method":"GET","headers":{}},"name":"Get All Content","status":{"status":"200"}},{"option":{"host":"echo.jsontest.com","port":"80","path":"/status/400","method":"GET","headers":{}},"name":"Get All Content","status":{"status":"400"}}],"status":{}};
		//var dummyService2 = {"id":2,"name":"echo2","endpoints":[{"option":{"host":"echo.jsontest.com","port":"80","path":"/status/400","method":"GET","headers":{}},"name":"Get All Content","status":{"status":"400"}},{"option":{"host":"echo.jsontest.com","port":"80","path":"/status/500","method":"GET","headers":{}},"name":"Get All Content","status":{"status":"500"}}],"status":{}};

		$scope.services = [];
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all service and show them
		// use the service to get all the service
		Service.get()
			.success(function(data) {
				$scope.services = data;
				$scope.loading = false;
			});


		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createService = function() {
			if ($scope.formData.text != undefined) {
				$scope.loading = true;
				Service.create($scope.formData)
					.success(function(data) {
						$scope.loading = false;
						var newService = $scope.formData.text;
						$scope.services.push(JSON.parse(newService));
						$scope.formData = {};
					});
			}
		};

		$scope.checkStatus = function() {
			Service.status().success(function(data) {
				console.log(data);
			});
		};
	}]);
