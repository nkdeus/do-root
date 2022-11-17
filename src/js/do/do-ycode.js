window.addEventListener("load", function (event) {
  ScrollTrigger.refresh();
});

$(document).ready(function () {

  var cons = [$("#refs-con-1"),$("#refs-con-2"),$("#refs-con-3")];
  var columns = cons.length;

  $.each(refs, function (key, value) {
    console.log(key + ": " + value.title);
    console.log(key + ": " + key % columns);
    var card = $('<div class="overflow-hidden w-[100%] relative"><div/>');
    card.prepend('<img class="w-[100%] blur-sm" src=https://do-root.netlify.app/imgs/fruits/' + value.src + '-min.webp />')
    card.prepend('<img loading="lazy" class="w-[100%] absolute top-0 left-0" src=https://do-root.netlify.app/imgs/fruits/' + value.src + '.webp />')
    cons[key % columns].prepend(card);
  });


  $('[data-module]').each((i, el) => {
    if (window.WFmodules[el.dataset.module] != undefined) {
      console.log('#module', el.dataset.module);
      window.WFmodules[el.dataset.module].call(el);
    } else {
      console.log('#ERROR', el.dataset.module);
    }
  });

  $("#bonjour").click(function () {
    mailto();
    $("#span-1").remove();
    $("#span-2").remove();
    $(".aro").remove();
    $("#bonjour").attr("data-do-bg", "contraste");
    $("#bonjour").attr("data-do-txt", "second");
    $("#span-3").removeClass("hidden");
  });


  $("#refs").addClass("sticky");

  var timerLazyLoad;

  function endAndStartTimer() {
    window.clearTimeout(timerLazyLoad);
    timerLazyLoad = window.setTimeout(function () {
      ScrollTrigger.refresh();
    }, 1000);
  }

  $(".trigger-reverseHSL").each(function (index) {

    ScrollTrigger.create({
      trigger: $(this),
      start: "top center",
      end: "bottom center",
      markers: {
        startColor: "white",
        endColor: "white"
      },
      onEnter: self => {
        $('body').addClass("reverseHSL");

      },
      onEnterBack: self => {
        $('body').addClass("reverseHSL");

      },
      onLeave: self => {
        $('body').removeClass("reverseHSL");

      },
      onLeaveBack: self => {
        $('body').removeClass("reverseHSL");

      }
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