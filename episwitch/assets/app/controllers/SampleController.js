(function () {
	"use strict";
	app.controller("sampleController", function ($mdEditDialog, $q, $scope, $timeout, DessertConstant) {
		$scope.selected = [];
		$scope.limitOptions = [5, 10, 15];
		$scope.options = {
			rowSelection: true,
			multiSelect: true,
			autoSelect: true,
			decapitate: false,
			largeEditDialog: false,
			boundaryLinks: false,
			limitSelect: true,
			pageSelect: true
		};
		$scope.query = {
			order: 'name',
			limit: 5,
			page: 1
		};
		$scope.removeFilter = function () {
	    $scope.filter.show = false;
	    $scope.query.filter = '';

	    if($scope.filter.form.$dirty) {
	      $scope.filter.form.$setPristine();
	    }
	  };
		/* ---------------------------[Para sa search functionality, kaso di ko mapagana.]------
		var bookmark;
		$scope.filter = {
	    options: {
	      debounce: 500
	    }
	  };
		function success(desserts) {
	    $scope.desserts = desserts;
	  }
		$scope.getDesserts = function () {
	    $scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
	  };
	  $scope.$watch('query.filter', function (newValue, oldValue) {
	    if(!oldValue) {
	      bookmark = $scope.query.page;
	    }

	    if(newValue !== oldValue) {
	      $scope.query.page = 1;
	    }

	    if(!newValue) {
	      $scope.query.page = bookmark;
	    }

	    $scope.getDesserts();
	  });
		--------*/

		$scope.desserts = DessertConstant.desserts;

		$scope.editComment = function (event, dessert) {
			event.stopPropagation(); // in case autoselect is enabled

			var editDialog = {
				modelValue: dessert.comment,
				placeholder: 'Add a comment',
				save: function (input) {
					if (input.$modelValue === 'Donald Trump') {
						input.$invalid = true;
						return $q.reject();
					}
					if (input.$modelValue === 'Bernie Sanders') {
						return dessert.comment = 'FEEL THE BERN!'
					}
					dessert.comment = input.$modelValue;
				},
				targetEvent: event,
				title: 'Add a comment',
				validators: {
					'md-maxlength': 30
				}
			};

			var promise;

			if ($scope.options.largeEditDialog) {
				promise = $mdEditDialog.large(editDialog);
			} else {
				promise = $mdEditDialog.small(editDialog);
			}

			promise.then(function (ctrl) {
				var input = ctrl.getInput();

				input.$viewChangeListeners.push(function () {
					input.$setValidity('test', input.$modelValue !== 'test');
				});
			});
		};

		$scope.toggleLimitOptions = function () {
			$scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
		};

		$scope.getTypes = function () {
			return ['Candy', 'Ice cream', 'Other', 'Pastry'];
		};

		$scope.loadStuff = function () {
			$scope.promise = $timeout(function () {
				// loading
			}, 2000);
		}

		$scope.logItem = function (item) {
			console.log(item.name, 'was selected');
		};

		$scope.logOrder = function (order) {
			console.log('order: ', order);
		};

		$scope.logPagination = function (page, limit) {
			console.log('page: ', page);
			console.log('limit: ', limit);
		}
	});
})();
