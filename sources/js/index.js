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

    $('#color-switcher').on('click',function(e) {
      
      toggleFilter();
     
    });

    function toggleFilter(){

      $(".trigger-filter-invert").each(function(){
        $(this).toggleClass('filter-invert');
      });

      $(".trigger-gradient").each(function(){
        $(this).toggleClass('do-grad-0-second-color');
      });

    }

});
