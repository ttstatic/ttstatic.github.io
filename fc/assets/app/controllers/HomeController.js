(function() {
  "use strict";
  app.controller('HomeController', function($scope, $rootScope, $window) {

    $scope.width = $window.innerWidth;
		$scope.class = $scope.width > 767 ? "slide-in" : "";
		$scope.changeClass = function () {
			if ($scope.class === "slide-in")
				$scope.class = "";
			else
				$scope.class = "slide-in";
		};

		angular.element($window).bind('resize', function () {
			$scope.$apply(function () {
				$scope.width = $window.innerWidth;
			});
			if ($scope.width < 767)
				$scope.class = '';
			else
				$scope.class = 'slide-in';
		});

  });
})();
