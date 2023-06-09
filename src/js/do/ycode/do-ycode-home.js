$(document).ready(function () {

  console.log("ycode-HOME");

  /* ref list */
  const elem = document.getElementById("refs-list");
  let projetsLinks = [];
  children = elem.querySelectorAll("span");
  children.forEach(function (item) {
    projetsLinks.push(item.textContent);
  });
  console.log("projet Links", projetsLinks);
  elem.remove();

  var containers = [$("#refs-con-1"), $("#refs-con-2"), $("#refs-con-3")];
  var columns = containers.length;
  var maxRefs = refs.length;

  function compare2(a) {
    if (projetsLinks.includes(a.title)) {
      return -1;
    }
    return 1;
  }
  refs.sort(compare2);

  function compare(a, b) {
    if (a.love > b.love) {
      return -1;
    }
    return 1;
  }
  refs.sort(compare);

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
      '-sm.webp"><img loading="lazy" alt="design du projet '+value+'" class="ref-img w-[100%] absolute transition-all top-0 left-0" src=https://do-root.netlify.app/imgs/refs/' +
      value.src +
      "-" +
      sizeImg +
      ".webp /></picture>"
    );
    var card = $(
      "<div style=" + styleCss + ' class="card overflow-hidden relative"><div/>'
    );
    var targetContainer = card;
    if (key > maxRefs / 2) {
      alpha = alpha - 0.05;
      card.css("opacity", alpha);
    }

    if (isComplete) {
      var link = $(
        '<a href="https://ulysse-2029.com/projets/' +
        value.src +
        '" style=' +
        styleCss +
        ' class="card block group overflow-hidden relative"><div/>'
      );
      targetContainer = link;
      console.log("OK link-to ", value.title);
      targetContainer.addClass("outline-projet");
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
});