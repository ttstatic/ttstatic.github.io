var Main = (function () {
	// variables
	var ctr = 0;

	// object
	return {
		init: function () {

			var _win = $(window)
			var winH = _win.height();
			var headerH = $('header').outerHeight();
			var footerH = $('footer').outerHeight();

			if ( _win.width() > 767 ) {
				_win.on('load resize', function() {
					$('section.hero').height(winH);
					$('section.login').height( winH - (headerH + footerH) );
				});
			} else {
				_win.on('load', function() {
					$('section.hero').height(winH);
					$('section.login').height( winH - (headerH + footerH) );
				});
			}

			_win.on('load resize', function() {
				if ( $(this).width() > 767 ) {
					$('aside').removeClass('collapse');
				} else {
					$('aside').addClass('collapse');
				}
			});

		},

		//--------
		nocomma: null
	};
}());

// Init after the page has loaded
jQuery(Main.init);
