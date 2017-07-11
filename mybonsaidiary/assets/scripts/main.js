var Main = (function () {
	// variables
	var ctr = 0;

	// object
	return {
		init: function () {

			var _win = $(window)
			// var winH = _win.height();
			// var headerH = $('header').outerHeight();
			// var footerH = $('footer').outerHeight();

			// if ( _win.width() > 767 ) {
			// 	_win.on('load resize', function() {
			// 		$('section.hero').height(winH);
			// 		$('section.login').height( winH - (headerH + footerH) );
			// 	});
			// } else {
			// 	_win.on('load', function() {
			// 		$('section.hero').height(winH);
			// 		$('section.login').height( winH - (headerH + footerH) );
			// 	});
			// }

			_win.on('load resize', function() {
				if ( $(this).width() > 767 ) {
					$('aside').removeClass('collapse');
				} else {
					$('aside').addClass('collapse');
				}
			});

			$('#togglePassword + i').click('click', function() {
				$(this).toggleClass('hide-pwd');
				if ( $(this).hasClass('hide-pwd') ) {
					$(this).prev().attr('type', 'text');
				} else {
					$(this).prev().attr('type', 'password');
				}
			});

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
