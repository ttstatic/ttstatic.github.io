var Dashboard = (function () {
	// variables
	var abc = 123;
    
	// object
	return {
		init: function () {
			Dashboard.offcanvas();
			Dashboard.forms();
            
            //Dashboard.animateElem();
		},
        
        animateElem : function () {
            $(".logo img").addClass("animated flipInX");
            $(".nav-sidebar").addClass("animated fadeIn");
        },

		forms: function () {

			Dashboard.triggerFormLabel();

			$("body, .modal").on("click", ".form-interactive .casing .placeholder", function () {
				$(this).parents(".casing:eq(0)").find(".form-control").trigger("focus");
			});
			$("body, .modal").on("focus", ".form-interactive .casing .form-control", function () {
				$(this).parents(".casing:eq(0)").find(".placeholder").addClass("move");
			}).on("blur", ".form-interactive .casing .form-control", function () {
				if ($.trim($(this).val()) == "") {
					$(this).parents(".casing:eq(0)").find(".placeholder").removeClass("move");
				}
			});

		},

		triggerFormLabel: function () {
			// moves the form placeholder if the form has value
			//setTimeout(function () {
			$(".form-interactive .casing .placeholder").each(function () {
				var inputVal = $.trim($(this).parents(".casing:eq(0)").find(":text, textarea").val());
				if (inputVal !== "" || inputVal === undefined) {
					$(this).addClass('move');
				}
			});
			//}, 150);
		},

		offcanvas: function () {

			$("body").on("click", "[data-toggle='offcanvas']", function () {
				$(".row-offcanvas").toggleClass("active");
				$(".offcanvas-cover").show();
			});
			$("body").on("click", ".offcanvas-cover", function () {
				$(".row-offcanvas").removeClass("active");
				$(".offcanvas-cover").hide();
			});

		},

		box: function (selector) {

			$(window).on("load resize click", function () {

				Dashboard.boxReset(".chart-elem");
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
jQuery(Dashboard.init);