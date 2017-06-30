(function () {
	"use strict";
	app.config(function ($routeProvider, $locationProvider) {
		$routeProvider

			.when('/', {
				// templateUrl: 'home.html'
				templateUrl: 'sample.html',
				controller : 'sampleController as sampleCtrl'
			})

			.when('/sample', {
				templateUrl: 'sample.html',
				controller : 'sampleController as sampleCtrl'
			})

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	});
})();
