(function () {
	"use strict";
	app.controller("HomeController", function ($scope, parallaxHelper) {
		$scope.background = parallaxHelper.createAnimator(-0.3);
	});
})();
