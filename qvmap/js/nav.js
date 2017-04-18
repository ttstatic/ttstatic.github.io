var $window; // top element global

//mobile navigation
(function() {

    var searchbut, searchdiv;
    var ul; // mobile menu html element
    var opened = false;
    var sopened = false;
    $(document).ready(initNav);

    function initNav() {

        // select nav links to copy


        var nav = $("header nav.main ul li a,header .login > a ,header .nav > ul li a ");
        //build mob nav list
        ul = $("<ul id='mobileNav'></ul>");
        var str = "";
        for (var i = 0; i < nav.length; i++) {
            var li = $("<li ></li>");
            li.append($(nav[i]).clone());
            ul.append(li);
        }

        $("body").append(ul);
        $("#mobNavButton").click(open);

        searchbut = $(".search-icon-xs");
        searchdiv = $("#mobile-search");
        ul.css('z-index', '9997');
        searchdiv.css('z-index', '9998');
        if (searchbut.length > 0) {
            $(searchbut[0]).click(toggleSearch);
        }

        $(window).resize(align);
    }

    function open() {

        if (opened) {
            close();
            return;
        }

        // cross button effect
        $('.burgx3').stop().transition({
            rotate: "45",
            "margin-top": "13px"
        });
        $('.burgx2').stop().transition({
            opacity: "0"
        }, "fast");
        $('.burgx').stop().transition({
            rotate: "-45",
            "margin-top": "13px"
        });

        ul.stop().slideDown();
        opened = true;
        closeSearch();
    }

    function close() {
        if (!opened) return;
        ul.stop().slideUp();
        opened = false;

        // cross button effect
        $('.burgx3').stop().transition({
            rotate: "+=135",
            "margin-top": "3px"
        });
        $('.burgx2').transition({
            opacity: "1"
        }, "fast");
        $('.burgx').stop().transition({
            rotate: "-=135",
            "margin-top": "23px"
        });
    }


    function toggleSearch(e) {

        e.preventDefault();
        if (sopened) {
            closeSearch();
        } else {
            openSearch();
        }
    }

    function openSearch() {
        sopened = true;
        searchdiv.slideDown();
        close();
    }

    function closeSearch() {
        if (!sopened) {
            return;
        }
        sopened = false;
        searchdiv.slideUp();
    }

    function align() {
        setTimeout(function() {
            if ($('#mobNavButton').css('display') == "none") {
                if (opened) close();
                if (sopened) closeSearch();
            }
        }, 100);
    }

})();


///////////////////////////////////////////////////////////


// left fixed-aux-nav
(function() {

    var nav, getpremium;
    var h, hh;
    var ul;
    var y = 162;

    $(document).ready(init);

    function init() {
        $window = $(getScrollTopElement());
        var div = $('.fixed-aux-nav');
        getpremium = $($('.get-premium-side')[0]);
        if (div.length < 1) return;
        nav = $(div[0]);
        ul = $(nav.find("ul")[0]);
        align();
        $(window).scroll(limit);
        $(window).resize(function() {
            align();
        });
    }

    function align() {
        limit(null);
        //to be sure of hidding the mobile nav
        if ($('#mobNavButton').css('display') != "none") {
            nav.hide();
        } else {
            nav.show()
        }
    }

    // top and down limits for the left nav bar
    function limit(e) {
        if ($('#mobNavButton').css('display') != "none") {
            nav.hide();
            return;
        }
        h = $(window).height();
        hh = ul.height() + 40;
        if ($('#free-version').length > 0) hh = hh + getpremium.height();
        var yy = $window.scrollTop();
        var ly = $($(".cities-selector-nav")[0]).offset().top;
        var lim = ly - yy;
        var py = hh + y;
        if (lim < py) {

            var fy = (ly - hh) - (nav.parent().offset().top + 100);
            nav.css({
                'top': fy + 'px',
                'position': 'absolute'
            });
            getpremium.css({
                'top': (fy + ul.height() + 20) + 'px',
                'position': 'absolute'
            });
        } else {

            var off = $('#free-version').length > 0 ? 180 : 100;
            if (yy < off) {
                nav.css({
                    'top': (0) + 'px',
                    'position': 'absolute'
                });
                getpremium.css({
                    'top': (ul.height() + 20) + 'px',
                    'position': 'absolute'
                });
            } else {
                nav.css({
                    'top': (y - 100) + 'px',
                    'position': 'fixed'
                });
                getpremium.css({
                    'top': (y - 100 + (ul.height() + 20)) + 'px',
                    'position': 'fixed'
                });
            }
        }
    }
})();


//////////////////////////////////////////////////////////////////

//fixed top nav hide/show
(function() {
    $(document).ready(initNav);
    var asection = 0;

    function initNav() {
        var haslim = $(".scrollLimit").length > 0;
        if (!haslim && $('header').length < 1) return;
        var op = false;
        if ($('.sticky-top').length < 1) return;
        var nav = $($('.sticky-top')[0]);
        $(window).scroll(function() {
            var scro = $window.scrollTop();
            var lim = haslim ? $($(".scrollLimit")[0]).offset().top : $($('header')[0]).offset().top + $($('header')[0]).height();
            if (scro >= lim && !op) {
                op = true;
                nav.animate({
                    top: '0px'
                }, 400);
            } else if (scro < lim && op) {
                op = false;
                nav.animate({
                    top: '-60px'
                }, 400);
            }
        });
    }

})();


