$(document).ready(function () {

  console.log("ycode-SERVICES");

  gsap.registerPlugin(DrawSVGPlugin);

  var scopeTrigger = "#services";
  var scope = "#services-branch";
  var itemsTarget = "svg";

  var stageItems = [{
    label: "branch",
    items: [{
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
  }, ];

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

  gsap.set(svgDrawTarget, {
    drawSVG: 0,
    opacity: 0
  });

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
        gsap.set(item.clazz, {
          opacity: 0
        });
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
});