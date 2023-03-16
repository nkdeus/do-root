
window.addEventListener("load", function (event) {
  ScrollTrigger.refresh();
});

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOMContentLoaded STORIZ")
  if ($(".js-a-propos")[0]){
    initStroriz();
  }
});

windows.addEventListener("load", function(event) {
  console.log("load STORIZ")
  
});



function initStroriz(){

    console.log("INIT STORIZ")
    
    const list = document.querySelectorAll('.js-item');
    let clone = list[0];
    const doMin = clone.getAttribute('data-do-min') || 0.15;
    const doMax = clone.getAttribute('data-do-max') || 0.8;
    const doOrigin = clone.getAttribute('data-do-origin') || "top"; 

    let _doReset = clone.getAttribute('data-do-reset') || "opacity,0.2";
    let _doSet = clone.getAttribute('data-do-set') || "duration,0.4,opacity,0.2";
    let _doInView = clone.getAttribute('data-do-inview') || "duration,0.4,opacity,1";
    const doReset = getObj(_doReset);
    const doSet = getObj(_doSet);
    const doInView = getObj(_doInView);

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
        "title": title.outerText
      }
      if(age){
        data.age = age.outerText;
        item.removeChild(age);
      }
      if(sub){
        data.sub = sub.outerText;
        item.removeChild(sub);
      }

      item.setAttribute('id',data.id);
      gsap.set(item,doReset);
      console.log(data.id, data.age, data.sub);

      startId = startId+1;
      titles.push(data);
      item.removeChild(title);
      
     

    }

    function getObj(pParam){
   
      let temp = pParam.split(","), theobj = {};
      for (let i=0; i<temp.length; i+=2) {
        theobj[temp[i]] = temp[(i+1)];
      }
      console.log(theobj);
      return theobj;

    }

    
    updateData(list[0]);

    ScrollTrigger.batch(".js-item", {
        onUpdate: updateValues
    });

    function updateValues() {

      let reset = true;
      let test = 0;
      
      for (const item of list) {

        let result = ScrollTrigger.isInViewport(item);
        let poz = ScrollTrigger.positionInViewport(item, doOrigin).toFixed(2);
    
        if(poz > doMin && poz < doMax){        
          updateData(item);
          reset = false;
        }    
        test++ 
      }

      if(reset){
        currentId = undefined;
      }
    }

    function updateData(pItem){

      let id = pItem.id

      if(id == currentId){
        return;
      }

      if(currentItem != undefined){
        gsap.to(currentItem,doSet);    
      }
      currentItem = pItem
      gsap.to(currentItem,doInView);
      currentId = id;

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