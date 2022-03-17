
jQuery(function () {

  gsap.defaults({ overwrite: "true" });
  gsap.registerPlugin(ScrollToPlugin);

  var scrollTo = $("#bt-scroll");

  scrollTo.on("click", function () {

    var topY = window.scrollY+(window.innerHeight/1.61);
    if($('body').hasClass('page-end')){
      topY = 0;
    }
    TweenMax.to($(window), 1, {
      scrollTo: {
        y: topY,
        autoKill: true
      },
      ease: Power3.easeOut
    });

    return false;
  });


  initScrollNav();

});


function initScrollNav() {

  var menu = $(".scroll-nav");
  var win = $(window);

  menu.on("click", "a", function () {
    var scope = $(this),
    href = scope.attr("href"),
    topY = $(href).offset().top - 90;


    TweenMax.to(win, 1, {
      scrollTo: {
        y: topY,
        autoKill: true
      },
      ease: Power3.easeOut
    });

    return false;
  });

}

