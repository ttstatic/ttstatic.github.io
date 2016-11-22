var Main = (function () {
	// variables
	var ctr = 0;

	// object
	return {
		init: function () {

			$(window).on('load resize', function() {
				if ( $(this).width() < 768 ) {
					$('.inputSearch').show();
				} else {
					$('.inputSearch').hide();
				}
			});
			$('form.search').on('click', '#toggleCollapse', function() {
				$(this).parent().find('.inputSearch').toggle();
			}).on('click', '.clear', function() {
				$(this).parent().find('input').val('').focus();
			});

			$("[data-toggle='submenu-collapse']").click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(this).toggleClass('collapsed')
				$(this).parent().find('.collapse').toggle();
			});

		},

		//--------
		nocomma: null
	};
}());

// Init after the page has loaded
jQuery(Main.init);
