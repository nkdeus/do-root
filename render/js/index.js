window.togglesKey={},window.doautotheme=null,$(document).ready(function(){$("[data-module]").each((e,o)=>{"dotheme"==o.dataset.module?(null==window.dothemes&&(window.dothemes=[]),window.dothemes.push(window.WFmodules[o.dataset.module].call(o))):null!=window.WFmodules[o.dataset.module]?(console.log("#module",o.dataset.module),window.WFmodules[o.dataset.module].call(o)):console.log("#ERROR",o.dataset.module)});var o,t,l;o=$(window).height()/6.4,t=$("body"),l=!1,$(document).mousemove(function(e){e.clientX;e=e.clientY;e<o&&"down"==t.attr("do-event-scroll")&&0==l&&(t.attr("do-event-scroll","up"),l=!0),o<e&&"up"==t.attr("do-event-scroll")&&1==l&&(t.attr("do-event-scroll","down"),l=!1)}),$(document).on("darkMode",function(e){"darkmodetrigger"==e.class&&$("#color-switcher").click()});var e=window.matchMedia("(prefers-color-scheme:dark)").matches,s="toggleMode12",n="true"==a(s);function d(e,o,t){return gsap.utils.random(e[0],e[1],1)+","+gsap.utils.random(o[0],o[1],1)+"%,"+gsap.utils.random(t[0],t[1],1)+"%"}e&&$("#color-switcher").addClass("active"),console.log("MODE SAVE",a(s)),console.log("MODE ON/OFF ",n),null!=n&&n&&(console.log("CHANGE AUTO ",n),$("#color-switcher").click()),$("#color-switcher").on("click",function(e){var o;$(".trigger-filter-invert").each(function(){$(this).toggleClass("filter-invert")}),n=!n,console.log("toggleMode save ",n),o=n,localStorage.setItem(s,o)});e=JSON.parse(localStorage.getItem("theme"));function a(e){return localStorage.getItem(e)}function c(e){$.each(e,function(e,o){$("body").css("--"+o.name,o.hsl),$("body").css("--"+o.name+"-H",o.splited[0]),$("body").css("--"+o.name+"-S",o.splited[1]),$("body").css("--"+o.name+"-L",o.splited[2])})}null!=e&&c(e),$("#color-random").on("click",function(e){n=d([0,220],[70,100],[50,90]),o=d([0,360],[0,10],[80,90]),t=d([0,360],[0,10],[0,10]),s=d([140,360],[70,100],[50,90]),l=d([0,360],[0,10],[80,90]);var o,t,l,s,n=[{name:"main",hsl:n,splited:n.split(",")},{name:"extra",hsl:s,splited:s.split(",")},{name:"second",hsl:o,splited:o.split(",")},{name:"contraste",hsl:t,splited:t.split(",")},{name:"fade",hsl:l,splited:l.split(",")}];s="theme",localStorage.setItem(s,JSON.stringify(n)),c(n)})});