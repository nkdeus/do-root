// doXXX version 1
// update : 9 marss 2022

var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

moduleManager["dotexture"] = function () {
    var $scope = $(this);
    $scope.append('<div class="texture"></div>');

}

window.WFmodules = moduleManager;