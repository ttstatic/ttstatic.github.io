var Drinkpoint = (function () {
	// variables
	var abc = 123;
    
	// object
	return {
		init: function () {
            
            Dashboard.box(".box > p:nth(1)");
            
		},
        
        animateElem : function () {
            $(".logo img").addClass("animated flipInX");
            $(".nav-sidebar").addClass("animated fadeIn");
        },

		box: function (selector) {

			$(window).on("load resize", function () {

				Dashboard.boxReset(".box > p:nth(1)");
				$(selector).height(Dashboard.getMaxH($(selector)));

			});

		},

		boxReset: function (selector) { 

			$(selector).height("");

		},

		// Returns Max height of a group of selector
		getMaxH: function (selector) {
			var h = new Array();
			selector.each(function (index, value) {
				h[index] = $(this).height();
			});
			return Math.max.apply(Math, h);
		},

		scrollDirection: function () {

			var lastScrollTop = 0;
			$(window).scroll(function (event) {
				var st = $(this).scrollTop();
				if (st > lastScrollTop) {
					$(".submitbtn").fadeOut();
					//console.log("down");
				} else {
					$(".submitbtn").fadeIn();
					//console.log("up");
				}
				lastScrollTop = st;
			});

		},

		//--------
		nocomma: null
	};
}());

// Init after the page has loaded
jQuery(Drinkpoint.init);