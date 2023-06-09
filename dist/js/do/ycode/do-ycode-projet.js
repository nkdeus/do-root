$(document).ready(function () {

  console.log("ycode-PROJET");

  // START SINGLE REF

    console.log("SOME REFS !!");
    var clug = $(".set-clug").text();
    var numImgs = parseInt($(".set-num-imgs").text());
    var container = $("#container-images-more");
    var styleCss = "width:100%; background-color:var(--black)";

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
  
});
