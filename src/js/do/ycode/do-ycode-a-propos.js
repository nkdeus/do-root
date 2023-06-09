$(document).ready(function () {

  console.log("ycode-A-PROPOS");
  // START A PROPOS
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
    gsap.set(item, {
      opacity: 0
    });
    tl.to(
      item, {
        opacity: 0.1,
        ease: "sine.out",
        duration: 1,
      },
      "-=0.9"
    );
  });

  pathsStroke.forEach((item, index) => {
    gsap.set(item, {
      drawSVG: "80% 10%",
      opacity: 0
    });
    tlStroke.to(
      item, {
        opacity: 0.3,
        drawSVG: "30% 35%",
        ease: "sine.out",
        duration: 5,
      },
      "-=3.5"
    );
  });
})
// FIN A PROPOS !