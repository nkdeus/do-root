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
  var scaleMiddle = 1;
  var offsetScale = 0.95/(maxRefs/columns);
  var offsetScaleMiddle = 0.95/((maxRefs/2)/columns);
  console.log(maxRefs,offsetScale);
  
  $.each(refs, function (key, value) {

    //console.log(key + ": " + value.title+" "+value.love);
    var columsContainer = key % columns;
    var decal = gsap.utils.random(-3, 3, 1, true)();
    var styleCss = "width:100%; background-color:var(--black)";
    decal= 0;
    if(columsContainer == 0){
      scale = scale - offsetScale;     
    }

    if(columsContainer == 0 || columsContainer == 2 ){
      var scaleR = Math.round(scale*100);
      styleCss = "width:"+scaleR+"%;";
      console.log("0 et 2 --> ",scaleR);
    }

    if(key > (maxRefs/2.8) && columsContainer == 1){
      scaleMiddle = scaleMiddle - offsetScaleMiddle;
      var scaleRMiddle = Math.round(scaleMiddle*100);
      styleCss = "width:"+scaleRMiddle+"%;";
      console.log("1 -->",scaleRMiddle);
    }
    
    
   
    var card = $('<div style='+styleCss+' class="card overflow-hidden relative"><div/>');
    var targetContainer = card;
    
    if(value.love == "true"){
      var link = $('<a href="https://ulysse-2029.com/projets/' + value.src + '" style='+styleCss+' class="card block group overflow-hidden relative"><div/>');
      targetContainer = link;
    }

    targetContainer.prepend('<img class="min-img w-[100%] blur-sm" src=https://do-root.netlify.app/imgs/refs/' + value.src + '-min.webp />')
    targetContainer.prepend('<img loading="lazy" class="ref-img w-[100%] absolute transition-all group-hover:opacity-[50%] top-0 left-0" src=https://do-root.netlify.app/imgs/refs/' + value.src + '.webp />')

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