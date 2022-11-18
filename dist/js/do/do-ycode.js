window.addEventListener("load", function (event) {
  ScrollTrigger.refresh();
});

$(document).ready(function () {

  var containers = [$("#refs-con-1"),$("#refs-con-2"),$("#refs-con-3")];
  var columns = containers.length;
  var maxRefs = refs.length;

  function compare(a) {

    
    if(a.love == "true"){
      return -1;
    }
    return 1
   
  }

  refs.sort(compare);
  var scale = 1;
  var offsetScale = 0.61/(maxRefs/columns);
  console.log(maxRefs,offsetScale);
  
  $.each(refs, function (key, value) {

    //console.log(key + ": " + value.title+" "+value.love);
    var columsContainer = key % columns;
    var decal = gsap.utils.random(-3, 3, 1, true)();
    var styleCss = "width:100%;";
    decal= 0;
    if(columsContainer == 0){
      scale = scale - offsetScale
      scaleR = Math.round(scale*100);
      styleCss = "width:"+scaleR+"%;";
    }
    if(columsContainer == 2 ){
      styleCss = "width:"+scaleR+"%;";
    }
    console.log(scaleR);
   
    var card = $('<div style='+styleCss+' class="overflow-hidden relative"><div/>');
    var targetContainer = card;
    
    if(value.love == "true"){
      var link = $('<a href="https://ulysse-2029.com/projets/' + value.src + '" style='+styleCss+' data-do-fx="ref-hover" class="block group overflow-hidden relative"><div/>');
      targetContainer = link;
    }

    targetContainer.prepend('<img class="w-[100%] blur-sm" src=https://do-root.netlify.app/imgs/fruits/' + value.src + '-min.webp />')
    targetContainer.prepend('<img loading="lazy" class="w-[100%] absolute transition-all group-hover:opacity-[50%] top-0 left-0" src=https://do-root.netlify.app/imgs/fruits/' + value.src + '.webp />')

    containers[columsContainer].append(targetContainer);
    
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

  var timerLazyLoad;

  function endAndStartTimer() {
    window.clearTimeout(timerLazyLoad);
    timerLazyLoad = window.setTimeout(function () {
      ScrollTrigger.refresh();
    }, 1000);
  }

  endAndStartTimer();

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