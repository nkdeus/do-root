window.addEventListener("load", function (event) {
  ScrollTrigger.refresh();
});

document.addEventListener("DOMContentLoaded", function(event) {
  init();
});

function init(){
    
    const list = document.querySelectorAll('.js-item');
    const titles = [];
    const maxItems = list.length;

    let updateTxt = document.getElementById("js-update");
    let currentId = undefined;
    let currentItem = undefined;

    console.log(maxItems);

    for (const item of list) {
      
      let title = item.getElementsByTagName('h2')[0];
      let id = item.id;
      let data = {
        "id": id,
        "title": title.outerText
      }
      console.log(data);
      titles.push(data);
      item.removeChild(title);

    }

    updateData(list[0]);

    ScrollTrigger.batch(".js-item", {
        onUpdate: updateValues
    });

    function updateValues() {

      let reset = true;
      
      for (const item of list) {

        let result = ScrollTrigger.isInViewport(item);
        let poz = ScrollTrigger.positionInViewport(item, "center").toFixed(2);
        if(poz > 0.3 && poz < 0.7){        
          updateData(item);
          reset = false;
        }     
      }

      if(reset){
        currentId = undefined;
        console.log("RESET ");
      }
    }

    function updateData(pItem){

      let id = pItem.id

      if(id == currentId){
        return;
      }

      if(currentItem != undefined){

        gsap.to(currentItem,{scale:1,duration:0.4});    
        

      }
      currentItem = pItem


      gsap.to(currentItem,{scale:1.2,duration:0.4});
      currentId = id;
      console.log("UPDATE ",titles[currentId]);
      updateTxt.innerText = titles[currentId].title;
      

    }

}

function refreshScrollTrigger(){

  var timerLazyLoad;

  function endAndStartTimer() {
    window.clearTimeout(timerLazyLoad);
    timerLazyLoad = window.setTimeout(function () {
      ScrollTrigger.refresh();
    }, 1000);
  }

  endAndStartTimer();

}