angular.module('monitoringService', [])

	// super simple service
	// each function returns a promise object
	.factory('Service', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/services');
			},
			create : function(todoData) {
				return $http.post('/api/services', serviceData);
			}
		}
	}]);
