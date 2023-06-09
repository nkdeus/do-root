window.addEventListener("load", function (event) {
  ScrollTrigger.refresh();
});

$(document).ready(function () {

  console.log("ycode-GLOBAL");
  // CHARGEMENT DES MODULES

  $("[data-module]").each((i, el) => {
    if (window.WFmodules[el.dataset.module] != undefined) {
      console.log("#module", el.dataset.module);
      window.WFmodules[el.dataset.module].call(el);
    } else {
      console.log("#ERROR", el.dataset.module);
    }
  });

  // MENU

  $('body').addClass($("#stageSetter-3-14").text());


  var burger  = $( "#burger" );
  var closer = $( "#closer" );
  var menu = $( "#menu-mobile" );
  burger.on( "click", function(e) {
    menu.addClass('menu-open'); 
  });
  
  closer.on( "click", function(e) {
    menu.removeClass('menu-open'); 
  });


  // SETTTER COLOR

  var mainColor = $(".set-main-color").text() || "#000000";
  $('body').css("--main-color", mainColor);

  var secondColor = $(".set-second-color").text() || "#ffffff";
  $('body').css("--second-color", secondColor );

  // FAKE CONTACT
  $("#bonjour").click(function () {
    mailto();
    $("#span-1").remove();
    $("#span-2").remove();
    $(".aro").remove();
    $("#bonjour").attr("data-do-bg", "contraste");
    $("#bonjour").attr("data-do-txt", "second");
    $("#span-3").removeClass("hidden");
  });

  // LAZYLOAD AND SCROLLTRIGGER
  var timerLazyLoad;

  function endAndStartTimer() {
    window.clearTimeout(timerLazyLoad);
    timerLazyLoad = window.setTimeout(function () {
      ScrollTrigger.refresh();
    }, 1000);
  }

  endAndStartTimer();

  // TRIGGER REVERSE THEME
  $(".trigger-reverseHSL").each(function (index) {
    ScrollTrigger.create({
      trigger: $(this),
      start: "top center",
      end: "bottom center" /*,
      markers: {
        startColor: "white",
        endColor: "white"
      }*/,
      onEnter: (self) => {
        $("body").addClass("reverseHSL");
      },
      onEnterBack: (self) => {
        $("body").addClass("reverseHSL");
      },
      onLeave: (self) => {
        $("body").removeClass("reverseHSL");
      },
      onLeaveBack: (self) => {
        $("body").removeClass("reverseHSL");
      },
    });
  });
});


function mailto() {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val("nkdeus@gmail.com").select();
  document.execCommand("copy");
  $temp.remove();
}
