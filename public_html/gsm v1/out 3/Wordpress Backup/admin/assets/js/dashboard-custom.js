/* ----------------- Start Document ----------------- */
(function ($) {
  "use strict";
  $(document).ready(function () {

    /*----------------------------------------------------*/
    /*Mobile slick nav
   /*----------------------------------------------------*/
    $('#navigation').slicknav({
      duration: 500,
      closedSymbol: '<i class="fas fa-plus"></i>',
      openedSymbol: '<i class="fas fa-minus"></i>',
      prependTo: '#dashboard-Navigation',
      allowParentLinks: false,
      duplicate: false,
      closeOnClick: false,
      parentLinks: false,
      activeClass: 'active-menu'
    });

    // Add custom menu state handling
    $(document).on('click', '.slicknav_item', function () {
      var $parent = $(this).closest('li');
      if ($parent.hasClass('slicknav_parent')) {
        if ($parent.hasClass('slicknav_collapsed')) {
          $parent.removeClass('slicknav_collapsed').addClass('slicknav_open');
        } else {
          $parent.removeClass('slicknav_open').addClass('slicknav_collapsed');
        }
      }
    });

    // Preserve menu state on page load
    var currentPath = window.location.pathname;
    $('#navigation li a').each(function () {
      var href = $(this).attr('href');
      if (href && currentPath.includes(href)) {
        var $parent = $(this).closest('li.slicknav_parent');
        if ($parent.length) {
          $parent.removeClass('slicknav_collapsed').addClass('slicknav_open');
        }
      }
    });

    /*----------------------------------------------------*/
    /*  Counters
/*----------------------------------------------------*/
    $(window).on('load resize', function () {
      $('.dashboard-stat-content h5').counterUp({
        delay: 100,
        time: 800
      });
    });

    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
    // ------------------ End Document ------------------ //
  });

})(this.jQuery);