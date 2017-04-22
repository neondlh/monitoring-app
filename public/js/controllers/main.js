angular.module('serviceController', [])

	// inject the Service service factory into our controller
	.controller('mainController', ['$scope','$http','Service', function($scope, $http, Service) {
		var dummyServices = [];
		var dummyService1 = {"id":1,"name":"echo","endpoints":[{"option":{"host":"echo.jsontest.com","port":"80","path":"/status/200","method":"GET","headers":{}},"name":"Get All Content","status":{"status":"200"}},{"option":{"host":"echo.jsontest.com","port":"80","path":"/status/400","method":"GET","headers":{}},"name":"Get All Content","status":{"status":"400"}}],"status":{}};
		var dummyService2 = {"id":2,"name":"echo2","endpoints":[{"option":{"host":"echo.jsontest.com","port":"80","path":"/status/400","method":"GET","headers":{}},"name":"Get All Content","status":{"status":"400"}},{"option":{"host":"echo.jsontest.com","port":"80","path":"/status/500","method":"GET","headers":{}},"name":"Get All Content","status":{"status":"500"}}],"status":{}};
		dummyServices.push(dummyService1);
		dummyServices.push(dummyService2);

		$scope.loading = true;
		console.log('serviceController');

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Service.get()
			.success(function(data) {
				$scope.services = dummyServices;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createService = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Service.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};
	}]);
