var mainJs = (function() {
    // variables
    var abc = 123;

    // object
    return {
        init: function() {

            mainJs.toggleMobileTopicMenu();
            mainJs.urLive();
            //mainJs.liveUrl();
            mainJs.togglePost();
            mainJs.toggleView();
            mainJs.toggleTopics();
            mainJs.reply();
            mainJs.sendPhotos();
            mainJs.popOver();
            mainJs.modalFileUpload();
            mainJs.datePicker();
            mainJs.mediaEdit();
            mainJs.box(".files.grid .media .pads");
            mainJs.toggleTheme();
            
            //mainJs.scrollDirection();
            mainJs.centerColorPicker();
            
            mainJs.toggleLogo();
            
            mainJs.fitPageHeight();
            
            mainJs.dropdownTextChange();
            
            mainJs.notify();
            
            
            // fades out after loading the whole page to hide flickering of layout from the default skin
            jQuery(document).ready(function() {
                jQuery(".generic-overlay").fadeOut("fast");
            });
            
            jQuery(document).ready(function() {
                jQuery("#createTopicGroup .topic-selector tbody").on("click", "tr", function() {
                    var parent = jQuery(this).parents(".column:eq(0)").hasClass("list");
                    var goto = "";

                    if(parent)
                        goto = ".selected"
                    else
                        goto = ".list";

                    jQuery(this).remove();
                    jQuery(this).clone().appendTo("#createTopicGroup .topic-selector " + goto + " table tbody");
                });
            });
            
            jQuery(".sortable").sortable();
        },
        
        toggleMobileTopicMenu : function () {
            
            /*
             * Toggle Mobile Topic Menu
             */
            jQuery('[data-toggle="offcanvas"]').click(function () {
                jQuery('.row-offcanvas').toggleClass('active');
            });
            
        },
        
        urLive : function () {
            
            /*
             * URLive plugin
             * Generates a thumbnail from pasted links
             */
            jQuery('textarea.share-url').on('input propertychange', function () {
                jQuery(this).urlive({
                    container: '.share-url-container',
                    callbacks: {
                        onStart: function () {
                            jQuery('.input-post .fa-circle-o-notch').show();
                            jQuery('.share-url-container').urlive('remove');
                        },
                        onSuccess: function (data) {
                            jQuery('.input-post .fa-circle-o-notch').hide();
                            jQuery('.share-url-container').urlive('remove');
                        },
                        noData: function () {
                            jQuery('.input-post .fa-circle-o-notch').hide();
                            jQuery('.share-url-container').urlive('remove');
                        }
                    }
                });
            });
            jQuery('.share-link').each(function (index) {
                var container = jQuery(this).parents(".media-body:eq(0)").find(".share-link-container").attr("class");
                jQuery(this).parents(".media-body:eq(0)").find(".share-link-container").addClass("index" + index);
                jQuery(this).urlive({
                    container: '.' + container + '.index' + index,
                    imageSize: 'small'
                });
            });
            
        },
        
        liveUrl : function () {
            
            var curImages = new Array();

            $('textarea.share-url').liveUrl({
                loadStart : function() {
                    //$('.liveurl-loader').show();
                    jQuery(".input-post .circle-o-notch").show();
                },
                loadEnd : function() {
                    jQuery(".input-post .circle-o-notch").hide();
                },
                success : function(data) {                        
                    var output = $('.liveurl');
                    output.find('.title').text(data.title);
                    output.find('.description').text(data.description);
                    output.find('.url').text(data.url);
                    output.find('.image').empty();

                    output.find('.close').one('click', function() {
                        var liveUrl     = $(this).parent();
                        liveUrl.hide('fast');
                        liveUrl.find('.video').html('').hide();
                        liveUrl.find('.image').html('');
                        liveUrl.find('.controls .prev').addClass('inactive');
                        liveUrl.find('.controls .next').addClass('inactive');
                        liveUrl.find('.thumbnail').hide();
                        liveUrl.find('.image').hide();

                        $('textarea').trigger('clear'); 
                        curImages = new Array();
                    });

                    output.show('fast');

                    if (data.video != null) {                       
                        var ratioW        = data.video.width  /350;
                        data.video.width  = 350;
                        data.video.height = data.video.height / ratioW;

                        var video = 
                        '<object width="' + data.video.width  + '" height="' + data.video.height  + '">' +
                            '<param name="movie"' +
                                  'value="' + data.video.file  + '"></param>' +
                            '<param name="allowScriptAccess" value="always"></param>' +
                            '<embed src="' + data.video.file  + '"' +
                                  'type="application/x-shockwave-flash"' +
                                  'allowscriptaccess="always"' +
                                  'width="' + data.video.width  + '" height="' + data.video.height  + '"></embed>' +
                        '</object>';
                        output.find('.video').html(video).show();


                    }
                },
                addImage : function(image) {
                    var output  = $('.liveurl');
                    var jqImage = $(image);
                    jqImage.attr('alt', 'Preview');

                    if ((image.width / image.height)  > 7 
                    ||  (image.height / image.width)  > 4 ) {
                        // we dont want extra large images...
                        return false;
                    } 

                    curImages.push(jqImage.attr('src'));
                    output.find('.image').append(jqImage);


                    if (curImages.length == 1) {
                        // first image...

                        output.find('.thumbnail .current').text('1');
                        output.find('.thumbnail').show();
                        output.find('.image').show();
                        jqImage.addClass('active');
                        
                        // just added - RODAN
                        jQuery(".thumbnail").hide();
                        
                    }

                    if (curImages.length == 2) {
                        output.find('.controls .next').removeClass('inactive');
                        
                        // just added - RODAN
                        jQuery(".thumbnail").show();
                    }

                    output.find('.thumbnail .max').text(curImages.length);
                }
            });


            $('.liveurl ').on('click', '.controls .button', function() {
                var self        = $(this);
                var liveUrl     = $(this).parents('.liveurl');
                var content     = liveUrl.find('.image');
                var images      = $('img', content);
                var activeImage = $('img.active', content);

                if (self.hasClass('next')) 
                     var elem = activeImage.next("img");
                else var elem = activeImage.prev("img");

                if (elem.length > 0) {
                    activeImage.removeClass('active');
                    elem.addClass('active');  
                    liveUrl.find('.thumbnail .current').text(elem.index() +1);

                    if (elem.index() +1 == images.length || elem.index()+1 == 1) {
                        self.addClass('inactive');
                    }
                }

                if (self.hasClass('next')) 
                     var other = elem.prev("img");
                else var other = elem.next("img");

                if (other.length > 0) {
                    if (self.hasClass('next')) 
                           self.prev().removeClass('inactive');
                    else   self.next().removeClass('inactive');
               } else {
                    if (self.hasClass('next')) 
                           self.prev().addClass('inactive');
                    else   self.next().addClass('inactive');
               }
            });
            
        },
        
        togglePost : function () {
            
            /*
             * Hide/Show the post button from Feed input box
             */
            jQuery(".share-url").on("focus", function () {
                jQuery(this).css("height", "100px");
                jQuery(".input-post .btn-post").fadeIn();
            }).on("blur", function () {
                jQuery(this).css("height", "35px");
                jQuery(".input-post .btn-post").fadeOut();
            });
            
        },
        
        toggleView : function () {
            
            /*
             * Toggle Grid/List view from Files page
             */
            jQuery(".view .btn").on("click", function () {
                jQuery(this).parent().find(".btn").removeClass("active");
                jQuery(this).addClass("active");

                if (jQuery(this).hasClass("grid")) {
                    jQuery(".files").addClass("grid");
                } else {
                    jQuery(".files").removeClass("grid");
                }
            });
            
        },
        
        toggleTopics : function () {
            
            /*
             * Toggle Expand/Collapse of Topics
             */
            jQuery(".panel-1>ul:not('.not')>li>a").on("click", function (e) {
                e.preventDefault();
                jQuery(this).find("i").toggleClass("fa fa-minus-circle fa fa-plus-circle");
                jQuery(this).parent().find(">ul").toggle();
            });
            
        },
        
        reply : function () {
            
            /*
             * Reply Button
             */
            jQuery(".controls .btn-reply").on("click", function (e) {
                e.preventDefault();
                jQuery(this).closest(".media-body").find(".reply-box").show();
                jQuery(this).closest(".media-body").find(".reply-box textarea").focus();
            });
            
        },
        
        sendPhotos : function () {
            
            /*
             * Send Photos
             */
            jQuery(".reply-box .btn-photo").on("click", function () {
                jQuery(this).parent().find(":file").trigger("click");
            });
            
        },
        
        popOver : function () {
            
            /*
             * Pop over
             */
            jQuery(".grid-info").popover({
                html     :  true,
                title    :  function () {
                    var infoTitle = jQuery.trim( jQuery(this).parent().find(".title").text() );
                    return infoTitle;
                },
                template :  '<div class="popover" role="tooltip">' +
                                '<div class="arrow"></div>' +
                                '<h3 class="popover-title"></h3>' +
                                '<div class="popover-content"></div>' +
                            '</div>'
                ,
                content  :  function () {
                    var cont = jQuery(this).parent().find("span.list-info").clone();
                    return cont.html();
                }
            });
            
        },
        
        modalFileUpload : function () {
            
            /*
             * File Upload
             */
            jQuery(".file-upload").dropzone({ url: "/uploads" });
            
        },
        
        datePicker : function () {
            
            /*
             * Date Picker
             */
            $('.calEvStart, .calEvEnd').datetimepicker({
                //timepicker:false, //uncomment if you want to hide the time picker
                mask:true // '9999/19/39 29:59' - digit is the maximum possible for a cell
            });
            
        },
        
        mediaEdit : function () {
            
            // trigger edit mode
            jQuery(".media-edit").on("click", function (e) {
                e.preventDefault();
                
                var objRef = jQuery(this).parents(".media-body").find(".editable:eq(0)");
                var editText = jQuery.trim(objRef.text());
                
                // saves the initial value to a hidden element. pull our the value from here if cancel is triggered
                objRef.parent().find("input[type='hidden']").remove();
                objRef.before("<input type='hidden' value='" + editText + "'>");
                
                objRef.text("");
                objRef.append("<textarea class='form-control' rows='2'>" + editText + "</textarea>");
                objRef.parent().find(".mode-edit").show();
            });
            
            // trigger save
            jQuery(".mode-edit .save").on("click", function (e) {
                e.preventDefault();
                
                var saveText = jQuery(this).parent().prev().find("textarea").val();
                jQuery(this).parent().hide();
                jQuery(this).parent().prev().text(saveText);
            });
            
            // trigger cancel
            jQuery(".mode-edit .cancel").on("click", function (e) {
                e.preventDefault();
                
                var oldVal = jQuery(this).parents(".post-content:eq(0)").find("input[type='hidden']").val();
                jQuery(this).parent().hide();
                jQuery(this).parent().prev().text(oldVal);
            });
            
        },
        
        box : function (selector) {
            
            jQuery(window).on("load resize click", function() {
                
                mainJs.boxReset('.files.grid .media .pads');
                jQuery(selector).height( mainJs.getMaxH(jQuery(selector)) );
                
            });
            
        },
        
        boxReset : function (selector) {
            
            jQuery(selector).height("");
            
        },
        
        toggleTheme : function () {
            
            jQuery("link#theme").attr("href", "/public/css/theme/" + jQuery.cookie("theme") + ".min.css");
            
            jQuery(".color-theme-picker ul li").each(function() {
                if ( jQuery(this).find("a").attr("id") == jQuery.cookie("theme") )
                    jQuery(this).addClass("active");
            });
            
            jQuery(".color-theme-picker ul li a").on("click", function (e) {
                
                e.preventDefault();
                
                jQuery.cookie("theme", this.id, {path: "/"}); //color name
                
                var color = this.id;
                
                if (color)  jQuery("link#theme").attr("href", "/public/css/theme/" + color + ".min.css")
                    else    jQuery("link#theme").attr("href", "");
                
                jQuery(this).parents("ul:eq(0)").find("li").removeClass("active");
                jQuery(this).parent().addClass("active");
                
                mainJs.toggleLogo();
                
            });
            
        },
        
        centerColorPicker : function () {
            
            jQuery(".color-theme-picker").on("click", "> i", function () {
                var $this = jQuery(this).parent();
                $this.addClass("active");
                jQuery(".generic-overlay").fadeIn().click(function() {
                    jQuery(this).hide();
                    $this.removeClass("active").removeAttr("style");
                });
                
                var translateW = $this.outerWidth()/2;
                var translateH = $this.outerHeight()/2;
                
                $this.css({
                    marginRight: -translateW+"px",
                    marginBottom: -translateH+"px"
                });
            }).find("> a").click(function(e) {
                e.stopPropagation();
                jQuery(this).parent().removeClass("active").removeAttr("style");
                jQuery(".generic-overlay").hide();
            });
            
        },
        
        // Returns Max height of a group of selector
        getMaxH : function (selector) {
            var h = new Array();
            selector.each(function(index, value) {
                h[index] = jQuery(this).height();
            });
            return Math.max.apply(Math, h);
        },
        
        // Returns Scroll direction
        scrollDirection : function () {
            
            var lastScrollTop = 0;
            jQuery(window).scroll(function(event){
                var st = jQuery(this).scrollTop();
                if (st > lastScrollTop){
                    if ( jQuery(".generic-overlay").is(":hidden") ) 
                        jQuery(".color-theme-picker").show();
                    
                    
                    //console.log("down");
                } else {
                    if ( jQuery(".generic-overlay").is(":hidden") ) 
                        jQuery(".color-theme-picker").hide();
                    
                    
                    //console.log("up");
                }
                lastScrollTop = st;
            });
            
        },
        
        toggleLogo : function () {
            
            if (jQuery.cookie("theme") && jQuery.cookie("theme") == "whitecliffe") {
                jQuery(".app-logo img, .app-logo-mob img").attr("src", "/public/img/logo/whitecliffe.png")
            } else {
                jQuery(".app-logo img, .app-logo-mob img").attr("src", "/public/img/logo/bc.png");
            }
            
        },
        
        fitPageHeight : function () {
            jQuery(window).on("load resize", function() {
                var top = mainJs.isVisible( jQuery(".toolbar") ) + mainJs.isVisible( jQuery(".logo-wrap") ) + mainJs.isVisible( jQuery(".navbar[role='navigation']") );
                var bottom = jQuery("footer").outerHeight(true);
                var win = jQuery(window).height();
                
                var h = win - (top + bottom);
                
                //console.log("top : " + top + "\n" + "bottom : " + bottom + "\n" + "window height : " + win + "\n" + "total height : " + h);
                
                jQuery(".row-offcanvas > .container").css("min-height", h + "px");
                
            });
        },
        
        isVisible : function (obj) {
            
            if ( obj && obj.is(":visible") )
                return obj.outerHeight(true);
            else 
                return 0;
            
        },
        
       	like : function (obj, e) {
            e.preventDefault();
            
            if ( jQuery(obj).hasClass("fa-caret-up") ) {
            	jQuery(obj).parent().find("small").attr("class", "fa fa-heart");
                
                jQuery(obj).parent().find("a").css("pointer-events", "auto");
                obj.style.pointerEvents = 'none';
            } else {
                jQuery(obj).parent().find("small").attr("class", "fa fa-heart-o");
                
                jQuery(obj).parent().find("a").css("pointer-events", "auto");
                obj.style.pointerEvents = 'none';
            }
        },
        
        dropdownTextChange : function (selector) {
            
            jQuery(".nav-contacts ul.dropdown-menu li a").on("click", function () {
                var text = jQuery.trim(jQuery(this).text());
                jQuery(this).parents(".dropdown:eq(0)").find(".dropdown-toggle span.text").text(text);
            });
            
        },
        
        notify : function () {
            $('.icon-notification.active .animated').toggleClass("swing");
            setTimeout(function() {
                mainJs.notify();
            },500);
        },

        //--------
        nocomma: null
    };
}());

// Init after the page has loaded
jQuery(mainJs.init);

