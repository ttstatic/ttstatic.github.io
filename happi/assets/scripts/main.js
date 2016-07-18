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

			// Main.mobilePlayVideo();


			$(window).scroll(function() {
			  if($(window).scrollTop() + $(window).height() > $(document).height() - $('footer').outerHeight(true)) {
		    	$('.action_download').css('bottom', function() {
						return 70 + $('footer').height();
					});
			  } else {
					$('.action_download').removeAttr('style');
				}
			});

		},

		scroll : function (obj) {

			var body = $("html, body");

			$(obj).on("click", function(e) {
				e.preventDefault();
				if ( $( $(this).attr("href") ).length ) {
					// console.log("meron");
					var selector = $(this).attr("href");
					var objOffset = $(selector).offset().top - ($(window).width() > 767 ? 95 : 50);
					body.stop().animate({scrollTop: objOffset}, '200', 'swing');
				} else {
					body.stop();
					// console.log("wala");
					var url = $(this).attr("data-url");
					var toggle = $(this).attr("data-toggle");
					if( url ) {
						location.href = url;
					} else if( toggle ) {
						e.preventDefault();
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

		mobilePlayVideo: function() {
			var iframe = document.getElementById('videoAboutHappi');

			// $f == Froogaloop
			var player = $f(iframe);

			$('.btn-play-vid-mob').on("click", function() {
			  player.api("play");
			});

		},

		//--------
		nocomma: null
	};
}());

// Init after the page has loaded
jQuery(Main.init);
