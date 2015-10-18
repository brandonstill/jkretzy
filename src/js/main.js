$(function() {

  // ScrollTo
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length){
        var top_offset = $('.header').height();
        $('html,body').animate({
           scrollTop: target.offset().top - top_offset - 20
        }, 1000);
      }
    }
  });

  // Show project
  newProject = function (e) {   
    var $wrapper = $(this).parent(),
      viewMore = "View More",
      noMore = "That's all folks!",
      wrapperHeight = $wrapper.height(),
      projectHeight = $('.project').height(),
      margin = parseInt($('.project').css('margin-bottom')),
      nextHeight = wrapperHeight + projectHeight + margin,
      viewable = $('.project:visible').length,
      totalProjects = $('.project').length,
      $button = $(this);
    e.preventDefault();
    if ( viewable < totalProjects ) {
      $wrapper.css({'height': wrapperHeight}).animate({'height': nextHeight}, function () {
        $('.project').eq(viewable).fadeIn();
        $wrapper.removeAttr('style');
        $button.removeAttr('style');
        if ( viewable + 1 >= totalProjects ) $button.text(noMore).addClass('no-more');
        else $button.text(viewMore);
      });
    }
  };

  // Hide project
  $('.project').each(function (e) {
    if (e >= 1) $(this).hide();
  });

  // Show new project
  $('.view-more').on('click', newProject);

});
