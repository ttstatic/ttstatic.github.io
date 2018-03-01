var Main = (function () {
	// variables
	var ctr = 0;

	// object
	return {
		init: function () {

			$(window).on('load resize', function() {
				if ($(this).width() <= 991) {
					slideOut('');
				}
			});
			$('#navToggle').on('click', function() {
				slideOut('slideIn');
			});
			function slideOut(obj) {
				$('aside.admin, .mobile-bar').toggleClass(obj);
			}

		},

		//--------
		nocomma: null
	};
}());

// Init after the page has loaded
jQuery(Main.init);
