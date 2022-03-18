
jQuery(function () {

  gsap.defaults({ overwrite: "true" });
  gsap.registerPlugin(ScrollToPlugin);

  var $scrollTo = $("#bt-scroll");

  $scrollTo.on("click", function () {

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

  var seriesContent = $("#content");

  ScrollTrigger.create({
    trigger: seriesContent,

    onToggle: function () {

      console.log("toggle ");

    },
  });

  $menu = $(".scroll-nav-auto"),
    $window = $(window);

  $menu.on("click", "a", function () {
    var $this = $(this),
      href = $this.attr("href"),
      topY = $(href).offset().top - 150;


    TweenMax.to($(window), 1, {
      scrollTo: {
        y: topY,
        autoKill: true
      },
      ease: Power3.easeOut
    });

    return false;
  });

}

