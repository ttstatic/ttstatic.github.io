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
  window.addEventListener('scroll', function() {
    if(this.scrollY >= 536) {
      document.querySelector('nav.navbar').classList.add("is-scrolled")
    } else {
      document.querySelector('nav.navbar').classList.remove("is-scrolled")
    }
    // 536
  })

});
