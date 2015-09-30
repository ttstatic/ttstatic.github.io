var Drinkpoint = (function () {
	// variables
	var abc = 123;
    
	// object
	return {
		init: function () {
            
            Drinkpoint.box(".box > p:first-of-type");
            Drinkpoint.box(".post .content > p:first-child");
          
            //Drinkpoint.fitPageHeight()
          /*
            $(".events .event").each(function() {
				if ( !$(this).find("p").length ) {
					$(this).addClass("no-after");
				}
			});
          */
		},
      
        fitPageHeight : function () {
            jQuery(window).on("load resize", function() {
                if (jQuery(this).width() > 990) {
                    //var top = Drinkpoint.isVisible( jQuery(".navbar-wrapper") );
                    var win = jQuery(window.top).height();

                    //var h = win - top;

                    jQuery("#headerBanner").css("height", win + "px");
                } else {
                    jQuery("#headerBanner").css("height", "auto");
                }
            });
        },

        isVisible : function (obj) {

            if ( obj && obj.is(":visible") )
                return obj.outerHeight(true);
            else 
                return 0;

        },
        
        box: function (selector) {

			$(window).on("load resize", function () {

				Drinkpoint.boxReset(".box > p:first-of-type");
                Drinkpoint.boxReset(".post .content > p:first-child");
				$(selector).height(Drinkpoint.getMaxH($(selector)));

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