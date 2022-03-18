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

    var SubMenuIsOpen = false;
    var SubMenuTvIsOpen = false;

    var resetSub = function(){

      if(SubMenuIsOpen){
        $('.js-hover').removeClass('active');
        SubMenuIsOpen = false;
      }

      if(SubMenuTvIsOpen){
        $('.js-hover-tv').removeClass('active');
        SubMenuTvIsOpen = false;
      }

    }
   

    if($('body').hasClass('page-series') == false){

          $('.js-hover').on('mouseover',function(e) {
              resetSub();
              $(this).addClass('active');
              SubMenuIsOpen = true;
              
          });


          $('#nav').on('mouseleave',function(e) {
            if(SubMenuIsOpen){
              $('.js-hover').removeClass('active');
              SubMenuIsOpen = false;
            }
          });      

    }

    if($('body').hasClass('page-gttv') == false){

      $('.js-hover-tv').on('mouseover',function(e) {
        resetSub();
          $(this).addClass('active');
          SubMenuTvIsOpen = true;
      });


      $('#nav').on('mouseleave',function(e) {
        if(SubMenuTvIsOpen){
          $('.js-hover-tv').removeClass('active');
          SubMenuTvIsOpen = false;
        }
      });      

}
    


});
