function initScrollNav(){var o=$("#content");ScrollTrigger.create({trigger:o,onToggle:function(){console.log("toggle ")}}),$menu=$(".scroll-nav-auto"),$window=$(window),$menu.on("click","a",function(){var o=$(this).attr("href"),o=$(o).offset().top-150;return TweenMax.to($(window),1,{scrollTo:{y:o,autoKill:!0},ease:Power3.easeOut}),!1})}jQuery(function(){gsap.defaults({overwrite:"true"}),gsap.registerPlugin(ScrollToPlugin),$("#bt-scroll").on("click",function(){var o=window.scrollY+window.innerHeight/1.61;return $("body").hasClass("page-end")&&(o=0),TweenMax.to($(window),1,{scrollTo:{y:o,autoKill:!0},ease:Power3.easeOut}),!1}),initScrollNav()});