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

          console.log("?? toggleIn : ",toggleIn);
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

    const prefersDarkMode = window.matchMedia("(prefers-color-scheme:dark)").matches;
    var randomUse = false;
    if(prefersDarkMode){
        $('body').addClass('toggleColor');
        $('#color-switcher').addClass('active');
    }

    function darkModeChange(e) {
      if(e.class == "darkmodetrigger"){
       
          $('#color-switcher').click(); 
      }
    }

    $('#color-switcher').on('click',function(e) {
      
      toggleFilter();
      if(randomUse){
        $('#color-random').click(); 
      }
     
    });

    function toggleFilter(){

      $(".trigger-filter-invert").each(function(){
        $(this).toggleClass('filter-invert');
      });

      $(".trigger-gradient").each(function(){
        $(this).toggleClass('do-grad-0-second-color');
      });

    }

    function generateHslaColor (pHue, pSaturation, pLightness) {
      
        var h = gsap.utils.random(pHue[0], pHue[1], 1);
        var s = gsap.utils.random(pSaturation[0], pSaturation[1], 1);
        var l = gsap.utils.random(pLightness[0], pLightness[1], 1);

        console.log("COLOR ",h+","+s+"%,"+l+"%")
        return h+","+s+"%,"+l+"%";
      
    }

    gsap.delayedCall(1, function(){
      $('#color-random').click(); 
    });

    $('#color-random').on('click',function(e) {

      randomUse = true;
      
      var newMain =  generateHslaColor([0, 180],[80, 100],[50, 100]);
      var newSecond = generateHslaColor([0, 0],[0, 0],[90, 100]);
      var newContraste = generateHslaColor([0, 50],[0, 10],[0, 30]);
      var newExtra = generateHslaColor([180, 360],[80, 100],[50, 100]);
      var newFade = generateHslaColor([0, 360],[0, 20],[80, 90]);

      if($('body').hasClass('toggleColor')){
     
        $('body').css('--main-color',newFade);
        $('body').css('--extra-color',newMain);
        $('body').css('--fade-color',newContraste);
        $('body').css('--second-color',newContraste);
        $('body').css('--contraste-color',newSecond);

      }else{

        $('body').css('--main-color',newMain);
        $('body').css('--extra-color',newExtra);
        $('body').css('--fade-color',newFade);
        $('body').css('--second-color',newSecond);
        $('body').css('--contraste-color',newContraste);

      }
     
    });

});
