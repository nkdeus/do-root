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
       var limite = wH/6.4;
       var body = $('body');
       var toggleIn = false;

      $(document).mousemove(function(e){

          var lastX = e.clientX;
          var lastY = e.clientY;

          if(lastY < limite && body.attr('do-event-scroll') == 'down' && toggleIn == false){
             body.attr('do-event-scroll','up');
             toggleIn = true;
            
          }

          if(lastY > limite && body.attr('do-event-scroll') == 'up' && toggleIn == true){
            body.attr('do-event-scroll','down');
            toggleIn = false;
          }

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

        $('body').css('--'+value.name+'',value.hsl);
        $('body').css('--'+value.name+'-H',value.splited[0]);
        $('body').css('--'+value.name+'-S',value.splited[1]);
        $('body').css('--'+value.name+'-L',value.splited[2]);

      });

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
      saveParams("theme",c);
      setColors(c);
     
    });

});
