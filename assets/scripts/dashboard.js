var Dashboard = (function () {
  // variables
  var abc = 123;

  // object
  return {
    init: function () {
      
      Dashboard.offcanvas();
      Dashboard.box('.box-overview');
      Dashboard.forms();

      Dashboard.fitSignupPage();
      Dashboard.sidebarNavHighlight();
      
      Dashboard.scrollDirection();
    },
    
    sidebarNavHighlight: function () {
      $(".nav-sidebar > li > a").on("click", function() {
        //$(this).parents(".nav-sidebar:eq(0) li").removeClass("active");
        var cval = $.trim($(this).text().toLowerCase());
        if (!$(this).attr("data-toggle"))
          $.cookie("snavh", cval, {path: "/"});
      });
      $(".nav-sidebar li").each(function(){
        var navtext = $.trim($(this).find("a").text().toLowerCase());
        //console.log($.cookie("snavh") + " : " + navtext)
        if ($.cookie("snavh") == navtext) {
          $(this).addClass("active");
        }
      });
    },

    fitSignupPage: function () {

      jQuery(window).on("load resize", function () {
        _window_width = jQuery(this).width();
        _this = jQuery(this);

        if (_window_width < 767) {
          jQuery(".signup-wrap .left, .signup-wrap .right").height("auto");
          jQuery(".signup-wrap .left .content, .signup-wrap .right .content").css({
            position: "inherit",
            padding: "20px 0",
            textAlign: "left"
          });
          if (jQuery(".signup-wrap").is(":visible"))
            jQuery("body").css("background", "#e9edf2");
        } else {
          jQuery(".signup-wrap .left, .signup-wrap .right").removeAttr("style");
          jQuery(".signup-wrap .left .content, .signup-wrap .right .content").removeAttr("style");
          //
          jQuery(".signup-wrap .left, .signup-wrap .right").height(_this.height());
        }

        _this_content_left = jQuery(".signup-wrap .left .content");
        _this_content_right = jQuery(".signup-wrap .right .content");

        _this_content_left.height(_this_content_left.find("> div").outerHeight(true));
        _this_content_right.height(_this_content_right.find("> div").outerHeight(true));

        if (_this_content_right.find("> div").outerHeight(true) > _this.height()) {
          _this_content_right.height("auto");
          _this.css("overflow", "hidden");
          jQuery(".signup-wrap .right").css("overflow-y", "scroll");
        } else {
          _this_content_right.height(_this_content_right.find("> div").outerHeight(true));
        }
      });

    },

    forms: function () {
      
      Dashboard.triggerFormLabel();
      
      jQuery("body, .modal").on("click", ".form-interactive .casing .placeholder", function () {
        jQuery(this).parents(".casing:eq(0)").find(".form-control").trigger("focus");
      });
      jQuery("body, .modal").on("focus", ".form-interactive .casing .form-control", function () {
        jQuery(this).parents(".casing:eq(0)").find(".placeholder").addClass("move");
      }).on("blur", ".form-interactive .casing .form-control", function () {
        if (jQuery.trim(jQuery(this).val()) == "") {
          jQuery(this).parents(".casing:eq(0)").find(".placeholder").removeClass("move");
        }
      });

    },
    
    triggerFormLabel: function () {
      // moves the form placeholder if the form has value
      //setTimeout(function () {
        jQuery(".form-interactive .casing .placeholder").each(function () {
          var inputVal = jQuery.trim(jQuery(this).parents(".casing:eq(0)").find(":text, textarea").val());
          if (inputVal !== "" || inputVal === undefined) {
            jQuery(this).addClass('move');
          }
        });
      //}, 150);
    },
    
    charts : function () {
      
      // Number of Registrations chart
      $(function () {
        $('#noOfRegistrations').highcharts({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Number of Registrations'
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr'
            ],
            crosshair: true
          },
          yAxis: {
            min: 0,
            max: 6000,
            labels: {
              format: '{value}'
            },
            title: {
              text: ''
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.1,
              borderWidth: 0
            }
          },
          series: [{
            name: '2014',
            data: [2000, 3800, 5300, 5700]

          }, {
            name: '2015',
            data: [1570, 3755, 3500, 5650]

          }]
        });
      });
      
      // Total number of notices paid chart
      $(function () {
        $('#totalNotices').highcharts({
          chart: {
            type: 'bar'
          },
          title: {
            text: 'Total number of notices paid'
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            categories: ['Notice 1', 'Notice 2', 'Notice 3', 'All Notices'],
            title: {
              text: null
            },
            isSum: true
          },
          yAxis: {
            min: 0,
            title: {
              text: '',
              align: 'high'
            },
            labels: {
              overflow: 'justify'
            }
          },
          plotOptions: {
            bar: {
              dataLabels: {
                enabled: true
              }
            },
            backgroundColor: ('#333333' || '#FFFFFF')
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
          },
          series: [{
            name: '2015',
            data: [{
                y: 1200,
                color: '#36BFA1'
              }, {
                y: 1000,
                color: '#36BFA1'
              }, {
                y: 1400,
                color: '#36BFA1'
              }, {
                y: 3600,
                color: 'rgb(67, 67, 72)'
            }]
          }]
        });
      });
      
    },

    offcanvas: function () {
      
      jQuery("body").on("click", "[data-toggle='offcanvas']", function () {
        jQuery(".row-offcanvas").toggleClass("active");
        jQuery(".offcanvas-cover").show();
      });
      jQuery("body").on("click", ".offcanvas-cover", function () {
        jQuery(".row-offcanvas").removeClass("active");
        jQuery(".offcanvas-cover").hide();
      });

    },

    box: function (selector) {

      jQuery(window).on("load resize click", function () {

        Dashboard.boxReset(".box-overview");
        jQuery(selector).height(Dashboard.getMaxH(jQuery(selector)));

      });

    },

    boxReset: function (selector) {

      jQuery(selector).height("");

    },

    // Returns Max height of a group of selector
    getMaxH: function (selector) {
      var h = new Array();
      selector.each(function (index, value) {
        h[index] = jQuery(this).height();
      });
      return Math.max.apply(Math, h);
    },
    
    scrollDirection: function() {

      var lastScrollTop = 0;
      jQuery(window).scroll(function(event) {
        var st = jQuery(this).scrollTop();
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