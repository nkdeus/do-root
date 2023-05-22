window.addEventListener("load", function (event) {
  ScrollTrigger.refresh();
});

$(document).ready(function () {

  console.log("version 2023.1.0");

  // START HOME
  if ($(".js-home-new")[0]) {

    /* ref list */
    const elem = document.getElementById("refs-list");
    let projetsLinks = [];
    children = elem.querySelectorAll('span');
    children.forEach(function(item){
      projetsLinks.push(item.textContent);
    });
    console.log("projet Links",projetsLinks);
    elem.remove();

    var containers = [$("#refs-con-1"), $("#refs-con-2"), $("#refs-con-3")];
    var columns = containers.length;
    var maxRefs = refs.length;

    function compare(a, b) {
      if (a.love > b.love) {
        return -1;
      }
      return 1;
    }
    refs.sort(compare);
    console.log("_____test 1", refs);

    function compare2(a) {
      if (a.page == "true") {
        return -1;
      }
      return 1;
    }
    refs.sort(compare2);

    console.log("_____test 2", refs);

    var scale = 1;
    var alpha = 1;
    var scaleMiddle = 1;
    var offsetScale = 0.95 / (maxRefs / columns);
    var offsetScaleMiddle = 0.95 / (maxRefs / 2 / columns);
    console.log(maxRefs, offsetScale);

    $.each(refs, function (key, value) {
      //console.log(key + ": " + value.title+" "+value.love);
      if (value.futur == "true") {
        return true;
      }

      var isComplete = false;
      var columsContainer = key % columns;
      var styleCss = "width:100%; background-color:var(--black)";
      var sizeImg = "md";
      decal = 0;

      isComplete = projetsLinks.includes(value.title);

      if (columsContainer == 2 && value.love >= 400) {
        columsContainer = key % (columns - 1);
        console.log("error", value.title, "go to mieux -->", columsContainer);
      } else if (columsContainer < 2 && value.love <= 200) {
        columsContainer = 2;
        console.log("error", value.title, "go to null -->", columsContainer);
      }

      if (columsContainer == 0) {
        scale = scale - offsetScale;
      }
      if (columsContainer > 0) {
        sizeImg = "sm";
      }
      if (columsContainer == 0 || columsContainer == 2) {
        var scaleR = Math.round(scale * 100);
        styleCss = "width:" + scaleR + "%;";
      }
      if (key > maxRefs / 2 && columsContainer == 1) {
        scaleMiddle = scaleMiddle - offsetScaleMiddle;
        var scaleRMiddle = Math.round(scaleMiddle * 100);
        styleCss = "width:" + scaleRMiddle + "%";
      }

      /*
          <picture>
              <source media="(max-width: 600px)" srcset="image-480w.jpg">
              <img src="image-800w.jpg">
          </picture>
    
        */
      var picture = $(
        '<picture><source media="(max-width: 640px)" srcset="https://do-root.netlify.app/imgs/refs/' +
          value.src +
          '-sm.webp"><img loading="lazy" class="ref-img w-[100%] absolute transition-all top-0 left-0" src=https://do-root.netlify.app/imgs/refs/' +
          value.src +
          "-" +
          sizeImg +
          ".webp /></picture>"
      );
      var card = $(
        "<div style=" +
          styleCss +
          ' class="card overflow-hidden relative"><div/>'
      );
      var targetContainer = card;
      if (key > maxRefs / 2) {
        alpha = alpha - 0.05;
        card.css("opacity", alpha);
      }

      
      if(isComplete){

        var link = $(
          '<a href="https://ulysse-2029.com/projets/' +
            value.src +
            '" style=' +
            styleCss +
            ' class="card block group overflow-hidden relative"><div/>'
        );
        targetContainer = link;
        console.log("OK link-to ",value.title);
        targetContainer.addClass('outline-projet');

      }

      targetContainer.prepend(
        '<img class="min-img w-[100%] blur-sm" src=https://do-root.netlify.app/imgs/refs/' +
          value.src +
          "-" +
          sizeImg +
          ".webp />"
      );
      targetContainer.prepend(picture);
      containers[columsContainer].append(targetContainer);
    });
  }
  // FIN HOME

  // START A PROPOS
  if ($(".js-a-propos")[0]) {
    gsap.registerPlugin(DrawSVGPlugin);

    var containerSVGs = document.getElementById("containerSVGs-3-13");
    var subContainerSVGs = document.getElementById("sud-containerSVGs-3-13");
    var svgTarget = document.getElementById("crazy-svg");
    var svgStroke = svgTarget.cloneNode(true);
    svgStroke.id = "crazy-svg-stroke";
    subContainerSVGs.appendChild(svgStroke);
    var paths = Array.from(svgTarget.querySelectorAll("path"));
    var pathsStroke = Array.from(svgStroke.querySelectorAll("path"));
    var scopeSvgTrigger = "body";

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: scopeSvgTrigger,
        scrub: 10,
        start: "top top",
        end: "bottom center",
        toggleActions: "play resume play pause",
      },
    });

    var tlStroke = gsap.timeline({
      scrollTrigger: {
        trigger: scopeSvgTrigger,
        scrub: 10,
        start: "top top",
        end: "bottom center",
        toggleActions: "play resume play pause",
      },
    });

    paths.forEach((item, index) => {
      gsap.set(item, { opacity: 0 });
      tl.to(
        item,
        {
          opacity: 0.1,
          ease: "sine.out",
          duration: 1,
        },
        "-=0.9"
      );
    });

    pathsStroke.forEach((item, index) => {
      gsap.set(item, { drawSVG: "80% 10%", opacity: 0 });
      tlStroke.to(
        item,
        {
          opacity: 0.3,
          drawSVG: "30% 35%",
          ease: "sine.out",
          duration: 5,
        },
        "-=3.5"
      );
    });
  }

  // FIN A PROPOS !



  // START SERVICES

  if ($(".js-services")[0]) {
    gsap.registerPlugin(DrawSVGPlugin);

    var scopeTrigger = "#services";
    var scope = "#services-branch";
    var itemsTarget = "svg";

    var stageItems = [
      {
        label: "branch",
        items: [
          {
            type: "svg",
            clazz: ".l-0",
          },
          {
            type: "html",
            clazz: ".c-0",
          },
          {
            type: "svg",
            clazz: ".l-1",
          },
          {
            type: "html",
            clazz: ".c-1",
          },
          {
            type: "svg",
            clazz: ".l-2",
          },
          {
            type: "html",
            clazz: ".c-2",
          },
          {
            type: "svg",
            clazz: ".l-3",
          },
          {
            type: "html",
            clazz: ".c-3",
          },
          {
            type: "svg",
            clazz: ".l-4",
          },
          {
            type: "html",
            clazz: ".c-4",
          },
        ],
      },
    ];

    //array1.forEach(element => console.log(element));

    var svgDrawTarget = scope + " path";
    var isMobile = true;

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: scopeTrigger,
        scrub: 0.5,
        start: "top 100",
        end: "bottom center+=30%",
        toggleActions: "play resume play pause",
      },
    });

    gsap.set(svgDrawTarget, { drawSVG: 0, opacity: 0 });

    isMobile = $(window).width() < 768;

    stageItems.forEach((phase, index) => {
      console.log(`Current phase: ${index} ${phase.label}`);
      phase.items.forEach((item, index) => {
        console.log(`Current item: ${item.type} ${item.clazz}`);
        if (item.type === "svg") {
          var elem = $("path", $(item.clazz));
          tl.to(elem, {
            drawSVG: "100%",
            opacity: 1,
            ease: "sine.inOut",
            duration: 0.3,
          });
        } else {
          gsap.set(item.clazz, { opacity: 0 });
          tl.to(item.clazz, {
            opacity: 1,
            ease: "sine.inOut",
            duration: 0.3,
          });
        }
      });
    });

    $(window).resize(function () {
      isMobile = $(window).width() < 768;
    });
  }

  // FIN SERVICES


  // START SINGLE REF

  if ($(".js-ref")[0]) {
    console.log("SOME REFS !!");
    var clug = $(".set-clug").text();
    var numImgs = parseInt($(".set-num-imgs").text());
    var container = $("#container-images");
    var styleCss = "width:33%; background-color:var(--black)";

    console.log("REF clug-->", clug);
    console.log("REF maxImgs-->", numImgs);

    var imgs = [];
    for (let i = 0; i < numImgs; i++) {
      var img = {};
      img.srcset =
        "https://do-root.netlify.app/imgs/refs/" +
        clug +
        "/" +
        clug +
        "-" +
        i +
        "-md.webp";
      img.src =
        "https://do-root.netlify.app/imgs/refs/" +
        clug +
        "/" +
        clug +
        "-" +
        i +
        "-lg.webp";
      imgs.push(img);

      var picture = $(
        '<picture><source media="(max-width: 640px)" srcset="' +
          img.srcset +
          '"><img loading="lazy" class="ref-img w-[100%] relative" src=' +
          img.src +
          " /></picture>"
      );
      var card = $(
        "<div style=" + styleCss + ' class="overflow-hidden relative"><div/>'
      );
      card.prepend(picture);
      container.append(card);
    }
  }
  // END SINGLE REF


  // CHARGEMENT DES MODULES

  $("[data-module]").each((i, el) => {
    if (window.WFmodules[el.dataset.module] != undefined) {
      console.log("#module", el.dataset.module);
      window.WFmodules[el.dataset.module].call(el);
    } else {
      console.log("#ERROR", el.dataset.module);
    }
  });


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
