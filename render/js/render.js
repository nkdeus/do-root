$(document).ready(function(){var e={name:"Mika",nav:[{bt:"bt1"},{bt:"bt2"}],text:"lorem ipsume"};$("[data-do-tpl]").each(function(){console.log($(this).attr("data-do-tpl"));var t=$(this),a=t.attr("data-do-tpl");t.load("tpls/"+a+".html",function(){var t=document.getElementById(a+"-tpl").innerHTML,t=Mustache.render(t,e);$("#"+a).html(t)})})});