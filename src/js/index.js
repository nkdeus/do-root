
window.togglesKey = {};
window.doautotheme = null;



$(document).ready(function() {


    $('[data-module]').each((i, el) => {
        

        if (el.dataset.module == 'dotheme') {
          if (window.dothemes == null) {
            window.dothemes = [];
          }
          window.dothemes.push(
            window.WFmodules[el.dataset.module].call(el)
          );
        } else {
          if(window.WFmodules[el.dataset.module] != undefined){

            console.log('#module', el.dataset.module);
             window.WFmodules[el.dataset.module].call(el);
          }else{
            console.log('#ERROR', el.dataset.module);
          }
         
        }
    });

    var futurAction = function(){

       var wH = $( window ).height();
       var wW = $( window ).width();
       var limiteY = wH/6.4;
       var limiteX = wW/1.62;
       var body = $('body');

      $(document).mousemove(function(e){

          var lastX = e.clientX;
          var lastY = e.clientY;

          /*if(lastY < limiteY){
             body.attr('do-event-scroll','up');  
          }*/

      });
    }

    futurAction();

    /* DARKMODE START */
    $(document).on("darkMode", darkModeChange);

    function darkModeChange(e) {
      if(e.class == "darkmodetrigger"){   
          $('#color-switcher').click(); 
      }
    }

    const prefersDarkMode = window.matchMedia("(prefers-color-scheme:dark)").matches; 
    var itemMode = "toggleMode12"
    var toggleMode = getParamSingle(itemMode) == "true";

    if(prefersDarkMode){
      //$('#color-switcher').addClass('active');
    }

    if(toggleMode != null){
      if(toggleMode){
          $('#color-switcher').click(); 
      }
    }

    $('#color-switcher').on('click',function(e) {    
       toggleFilter();
       toggleMode = !toggleMode;
       saveParamSingle(itemMode,toggleMode);
    });

    function toggleFilter(){
      $(".trigger-filter-invert").each(function(){
        $(this).toggleClass('filter-invert');
      });
    }

    /* DARKMODE END */

    /* JSON SAVE THEME START */

    var themeManager = new (function() {   

      let storageId = "all-themes-01";
      let itemCloneClass = "current-theme-item";
      let containerItemsId = "#themes-nav";
      let collection = null;
    
      this.init = () => {
        console.log("themeManager.init");
        getThemes();
        cloneItems(itemCloneClass,containerItemsId);
      }

      this.getStorageId = () => {
        return storageId;
      }

      this.randomId = () => {
          let s4 = () => {
              return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
          }
          //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }

      let getLocalThemes = () => {    
        console.log("themeManager.getLocalThemes : ",storageId)
        return(localStorage.getItem(storageId));
      }

      let saveTheme = () => {    
        console.log("themeManager.saveTheme");
        localStorage.setItem(storageId,JSON.stringify(collection));
      }

      this.addItem = (pId,pItem) => {    
        console.log("themeManager.addItem START ",collection);
        collection[pId] = pItem;
        console.log("themeManager.addItem END ",collection);
        saveTheme();
        creatDomItem(itemCloneClass,containerItemsId,pItem);
      }

      let creatDomItem = (pTarget,pContainer,pData) => {

        let clone = $("."+pTarget).clone();
        clone.removeClass(pTarget);
        clone.removeClass("do-hide");

        $(pContainer).append(clone);
        clone.addClass('cloned');

        $.each(pData.colors, function (i, valueColor) {
          setColor(valueColor.hsl,valueColor.name+"-color",valueColor.splited,clone);
        });
     

      }

      let getThemes = () => {    

        console.log("themeManager.getThemes")
        if(collection == null && getLocalThemes() == null){
          collection = {}
        }else{
          collection = JSON.parse(getLocalThemes());
        }
        console.log("themeManager.getThemes : ",collection);
        return collection;

      }

      let cloneItems = (pTarget, pContainer) => {

        console.log("themeManager.cloneItems");    
        let clone = $("."+pTarget).clone();
        clone.removeClass(pTarget);
        clone.removeClass("do-hide");

        $.each(collection, function (index, value) {
          console.log(">> ",index,value);
          clone = clone.clone();
          $(pContainer).append(clone);
          clone.addClass('cloned');

          $.each(value.colors, function (i, valueColor) {
            setColor(valueColor.hsl,valueColor.name+"-color",valueColor.splited,clone);
          });
          
        });

      }

    })();

    themeManager.init();

    $('#local-storage-add').on('click',function(e) {

        if($('body')[0].style.cssText == ""){
          return;
        }
        var themeId = themeManager.randomId();
        var themeData = {
          "name":"do-"+themeId.substring(0,5),
          "id":themeId,
          "colors": convertStyleToJson($('body')[0].style.cssText)
        }
        
        themeManager.addItem(themeId,themeData);
      
    });

    $('#local-storage-reset').on('click',function(e) {

      console.log("RESET ",themeManager.getStorageId());
      localStorage.removeItem(themeManager.getStorageId());
      localStorage.clear();
      $('.cloned').remove();

    });

    /* JSON SAVE THEME END */

    /* THEME START */

    function generateHslaColor (pHue, pSaturation, pLightness) { 
        var h = gsap.utils.random(pHue[0], pHue[1], 1);
        var s = gsap.utils.random(pSaturation[0], pSaturation[1], 1);
        var l = gsap.utils.random(pLightness[0], pLightness[1], 1);
        return h+","+s+"%,"+l+"%";   
    }

    var savedTheme = getParams('theme');
   
    if(savedTheme != undefined){
      setColors(savedTheme);
    }

    function saveParams(pName,pParams){
      localStorage.setItem(pName, JSON.stringify(pParams));
    }
    function saveParamSingle(pName,pParam){
      localStorage.setItem(pName, pParam);
    }
    function getParams(pName){
      return JSON.parse(localStorage.getItem(pName));
    }
    function getParamSingle(pName){
      return localStorage.getItem(pName);
    }

    function setColors(pColors){

      console.log("setColor ",pColors)
      $.each(pColors, function (index, value) {
        setColor(value.hsl,value.name,value.splited);
      });
      saveParams("theme",pColors);

    }

    function setColor(pColor,pName,pSplit,pTarget = 'body'){
        $(pTarget).css('--'+pName+'',pColor);
        $(pTarget).css('--'+pName+'-H',pSplit[0]);
        $(pTarget).css('--'+pName+'-S',pSplit[1]);
        $(pTarget).css('--'+pName+'-L',pSplit[2]);
        if(currentColor){
          saveColors[pName] = currentColor;
        }
    }

    function convertStyleToJson(pStyle){
       var result =  [];
       var arrayRaw = pStyle.split('; ');
        for (const key in arrayRaw) {

            
            if (key % 4 == 0)
            {
              var colorKey = arrayRaw[key].split(':')[0];
              colorKey = colorKey.substring(2, colorKey.length);
              var colorHSL = arrayRaw[key].split(':')[1];
              colorHSL = colorHSL.substring(0, colorHSL.length);
              var splitColor = colorHSL.split(',');
              var obj =  {
                "name":colorKey,
                "hsl":colorHSL,
                "splited":splitColor
              }
              result.push(obj);
            }
            
        }
        console.dir("...................................");
        console.dir(result);
        return result;

    }

    function randomColors(){
      var newMain =  generateHslaColor([0, 220],[70, 100],[50, 90]);
      var newSecond = generateHslaColor([0, 360],[0, 10],[80, 90]);
      var newContraste = generateHslaColor([0, 360],[0, 10],[0, 10]);
      var newExtra = generateHslaColor([140, 360],[70, 100],[50, 90]);
      var newFade = generateHslaColor([0, 360],[0, 10],[80, 90]);

      var colors = [
        {
          "name":"main",
          "hsl":newMain,
          "splited":newMain.split(',')
        },
        {
          "name":"extra",
          "hsl":newExtra,
          "splited":newExtra.split(',')
        },
        {
          "name":"second",
          "hsl":newSecond,
          "splited":newSecond.split(',')
        },
        {
          "name":"contraste",
          "hsl":newContraste,
          "splited":newContraste.split(',')
        },
        {
          "name":"fade",
          "hsl":newFade,
          "splited":newFade.split(',')
        }
      ]
      return colors;
    }

    $('#color-random').on('click',function(e) {
      setColors(randomColors());
    });
    
    $('.theme-item').on('click',function(e) {

      setColors(convertStyleToJson($(this)[0].style.cssText));
     
    });

    /* THEME END */
    /* COLORS START */

    var moving = false;
    var currentMode = "";
    var startY = 0;
    var mY = 0;
    var currentColor = null;
    var currentColorVar = null;
    var currentTarget = null;
    var saveColors = {};
               
    $(document).mousemove(function(e){
      if (!moving) return;
      mY = startY - e.clientY;
      colorSetter[currentMode](mY);
      injectColors(true);
    });

    const getDelta = (pY) => {
      if(mY<1){
        return -1;
      }
      return 1;
    };

    const colorSetter = {

      "h" : function(pY){
        currentColor[0] = currentColor[0]+(getDelta(pY)*3.6);
        if(currentColor[0] >= 360){
          currentColor[0] = 0;
        }else if(currentColor[0] <= 0){
          currentColor[0] = 360;
        }
      },
      "s" : function(pY){
        currentColor[1] = currentColor[1]+getDelta(pY);
        if(currentColor[1] >= 99){
          currentColor[1] = 99;
        }else if(currentColor[1] <= 1){
          currentColor[1] = 1;
        }
      },
      "l" : function(pY){
        currentColor[2] = currentColor[2]+getDelta(pY);
        if(currentColor[2] >= 99){
          currentColor[2] = 99;
        }else if(currentColor[2] <= 1){
          currentColor[2] = 1;
        }
      }
    }

    function joinHSL(pColor){
        return pColor[0]+","+pColor[1]+"%,"+pColor[2]+"%";
    }

    $(document).on("mouseup", function(e) {
      if(currentTarget == null){
          return;
      }
      moving = false;
      injectColors();
      currentTarget = null;
      currentMode = null;
      saveNewColors();
    });

    const saveNewColors = () => {
      console.log("save new color")
      saveParams("theme", convertStyleToJson($('body')[0].style.cssText));
    }

    const injectColors = (pLocal = false) => {
      var hslNew = joinHSL(currentColor);
      var hslSplit = hslNew.split(",");
      if(pLocal){
        setColor(hslNew,currentColorVar+"-color",hslSplit,currentTarget.parent());
      }else{
        setColor(hslNew,currentColorVar,hslSplit);
      }
    }

    const cssVar = ( name, value ) => {

      if(name.substr(0, 2) !== "--") {
          name = "--" + name;
      }
      if(value) {
          document.documentElement.style.setProperty(name, value)
      }
      return getComputedStyle(document.documentElement).getPropertyValue(name);
  
   }


    $('[data-do-color]').on('mousedown',function(e) {

      moving = true;
      startY = e.clientY;

      currentTarget = $(this);
      currentMode = currentTarget.attr('data-do-mode-color');
      currentColorVar = currentTarget.attr('data-do-color');

      if(saveColors[currentColorVar] != undefined){
        currentColor = saveColors[currentColorVar];
        console.log("COLOR CLICK DEJA LA ",currentColorVar,currentColor);

      }else{
        var hsla = chroma(currentTarget.css('background-color')).hsl();
        if(isNaN(hsla[0])){
          hsla[0] = 1;
        }
        console.log("HEUUUU ",isNaN(hsla[0]),hsla[0]);
        currentColor = [hsla[0],Math.round(hsla[1]*100),Math.round(hsla[2]*100)];
        saveColors[currentColorVar] = currentColor;
        console.log("COLOR CLICK NEW ",currentColorVar,currentColor);
      }

    });

    /* COLORS END */
 

});
