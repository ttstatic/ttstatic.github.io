var Main = (function () {
	// variables
	var ctr = 0;

	// object
	return {
		init: function () {

			$(window).on("scroll", function(e) {
				if ( $(this).scrollTop() > 0 ) {
					$(".navbar-default").addClass("fixed");
				} else {
					$(".navbar-default").removeClass("fixed");
				}
			});

			Main.scroll(".navbar-default .navbar-nav > li:not(.dropdown) > a");

			Main.attachments();
		},

		scroll : function (obj) {

			var body = $("html, body");

			$(obj).on("click", function(e) {
				e.preventDefault();
				if ( $( $(this).attr("href") ).length ) {
					console.log("meron");
					var selector = $(this).attr("href");
					var objOffset = $(selector).offset().top - ($(window).width() > 767 ? 95 : 50);
					body.stop().animate({scrollTop: objOffset}, '200', 'swing');
				} else {
					console.log("wala");
					var url = $(this).attr("data-url");
					if( url ) {
						location.href = url;
					} else {
						location.href = "index.html" + $(this).attr("href");
					}
				}
			});

		},

		attachments : function() {
			var body = $("html, body");
			$('.action_download a').click(function(e) {
				e.stopPropagation();
				$(this).toggleClass('active');
			});
			body.on('click', ':not(.action_download)', function() {
				$('.action_download a').removeClass('active');
			});
		},

		//--------
		nocomma: null
	};
}());

// Init after the page has loaded
jQuery(Main.init);
