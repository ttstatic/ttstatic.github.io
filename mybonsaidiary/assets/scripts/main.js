var Main = (function () {
	// variables
	var ctr = 0;

	// object
	return {
		init: function () {

			if ( $(window).width() > 767 ) {
				$(window).on('load resize', function() {
					var winH = $(this).height();
					var headerH = $('header').outerHeight();
					var footerH = $('footer').outerHeight();
					$('section.hero').height(winH);
					$('section.login').height( winH - (headerH + footerH) );
				});
			} else {
				$(window).on('load', function() {
					var winH = $(this).height();
					var headerH = $('header').outerHeight();
					var footerH = $('footer').outerHeight();
					$('section.hero').height(winH);
					$('section.login').height( winH - (headerH + footerH) );
				});
			}

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
