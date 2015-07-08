var Dashboard = (function() {
    // variables
    var abc = 123;

    // object
    return {
        init: function() {

            Dashboard.offcanvas();
            Dashboard.box('.box-overview');
            Dashboard.forms();
            
            Dashboard.fitSignupPage();
            
        },
        
        fitSignupPage : function () {
            
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
                
                if( _this_content_right.find("> div").outerHeight(true) > _this.height() ) {
                    _this_content_right.height("auto");
                    _this.css("overflow", "hidden");
                    jQuery(".signup-wrap .right").css("overflow-y", "scroll");
                } else {
                    _this_content_right.height(_this_content_right.find("> div").outerHeight(true));
                }
            });
            
        },
        
        forms : function () {
            
            jQuery("body, .modal").on("click", ".form-interactive .casing .placeholder", function() {
                jQuery(this).parents(".casing:eq(0)").find(".form-control").trigger("focus");
            });
            jQuery("body, .modal").on("focus", ".form-interactive .casing .form-control", function(){
                jQuery(this).parents(".casing:eq(0)").find(".placeholder").addClass("move");
            }).on("blur", ".form-interactive .casing .form-control", function(){
                if(jQuery.trim(jQuery(this).val()) == "") {
                    jQuery(this).parents(".casing:eq(0)").find(".placeholder").removeClass("move");
                }
            });
            
        },
        
        offcanvas : function () {
            
            jQuery('[data-toggle="offcanvas"]').click(function () {
                jQuery('.row-offcanvas').toggleClass('active');
                jQuery(".offcanvas-cover").show();
            });
            jQuery('.offcanvas-cover').click(function(){
                jQuery('.row-offcanvas').removeClass('active');
                jQuery(".offcanvas-cover").hide();
            });
            
        },
        
        box : function (selector) {
            
            jQuery(window).on("load resize click", function() {
                
                Dashboard.boxReset('.box-overview');
                jQuery(selector).height( Dashboard.getMaxH(jQuery(selector)) );
                
            });
            
        },
        
        boxReset : function (selector) {
            
            jQuery(selector).height("");
            
        },
        
        // Returns Max height of a group of selector
        getMaxH : function (selector) {
            var h = new Array();
            selector.each(function(index, value) {
                h[index] = jQuery(this).height();
            });
            return Math.max.apply(Math, h);
        },
        
        //--------
        nocomma: null
    };
}());

// Init after the page has loaded
jQuery(Dashboard.init);