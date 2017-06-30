app.filter('SampleStatusFilter', function () {
	return function (input) {
		if (input) {
			return 'Active'
		} else {
			return 'Inactive'
		}
	};
})