$(document).ready(function() {

  var carousels = $('#slider-slick');
  var config = {
    slidesToShow: 1.25,
    lazyLoad: 'ondemand',
    slidesToScroll: 1,
    accessibility: false,
    infinite:false,
    autoplay:false,
    centerMode: true,
    variableWidth: true,
    adaptiveHeight:false,
    arrows:true,
    dots: false,
    prevArrow: $('.prev'),
    nextArrow: $('.next')
  }

carousels.slick(config);

carousels.on('breakpoint', function(slick) {
  carousels.slick('setPosition');
  console.log(slick.currentTarget.slick);
  var count = slick.currentTarget.slick.slideCount;
  var show = slick.currentTarget.slick.options.slidesToShow;

  if (show >= count) {
    carousels.slick('unslick');
  }

});


carousels.on('destroy', function() {
  carousels.slick(config);
});

 
  $('[aria-hidden]').click(function(event) {
  
  	
      if($(this).attr('aria-hidden') == 'true'){
         event.preventDefault();
        console.log(parseInt($(this).attr('data-slick-index')));
        if(parseInt($(this).attr('data-slick-index')) >= 1){
          $('#slider-slick').slick('slickNext');
        }else{
          $('#slider-slick').slick('slickPrev');
        }
        //$('#slider-container').slick('slickGoTo', parseInt($(this).attr('data-slick-index')));
      }
    });

});
