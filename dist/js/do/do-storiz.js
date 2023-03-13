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
    let updateAge = document.getElementById("js-age-update");
    let updateSub = document.getElementById("js-sub-update");
    let currentId = undefined;
    let currentItem = undefined;
    let startId = 0;

    console.log(maxItems);

    for (const item of list) {
      
      let title = item.getElementsByTagName('h2')[0];
      let age = item.getElementsByTagName('h3')[0];
      let sub = item.getElementsByTagName('h4')[0];
      let id = startId;
      let data = {
        "id": id,
        "age": age.outerText,
        "title": title.outerText,
        "sub":sud.outerText
      }
      item.setAttribute('id',data.id);
      console.log(data.id, data.age, data.sub);

      startId = startId+1;
      titles.push(data);
      item.removeChild(title);
      item.removeChild(age);
      item.removeChild(sub);

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
      console.log("UPDATE ID : ",currentId);
      if(titles[currentId] != undefined){
      
        let tempData = titles[currentId];
        updateTxt.innerText = tempData.title;
        if(updateAge){
          updateAge.innerText = tempData.age;
        }
        if(updateSub){
          updateSub.innerText = tempData.sub;
        }
      }
  
      

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