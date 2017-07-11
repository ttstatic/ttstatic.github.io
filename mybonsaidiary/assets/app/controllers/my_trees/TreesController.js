(function() {
  "use strict";
  app.controller('treesController', function($scope, $http, $rootScope, $location) {
      var self = this;
      $rootScope.imIn = true;
      self.findTrees = "";
      self.currentDate = new Date();
      //Initial number of trees to load
      self.lazyLoad = 6;

      // Show message if Add/Edit
      if($rootScope.$root.isEdit || $rootScope.$root.isAdd){
        $("#addEdit").fadeToggle(5000);
        if($rootScope.$root.isAdd){
          self.messageAddEdit = "A bonsai tree has been successfully added.";
        }else if($rootScope.$root.isEdit){
          self.messageAddEdit = "A bonsai tree has been successfully updated.";
        }
        $rootScope.$root.isEdit = false;
        $rootScope.$root.isAdd = false;
      }
      // Call add/edit page and pass tree Id
      self.addEditTreeInfo = function(id, isAdd){
        $rootScope.Id = isAdd? id : "";
        $location.path('/addtree');
      };


      self.loadTreeList = function(){
        self.userId = 1;
        $http({
          method: 'GET',
          url: MYBONSAI_API_HOST + '/api/getMyTreesList?userId=' + self.userId + '&keyFilter=' + self.findTrees + '&lazyLoad=' + self.lazyLoad,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          $scope.myTrees = response.data.Trees;
          if($scope.myTrees.length > 0){
            $scope.totalCounts = $scope.myTrees[0].numOfRecords;
            $scope.recordCounts = $scope.myTrees.length;
          }
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log("error");
        });
      };
    // Sorting the list
    self.sortBy = function(propertyName) {
      self.sortSpecies = false;
      self.sortYear = false;
      self.reverse = (self.propertyName === propertyName) ? !self.reverse : false;
      self.propertyName = propertyName;
      if(propertyName === 'year'){
        self.sortYear = true;
        self.isYear = !self.reverse;
      }else if(propertyName === 'species'){
        self.sortSpecies = true;
        self.isSpecies = !self.reverse;
      }
    };

    // Function for lazy load of data
    $scope.showMoreTree = function(){
      self.lazyLoad += 3;
      self.loadTreeList();
    };
  /* Not yet needed

    $rootScope.imIn = true;

    // Control for listing of trees
      $scope.column = 4;
      $scope.viewSlider = {
        value: 3,
        options: {
          floor: 2,
          ceil: 4,
          showTicks: true,
          showTicksValues: true,
          onChange: function(sliderId, modelValue) {
            if (modelValue == 2) {
              $scope.column = 6 + " enlarge";
            }
            if (modelValue == 3) {
              $scope.column = 4;
            }
            if (modelValue == 4) {
              $scope.column = 3;
            }
          }
        }
      };
     */ 

     // Initial load of tree list
     self.loadTreeList();
  }).directive("scroll", function ($window) {
    return function(treesCtrl, element, attrs) {
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= 150 && treesCtrl.totalCounts > treesCtrl.recordCounts) {
              console.log(treesCtrl.totalCounts + ", " + treesCtrl.recordCounts);
              treesCtrl.showMoreTree();
              console.log('API call trigger');
             }
            treesCtrl.$apply();
        });
    };
});

})();

