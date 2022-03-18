$(document).ready(function() {

  ScrollTrigger.create({
      trigger: "body",
      start: 0,
      end: "bottom bottom",
      onToggle: self => console.log("toggled, isActive:", self.isActive),
      onUpdate: self => {
        //console.log("[scroll-event] progress:", self.progress.toFixed(1), "direction:", self.direction, "velocity", self.getVelocity());
        $('body').css("--scrollY",self.progress.toFixed(3));
        if(self.progress.toFixed(1) < 0.1){
          $('body').attr("do-event-page","start");
        }else if(self.progress.toFixed(1) > 0.9){
          $('body').attr("do-event-page","end");
        }else{
          $('body').attr("do-event-page","go");
        }

        if(self.direction === -1){
          $('body').attr("do-event-scroll","up");
        }else{
          $('body').attr("do-event-scroll","down");
        }

      }
  });

  $('body').css("--navHeight",$('#nav').innerHeight());
  $('body').css("--subNavHeight",$('.sub-nav').innerHeight()-2);
  $('body').css("--fullNavHeight",$('.sub-nav').innerHeight()+$('#nav').innerHeight()-2);


 
  
});