/////////////////////////////////////////////////////////////////

/* body or html?  for firefox */
function getScrollTopElement() {
    if (document.compatMode !== 'CSS1Compat') return 'body';
    var html = document.documentElement;
    var body = document.body;
    var startingY = window.pageYOffset || body.scrollTop || html.scrollTop;
    var newY = startingY + 1;
    window.scrollTo(0, newY);
    var element = (html.scrollTop === newY) ? 'html' : 'body';
    window.scrollTo(0, startingY);
    return element;
}


/////////////////////////////////////////////////////////////////

//scroll to .sectionAnchor class elements 
//<a href='javascript:goToAnchor(n)'>go n</a>
(function() {
    $(document).ready(function() {
        window.goToAnchor = goTo;
    });

    function goTo(n) {
        var el = $($('.sectionAnchor')[n]);
        if (el) {
            var y = el.offset().top - 80;
            $('html, body').animate({
                'scrollTop': y
            }, 600, 'easeInOutQuad');
        }
    }
})();


/////////////////////////////////////////////////////////////////


//auto select links in .fixed-aux-nav
(function() {

    $(document).ready(function() {

        $(window).scroll(function() {
            var windscroll = $window.scrollTop();

            if ($(".sectionAnchor").length < 1) return;
            if (windscroll >= 100) {

                $('.sectionAnchor').each(function(i) {
                    if ($(this).offset().top <= windscroll + 150) {
                        $('.fixed-aux-nav ul li').removeClass('active');
                        $('.fixed-aux-nav ul li').eq(i).addClass('active');
                    }
                });

            } else {
                $('.fixed-aux-nav ul li').removeClass('active');
                $('.fixed-aux-nav ul li:first').addClass('active');
            }

        }).scroll();
    });

})();

////////////////////////////////////////////////////////////////////////

// global go to top of page
function goToTop() {
    $('html, body').animate({
        'scrollTop': 0
    }, 600, 'easeInOutQuad');
}

/////////////////////////////////////////////////////////////////////////

//tooltips
(function() {

    $(document).ready(function() {
        var i = 0;
        $(".fa").each(function() {
            var nextEl = $(this).next();
            if (nextEl.hasClass('tooltipTxt')) {
                $('body').append(nextEl);
                $(this).attr('data-n', i);
                i++;
            }
        });

        $(".fa[data-n] ").mouseover(function() {
            eleOffset = $(this).offset();
            var tt = $('.tooltipTxt').eq($(this).attr('data-n'));
            tt.fadeIn("fast");
            if (eleOffset.left + $(this).outerWidth() + 10 < $(window).width() - 200)
                tt.css({
                    left: eleOffset.left + $(this).outerWidth() + 10,
                    top: eleOffset.top
                });
            else
                tt.css({
                    left: eleOffset.left - 70,
                    top: eleOffset.top + $(this).outerHeight() + 10
                });

        }).mouseout(function() {
            $('.tooltipTxt').eq($(this).attr('data-n')).hide();
        });
    });

})();


/////////////////////////////////////////////////////////////////


//login button
(function() {

    var logged = false;
    var loggedLinks, loginBut, loggedBut;
    var opened = false;
    $(document).ready(init);

    function init() {

        loggedLinks = $(".logged-in-nav").eq(0);
        loginBut = $('.logged-out');
        loggedBut = $('.logged-in');
        loggedLinks.hide();
        setLoginStatusView();

        loginBut.click(loginButtonAction);
        loggedBut.click(open);
    }

    function open(e) {
        e.preventDefault();

        if (opened) {
            loggedLinks.fadeOut();
            opened = false;
        } else {
            loggedLinks.css('z-index', '9999');
            loggedLinks.fadeIn();
            opened = true;
        }

    }

    function loginButtonAction(e) {
        e.preventDefault();

        /* ad hoc , just to show */
        logged = true;
        setLoginStatusView();
    }

    function setLoginStatusView() {
        if (logged) {
            loggedBut.show();
            loginBut.hide();

            //add buttons to mobile menu
            mobileToggle();

        } else {
            loggedBut.hide();
            loginBut.show();
        }
    }

    function mobileToggle() {
        //clone and show the logged nav links in the mobile menu
        $("#mobileNav li.mobLoggedLinks").remove();
        var lis = loggedLinks.find('li');
        for (var i = 0; i < lis.length; i++) {
            var li = lis.eq(i).clone();
            li.addClass('mobLoggedLinks');
            $("#mobileNav").append(li);
            li.hide();
        }
        $("#mobileNav .logged-in").parent().hide();
        $("#mobileNav li.mobLoggedLinks:first").css('border-top', '1px #bbbbbb solid');
        $("#mobileNav li.mobLoggedLinks").slideDown();
    }

})();