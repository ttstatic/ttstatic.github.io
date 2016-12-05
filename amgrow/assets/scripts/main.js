var Main = (function () {
	// variables
	var ctr = 0;

	// object
	return {
		init: function () {

			// SEARCH MODAL
			$('#allSearch').click(function(e) {
				e.preventDefault();
				var target = $(this).data('target');
				$(target).fadeIn().find('input').focus();
			});
			$('.closeModal').click(function(e) {
				e.preventDefault();
				$(this).parent().fadeOut();
			});

			// FAT MENU
			$('.navbar-nav').on('mouseover', '> li', function() {
				var li = $(this);
				li.parent().find('li').removeClass('on');
				li.parent().find('li').next('.drop').hide();
				li.addClass('on').next('.drop').show();
				if ( li.hasClass('on') ) {
					li.next('.drop').show();
				} else {
					li.next('.drop').hide();
				}
				li.next('.drop').mouseout(function() {
					$(this).hide();
				});
			});

		},

		//--------
		nocomma: null
	};
}());

// Init after the page has loaded
jQuery(Main.init);
