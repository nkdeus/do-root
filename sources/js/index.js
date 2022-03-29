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
      //$('body').addClass('toggleColor');
      $('#color-switcher').addClass('active');

    }
    console.log("MODE SAVE", getParamSingle(itemMode));
    console.log("MODE ON/OFF ",toggleMode);


    if(toggleMode != null){
 
      if(toggleMode){

         console.log("CHANGE AUTO ",toggleMode);
          $('#color-switcher').click(); 

      }

    }

    $('#color-switcher').on('click',function(e) {    
       toggleFilter();
       toggleMode = !toggleMode;
       console.log("toggleMode save ",toggleMode);
       saveParamSingle(itemMode,toggleMode);

    });

    function toggleFilter(){

      $(".trigger-filter-invert").each(function(){
        $(this).toggleClass('filter-invert');
      });

    }

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

    function convertStyleToJson(pStyle,pSetColors = false){

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
        if(pSetColors){
          setColors(result);
        }

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

      var c = randomColors();
      setColors(c);
     
    });

    
    $('.theme-item').on('click',function(e) {

      convertStyleToJson($(this)[0].style.cssText);
     
    });



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

        currentColor[0] = currentColor[0]+getDelta(pY);
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
      saveParams("theme", convertStyleToJson($('body')[0].style.cssText, false));

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
 

});
