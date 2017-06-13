var Main = (function () {
	// variables
	var ctr = 0;

	// object
	return {
		init: function () {

			if ( $(window).width() > 767 ) {
				$(window).on('load resize', function() {
					var winH = $(this).height();
					$('section.hero').height(winH);
				});
			} else {
				$(window).on('load', function() {
					var winH = $(this).height();
					$('section.hero').height(winH);
				});
			}

		},

		//--------
		nocomma: null
	};
}());

// Init after the page has loaded
jQuery(Main.init);

// $(document).ready(function() {
// 	$('.loading').fadeOut();
// });
