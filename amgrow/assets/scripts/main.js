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
				$(target).fadeIn('fast').find('input').focus();
			});
			$('.closeModal').click(function(e) {
				e.preventDefault();
				$(this).parent().fadeOut('fast');
			});

			// FAT MENU
			$('.navbar-nav').on('mouseover', '> li', function() {
				var _this = $(this);

				_this.parent().find('li').removeClass('on');
				_this.addClass('on');

				// check if the hovered menu is active
				if ( _this.hasClass('on') ) {
					// if yes, show the element '.drop' next to it
					_this.parent().find('.drop').slideUp('fast');
					_this.next('.drop').slideDown('fast');
				} else {
					_this.next('.drop').slideUp('fast');
				}

			}).on('mouseleave', '.drop', function() {
				// hides the fat menu ones the mouse left the div area
				$(this).slideUp('fast');
			});

			// CATALOG VIEWS
			$('[data-toggle="view"]').on('click', function(e) {
				e.preventDefault();
				var view = $(this).data('view');
				var target = $(this).data('target');
				$(target).attr('data-view', view);
			});

		},

		//--------
		nocomma: null
	};
}());

// Init after the page has loaded
jQuery(Main.init);
