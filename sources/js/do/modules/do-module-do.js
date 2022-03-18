// doXXX version 1
// update : 9 marss 2022

var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

moduleManager["do"] = function () {
    console.log(`DO ${str}`);
}
window.WFmodules = moduleManager;