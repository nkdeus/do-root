var moduleManager=window.WFmodules;(moduleManager=null==moduleManager?{}:moduleManager).doautotheme=function(){var o,n=this,r=!1,t=$(n).attr("data-do-input-url"),l=$(n).attr("data-do-custom-target")||n,a=null!=t,s=$(n).attr("data-do-target-container")||$(n),e=$("img",s),d=e[0],c=e.attr("data-src")||e.attr("src");return null==window.doautotheme&&(window.doautotheme=n),n.colors=[],a&&$(t).focusout(function(){n.forceLoad()}),n.getPalette=function(o){if(0!=r){var e,o=new Vibrant(o,64,5);for(e in n.swatches=o.swatches(),n.colors=[],n.swatches)n.swatches.hasOwnProperty(e)&&n.swatches[e]&&n.colors.push(n.swatches[e].getHex());if(null==n.swatches.Vibrant)return console.log("__error :/"),void(n.colors=[]);n.colors.push(n.swatches.Vibrant.getTitleTextColor());var t,o=Please.HEX_to_HSV(n.swatches.Vibrant.getHex()),o=(result=Please.make_scheme(o,{scheme_type:"complementary",format:"hex"}),Please.make_color({golden:!0,base_color:o,saturation:.01,value:.15,colors_returned:2,format:"hex"})),a=Please.make_color({golden:!0,base_color:Please.HEX_to_HSV(result[1]),saturation:.01,value:.91,colors_returned:2,format:"hex"});if(n.colors.push(result[1]),n.colors=$.merge(n.colors,o),n.colors=$.merge(n.colors,a),null!=window.dothemes&&"html"==l)for(t=0;t<window.dothemes.length;++t)window.dothemes[t].pushColors(n.colors);else $.each({main:0,second:5,contraste:2,extra:6},function(o,e){var t="--"+o+"-color",o=("html"==l&&(t="--"+o),n.colors[e]);$(l).css(t,o)})}},n.doconsole=function(){for(var o="",e=0;e<window.dothemes.length;++e)o+=window.dothemes[e].getCssLine();$("#console").html(o)},n.imageLoaded=function(){r=!0,setTimeout(function(){n.getPalette(d)},0)},n.forceLoad=function(){var o,e;""==$(t).val()&&a?(console.log("$scope.imageLoaded()"),d.onload=n.imageLoaded()):(d&&(d.remove(),d.onload=null,d=null),o=new Image,e=$(t).val()||c,o.crossOrigin="anonymous",o.addEventListener("load",function(){d=o,n.imageLoaded()},!1),o.src=e,$(s).html(o))},a?($(n).click(function(){var o=window.innerWidth-Math.floor(window.innerWidth/10)-Math.floor(10*Math.random());$(t).val(c+o.toString()),n.forceLoad()}),o=window.innerWidth-Math.floor(window.innerWidth/10)-Math.floor(10*Math.random()),$(t).val(c+o.toString()),n.forceLoad()):($(n).click(function(){console.log("click"),n.imageLoaded()}),e.prop("complete")?(console.log("deja load"),n.imageLoaded()):(console.log("on load"),e.on("load",function(){n.imageLoaded()}))),n},window.WFmodules=moduleManager;