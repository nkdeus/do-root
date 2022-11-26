window.addEventListener("load", function (event) {
  ScrollTrigger.refresh();
});

$(document).ready(function () {

  if ($(".js-ref")[0]){
    var clug = $(".set-clug").text();
    console.log("REF ICI -->",clug);
  }

  if ($(".js-home")[0]){
    // Do something if class exists


  var containers = [$("#refs-con-1"),$("#refs-con-2"),$("#refs-con-3")];
  var columns = containers.length;
  var maxRefs = refs.length;

  function compare(a,b) { 
    if(a.love > b.love){
      return -1;
    }
    return 1
   
  }
  refs.sort(compare);


  var scale = 1;
  var alpha = 1;
  var scaleMiddle = 1;
  var offsetScale = 0.95/(maxRefs/columns);
  var offsetScaleMiddle = 0.95/((maxRefs/2)/columns);
  console.log(maxRefs,offsetScale);
  
  $.each(refs, function (key, value) {

    //console.log(key + ": " + value.title+" "+value.love);
    if(value.futur == "true"){
      return true;
    }
    var columsContainer = key % columns;
    var styleCss = "width:100%; background-color:var(--black)";
    var sizeImg = "md";
    decal= 0;
    if(columsContainer == 0){
      scale = scale - offsetScale;     
    }

    if(columsContainer > 0){
      sizeImg = "sm";
    }


    if(columsContainer == 0 || columsContainer == 2 ){
      var scaleR = Math.round(scale*100);
      styleCss = "width:"+scaleR+"%;";

    }

    if(key > (maxRefs/2) && columsContainer == 1){
      scaleMiddle = scaleMiddle - offsetScaleMiddle;
      var scaleRMiddle = Math.round(scaleMiddle*100);
      styleCss = "width:"+scaleRMiddle+"%";

    }

    
    
    /*
      <picture>
          <source media="(max-width: 600px)" srcset="image-480w.jpg">
          <img src="image-800w.jpg">
      </picture>

    */
    var picture = $('<picture><source media="(max-width: 640px)" srcset="https://do-root.netlify.app/imgs/refs/' + value.src + '-sm.webp"><img loading="lazy" class="ref-img w-[100%] absolute transition-all top-0 left-0" src=https://do-root.netlify.app/imgs/refs/' + value.src + '-' + sizeImg + '.webp /></picture>');
    var card = $('<div style='+styleCss+' class="card overflow-hidden relative"><div/>');
    var targetContainer = card;
    if(key > (maxRefs/2)){
      alpha = alpha - 0.05;
      card.css("opacity",alpha);
  
    }

    
    if(value.love == "true"){
      var link = $('<a href="https://ulysse-2029.com/projets/' + value.src + '" style='+styleCss+' class="card block group overflow-hidden relative"><div/>');
      targetContainer = link;
    }

    targetContainer.prepend('<img class="min-img w-[100%] blur-sm" src=https://do-root.netlify.app/imgs/refs/' + value.src + '-' + sizeImg + '.webp />')
    targetContainer.prepend(picture);
    containers[columsContainer].append(targetContainer);
    
  });

  } 


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
      end: "bottom center"/*,
      markers: {
        startColor: "white",
        endColor: "white"
      }*/,
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