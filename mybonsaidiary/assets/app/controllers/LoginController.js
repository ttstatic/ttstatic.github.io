(function() {
  "use strict";
  app.controller('loginController', function($scope, $rootScope, $timeout) {
    $rootScope.imIn = false;
    $rootScope.imHome = false;

    $scope.excludeElem = angular.element('.exclude');
    $scope.minusHeight = 0;
    angular.forEach($scope.excludeElem, function(value, index) {
      $scope.minusHeight += value.offsetHeight;
    });
    $scope.stretch = { minHeight: (window.innerHeight - $scope.minusHeight) };
  });
})();
