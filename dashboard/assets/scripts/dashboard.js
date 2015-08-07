var Dashboard = (function () {
	// variables
	var abc = 123;

	// object
	return {
		init: function () {
			Dashboard.offcanvas();
			//Dashboard.box('.box-overview');
			Dashboard.forms();
			Dashboard.sidebarNavHighlight();

			//Dashboard.scrollDirection();
            Dashboard.flipChart();
            Dashboard.initChart();
		},
      
        flipChart : function () {
            $(".chart-elem").click(function() {
                var _this = $(this);
                _this.find("canvas").removeAttr("style");
                _this.parent().find(".chart-elem").addClass("stack").removeClass("selected animated flipInX");
                _this.addClass("selected animated flipInX");
                
                $(".chart").addClass("stack-wrap").find(".stack").each(function(index) {
                    var _this = $(this);
                    if(!_this.hasClass("selected")) {
                        _this.addClass("o_" + (index+1));
                    }
                });
                _this.removeClass(function(index, classNames) {
                    var thisClass =  classNames.split(" ");
                    var removeClass = [];
                    $.each(thisClass, function(index, class_name) {
                        if (/o_.*/.test(class_name)) {
                            removeClass.push(class_name);
                        }
                    });
                    return removeClass.join(" ");
                });
            });
        },
      
        initChart : function () {
            
            var barCtx = $("#barChart").get(0).getContext("2d");
            var radCtx = $("#radChart").get(0).getContext("2d");
            var linCtx = $("#linChart").get(0).getContext("2d");
            var polCtx = $("#polChart").get(0).getContext("2d");
            
            var newBarChart = new Chart(barCtx);
            var newRadChart = new Chart(radCtx);
            var newLinChart = new Chart(linCtx);
            var newPolChart = new Chart(polCtx);
            
            Chart.defaults.global.responsive = true;
            
            // Bar
              var data = {
                  labels: ["January", "February", "March", "April", "May", "June", "July"],
                  datasets: [
                      {
                          label: "My First dataset",
                          fillColor: "rgba(220,220,220,0.5)",
                          strokeColor: "rgba(220,220,220,0.8)",
                          highlightFill: "rgba(220,220,220,0.75)",
                          highlightStroke: "rgba(220,220,220,1)",
                          data: [65, 59, 80, 81, 56, 55, 40]
                      },
                      {
                          label: "My Second dataset",
                          fillColor: "rgba(151,187,205,0.5)",
                          strokeColor: "rgba(151,187,205,0.8)",
                          highlightFill: "rgba(151,187,205,0.75)",
                          highlightStroke: "rgba(151,187,205,1)",
                          data: [28, 48, 40, 19, 86, 27, 90]
                      }
                  ]
              };
              new Chart(barCtx).Bar(data);
            
            // Radar
              var data = {
                  labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
                  datasets: [
                      {
                          label: "My First dataset",
                          fillColor: "rgba(220,220,220,0.2)",
                          strokeColor: "rgba(220,220,220,1)",
                          pointColor: "rgba(220,220,220,1)",
                          pointStrokeColor: "#fff",
                          pointHighlightFill: "#fff",
                          pointHighlightStroke: "rgba(220,220,220,1)",
                          data: [65, 59, 90, 81, 56, 55, 40]
                      },
                      {
                          label: "My Second dataset",
                          fillColor: "rgba(151,187,205,0.2)",
                          strokeColor: "rgba(151,187,205,1)",
                          pointColor: "rgba(151,187,205,1)",
                          pointStrokeColor: "#fff",
                          pointHighlightFill: "#fff",
                          pointHighlightStroke: "rgba(151,187,205,1)",
                          data: [28, 48, 40, 19, 96, 27, 100]
                      }
                  ]
              };
              new Chart(radCtx).Radar(data);
            
            // Line
              var data = {
                  labels: ["January", "February", "March", "April", "May", "June", "July"],
                  datasets: [
                      {
                          label: "My First dataset",
                          fillColor: "rgba(220,220,220,0.2)",
                          strokeColor: "rgba(220,220,220,1)",
                          pointColor: "rgba(220,220,220,1)",
                          pointStrokeColor: "#fff",
                          pointHighlightFill: "#fff",
                          pointHighlightStroke: "rgba(220,220,220,1)",
                          data: [65, 59, 80, 81, 56, 55, 40]
                      },
                      {
                          label: "My Second dataset",
                          fillColor: "rgba(151,187,205,0.2)",
                          strokeColor: "rgba(151,187,205,1)",
                          pointColor: "rgba(151,187,205,1)",
                          pointStrokeColor: "#fff",
                          pointHighlightFill: "#fff",
                          pointHighlightStroke: "rgba(151,187,205,1)",
                          data: [28, 48, 40, 19, 86, 27, 90]
                      }
                  ]
              };
              new Chart(linCtx).Line(data);
            
            // Polar
              var data = [
                  {
                      value: 300,
                      color:"#F7464A",
                      highlight: "#FF5A5E",
                      label: "Red"
                  },
                  {
                      value: 50,
                      color: "#46BFBD",
                      highlight: "#5AD3D1",
                      label: "Green"
                  },
                  {
                      value: 100,
                      color: "#FDB45C",
                      highlight: "#FFC870",
                      label: "Yellow"
                  },
                  {
                      value: 40,
                      color: "#949FB1",
                      highlight: "#A8B3C5",
                      label: "Grey"
                  },
                  {
                      value: 120,
                      color: "#4D5360",
                      highlight: "#616774",
                      label: "Dark Grey"
                  }

              ];
              new Chart(polCtx).PolarArea(data);
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

		box: function (selector) {

			$(window).on("load resize click", function () {

				Dashboard.boxReset(".box-overview");
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