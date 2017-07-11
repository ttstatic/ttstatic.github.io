(function() {
  "use strict";
  app.controller('mainController', function($scope, $rootScope) {
    $rootScope.imHome = true;
    $scope.stretch = { minHeight: window.innerHeight };
  });
})();
