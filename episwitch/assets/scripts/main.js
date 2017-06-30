var Main = (function () {
	// variables
	var ctr = 0;

	// object
	return {
		init: function () {

			var _win = $(window)

			_win.on('load resize', function() {
				console.log($(window.top).height());
				if ( _win.width() > 767 ) {
					$('section.hero').height( $(window.top).height() );
				} else {
					$('section.hero').height('auto');
				}
			});

			$('.goto-results a').on("click", function(e) {
				e.preventDefault();
				var body = $("html, body");
				var selector = $(this).attr("href");
				var objOffset = $(selector).offset().top;
				body.stop().animate({scrollTop: objOffset}, '300', 'swing');
			});

		},

		//--------
		nocomma: null
	};
}());

// Init after the page has loaded
jQuery(Main.init);
