var Main = (function () {
	// variables
	var ctr = 0;

	// object
	return {
		init: function () {

			Main.scrollDirection()

		},

		scrollDirection: function() {

      var lastScrollTop = 0;
      jQuery(window).scroll(function(event) {
        var st = jQuery(this).scrollTop();

				if (st > 0) {
					$(".backtotop").show();
				} else {
					$(".backtotop").hide();
				}
        if (st > lastScrollTop) {
          // $(".backtotop").hide();
          // console.log("down");
        } else {
          // $(".backtotop").show();
          // console.log("up");
        }
        lastScrollTop = st;
      });

    },

		//--------
		nocomma: null
	};
}());

// Init after the page has loaded
jQuery(Main.init);
