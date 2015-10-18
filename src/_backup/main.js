/*
  By Osvaldas Valutis, www.osvaldas.info
  Available for use under the MIT License
*/

;( function( $, window, document, undefined ) {
  'use strict';

  var elSelector    = '.header',
    $element    = $( elSelector );

  if( !$element.length ) return true;

  var elHeight    = 0,
  elTop     = 0,
  $document   = $( document ),
  dHeight     = 0,
  $window     = $( window ),
  wHeight     = 0,
  wScrollCurrent  = 0,
  wScrollBefore = 0,
  wScrollDiff   = 0;

  $window.on( 'scroll', function() {
    elHeight    = $element.outerHeight();
    dHeight     = $document.height();
    wHeight     = $window.height();
    wScrollCurrent  = $window.scrollTop();
    wScrollDiff   = wScrollBefore - wScrollCurrent;
    elTop     = parseInt( $element.css( 'top' ) ) + wScrollDiff;

    if( wScrollCurrent <= 0 ) // scrolled to the very top; element sticks to the top
      $element.css( 'top', 0 );

    else if( wScrollDiff > 0 ) // scrolled up; element slides in
      $element.css( 'top', elTop > 0 ? 0 : elTop ).addClass('i-exist');

    else if( wScrollDiff < 0 ) // scrolled down
    {
      if( wScrollCurrent + wHeight >= dHeight - elHeight )  // scrolled to the very bottom; element slides in
        $element.css( 'top', ( elTop = wScrollCurrent + wHeight - dHeight ) < 0 ? elTop : 0 ).addClass('i-exist');

      else // scrolled down; element slides out
        $element.css( 'top', Math.abs( elTop ) > elHeight ? -elHeight : elTop ).removeClass('i-exist');
    }

    wScrollBefore = wScrollCurrent;
  });

})( jQuery, window, document );

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length){
        if ($('header').hasClass('i-exist')) {  
          var top_offset = $('.header').height();
          $('html,body').animate({
             scrollTop: target.offset().top - top_offset - 20
          }, 1000);
        } else {
          $('html,body').animate({
             scrollTop: target.offset().top
          }, 1000);
        }
      }
    }
  });
});
