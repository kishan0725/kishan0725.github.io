!(function($) {
  "use strict";

  // Handling themes
  if(localStorage.getItem('theme')===null) {
    localStorage.setItem('theme', 'light');
    $('.checkbox').prop('checked', false);
    enableDarkThemeMenu();
  }
  else {
    getAndSetTheme();
  }
  
  $('.checkbox').on('click', function() {
    toggleTheme();
  });

  function getAndSetTheme() {
    if(localStorage.getItem('theme')=='light') {
      $('.checkbox').prop('checked', false);
      enableDarkThemeMenu();
    }
    else {
      $('.checkbox').prop('checked', true);
      enableLightThemeMenu();
      enableTheme();
    }
  }

  function toggleTheme() {
    if(localStorage.getItem('theme')=='light') {
      localStorage.setItem('theme', 'dark');
      enableLightThemeMenu();
      enableTheme();
    }
    else {
      localStorage.setItem('theme', 'light');
      enableDarkThemeMenu();
      enableTheme();
    }
  }

  function enableDarkThemeMenu() {
    $('.light-theme').css('display','none');
    $('.dark-theme').css('display','block');
  }

  function enableLightThemeMenu() {
    $('.light-theme').css('display','block');
    $('.dark-theme').css('display','none');
  }

  function enableTheme() {
    $('body').toggleClass('body-dark-theme', 1000);
    $('.profile').toggleClass('dark-theme-profile', 1000);
    $('#portfolio').toggleClass('section-bg', 1000);
    $('.section-title').toggleClass('dark-theme-section', 1000);
    $('.about').toggleClass('dark-theme-about', 1000);
    $('.projects').toggleClass('dark-theme-project', 1000);
    $('.portfolio').toggleClass('dark-theme-portfolio', 1000);
    $('.resume').toggleClass('dark-theme-resume', 1000);
    $('.contact').toggleClass('dark-theme-contact', 1000);
  }

  // Hero typed
  if ($('.typed').length) {
    var typed_strings = $(".typed").data('typed-items');
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  $(document).on('click', '.mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  });

  $(document).click(function(e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    // Wait for all images to load
    var imgLoad = imagesLoaded('.portfolio-container');
    
    imgLoad.on('always', function() {
      // Initialize Isotope after all images are loaded
      var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      $('#portfolio-flters li').on('click', function() {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({
          filter: $(this).data('filter')
        });
        aos_init();
      });

      // Ensure layout is correct on initial load
      setTimeout(function() {
        portfolioIsotope.isotope('layout');
        $('li[data-filter=".filter-award"]').click();
      }, 100);
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  $("#sendMessage").on("click", function(e) {
      e.preventDefault(); // Prevent form submission
      var name = $("#name").val();
      var email = $("#email").val();
      var subject = $("#subject").val();
      var message_area = $("#message").val();
      console.log(name);
      if(!name || !email || !subject || !message_area) {
        $('.error-message').html('Please fill in all required fields').show();
        return;
      }
      if(!isEmail(email)) {
        $('.error-message').html('Please enter a valid email address').show();
        return;
      }

      $('.loading').show();
      $('.error-message').hide();
      $('.sent-message').hide();

      $.ajax({
        url: "https://formspree.io/f/mgepdnbo", 
        method: "POST",
        data: {
          name: name,
          email: email,
          subject: subject,
          message: message_area
        },
        dataType: "json"
      })
      .done(function() {
        $('.loading').hide();
        $('.sent-message').show();
        // Clear form
        $('#name').val('');
        $('#email').val('');
        $('#subject').val('');
        $('#message').val('');
      })
      .fail(function(err) {
        $('.loading').hide();
        $('.error-message').html('There was an error sending your message. Please try again.').show();
      });
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-back",
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);
