var player;
var playerStats;
var timerProgress;
var obj = {volume:0};
var done = false;

$(document).ready(function() {

  
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

});





////////////////////////////////////
// Player YouTube
//
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
			height: '360',
			width: '640',
			videoId: $('#player').attr('rel'),
			playerVars: {
		    autoplay: 0,
        controls: 1,
        showinfo: 1,
        rel: 0,
        iv_load_policy: 3,
        cc_load_policy: 0,
        fs: 0,
        disablekb: 1
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});

  playerStats = new YT.Player('player-stats', {
    height: '360',
    width: '640',
    videoId: $('#player-stats').attr('rel'),
    playerVars: {
      autoplay: 0,
      controls: 1,
      showinfo: 1,
      rel: 0,
      iv_load_policy: 3,
      cc_load_policy: 0,
      fs: 0,
      disablekb: 1
  }
});
}

function progressB(pPlay){

      clearInterval(timerProgress);
      if(pPlay) {
	      timerProgress = setInterval(progressTween, 100);
	      gsap.to('.video-container', {duration:0.3,y:'-10%' ,scale:1.1});
	    	gsap.to('#nav', {duration:0.3,autoAlpha:0});
        gsap.to('#temp-sub-nav', {duration:0.3,autoAlpha:0});
        
        gsap.to('#shadow-video', {duration:0.3,autoAlpha:0});
        gsap.to('#shadow-video', {duration:0.3,autoAlpha:0});
	      gsap.to('#layer-bg-video', {duration:0.3,autoAlpha:1});
	      gsap.to(obj,{duration:0.5,delay:1,volume:100,onUpdate:function(){
	          player.setVolume(obj.volume);
	      }});

      }else{

        gsap.to('#nav', {duration:0.3,autoAlpha:1});
        gsap.to('.video-container', {duration:0.3,scale:1,y:'0%'});
        gsap.to('#layer-bg-video', {duration:0.3,autoAlpha:0});
        gsap.to('#temp-sub-nav', {duration:0.3,autoAlpha:1});
        gsap.to('#shadow-video', {duration:0.3,autoAlpha:1});
        gsap.to(obj,{duration:0.3,delay:0.1,volume:0,onUpdate:function(){
          player.setVolume(obj.volume);
        },onComplete:function(){
            player.pauseVideo();
        }});

      }
}

function progressTween(){
      total = player.getDuration();
      time = player.getCurrentTime();
      playerTimeDifference = (time / total) * 1;
      gsap.to($("#progressBar div"),{duration:0.2,scaleX:playerTimeDifference})
}

function onPlayerReady(event) {
  var embedCode = event.target.getVideoEmbedCode();
  if (document.getElementById('player')) {
    document.getElementById('player').innerHTML = embedCode;
  }
  gsap.to('#player', {
      ease: 'linear',
      scrollTrigger: {
        trigger: '#player',
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        onEnter: self => {
          progressB(true);
        },
        onEnterBack: self => {
          progressB(true);
        },
        onLeaveBack: self => {
          progressB(false);
        },
        onLeave: self => {
          progressB(false);
        }
      }
    });
}


function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
      player.playVideo();
  }
}
function stopVideo() {
  player.stopVideo();
}
