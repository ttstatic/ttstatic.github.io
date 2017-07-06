var Main = (function () {
	// variables
	var ctr = 0;

	// object
	return {
		init: function () {

			var onMobile;
			$(window).on('load resize', function() {
				if ( $(this).width() < 768 ) {
					onMobile = true;
				} else {
					onMobile = false;
					$('body').css('overflow', '');
				}
				if ( onMobile ) {
					$('#cartBox').on('show.bs.collapse', function () {
						$('body').css('overflow', 'hidden');
					}).on('hide.bs.collapse', function () {
						$('body').css('overflow', '');
					});
				}
			});

		},

		//--------
		nocomma: null
	};
}());

// Init after the page has loaded
jQuery(Main.init);
