$(document).ready(function() {

  
  var datas = {
    name : "Mika",
    nav : [
      {bt:"bt1"},{bt:"bt2"}
    ],
    text : "lorem ipsume"
  };

  $('[data-do-tpl]').each(function(){
    console.log($(this).attr('data-do-tpl'));
    var item = $(this);
    var idTpl = item.attr('data-do-tpl');
    item.load("tpls/"+idTpl+".html",function(){
      var template = document.getElementById(idTpl+'-tpl').innerHTML;
      var output = Mustache.render(template, datas);
      $("#"+idTpl).html(output);
    });
  });

});
