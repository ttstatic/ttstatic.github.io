var Main = (function () {
	// variables
	var ctr = 0;

	// object
	return {
		init: function () {

			$('body').on("click", "nav.navbar-scrollspy a", function(e) {
				e.preventDefault();
				var body = $(".block.content");
				var selector = $(this).attr("href");
				var objOffset = body.scrollTop() + $(selector).offset().top;
				body.stop().animate({scrollTop: objOffset}, '300', 'swing');
			});

		},

		//--------
		nocomma: null
	};
}());

// Init after the page has loaded
jQuery(Main.init);
