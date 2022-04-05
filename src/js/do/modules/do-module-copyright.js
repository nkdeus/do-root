// doXXX version 1
// update : 9 marss 2022

var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

moduleManager["copyright"] = function () {
    const d = new Date();
    $('[data-year]', this).text(d.getFullYear())
}

window.WFmodules = moduleManager;