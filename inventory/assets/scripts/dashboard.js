var Dashboard = (function () {
	// variables
	var abc = 123;
    var newBarChart, newRadChart, newLinChart, newPolChart;
	// object
	return {
		init: function () {
			Dashboard.offcanvas();
			Dashboard.forms();
			Dashboard.sidebarNavHighlight();

            Dashboard.animateElem();
			
			jQuery(":text, select").materialize();
			jQuery("textarea").materialize();
		},
        
        animateElem : function () {
            $(".logo img").addClass("animated flipInX");
            $(".nav-sidebar").addClass("animated fadeIn");
        },

		sidebarNavHighlight: function () {
			$(".nav-sidebar > li > a").on("click", function () {
				//$(this).parents(".nav-sidebar:eq(0) li").removeClass("active");
				var cval = $.trim($(this).text().toLowerCase());
				if (!$(this).attr("data-toggle"))
					$.cookie("snavh", cval, {
						path: "/"
					});
			});
			$(".nav-sidebar li").each(function () {
				var navtext = $.trim($(this).find("a").text().toLowerCase());
				//console.log($.cookie("snavh") + " : " + navtext)
				if ($.cookie("snavh") == navtext) {
					$(this).addClass("active");
				}
			});
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

		//--------
		nocomma: null
	};
}());

// Init after the page has loaded
jQuery(Dashboard.init);