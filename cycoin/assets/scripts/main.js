document.addEventListener('DOMContentLoaded', function() {

  // ===========================================================================[ BURGER BAR ]
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener('click', function() {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }

  // ===========================================================================[ NAVBAR BG ]
  triggerScroll()
  window.addEventListener('scroll', function() {
    triggerScroll()
  });

  function triggerScroll() {
    if(this.scrollY >= 536) {
      document.querySelector('nav.navbar').classList.add("is-scrolled")
    } else {
      document.querySelector('nav.navbar').classList.remove("is-scrolled")
    }
  }

  // ===========================================================================[ LINK TO SECTION ]
  // var obj = $("a.navbar-item");
  // var body = $("html, body");
  // $(obj).on("click", function(e) {
  //   if ($(this).attr("data-target")) {
  //     e.preventDefault();
  //     var selector = $(this).attr("data-target");
  //     try {
  //       var objOffset = $(selector).offset().top - $("nav.navbar").height();
  //     } catch(e){}
  //     body.stop().animate({scrollTop: objOffset}, '200', 'swing');
  //   } else {
  //     location.href = '/' + this.href + "#";
  //   }
  // });

});
