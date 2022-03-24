// doXXX version 1
// update : 9 marss 2022

var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

moduleManager["dotoggle"] = function () {
    const $scope = this;
    const isGlobal = $($scope).attr('data-global') == "true";
    var $parent = $($scope).parent();
    if (isGlobal) {
        $parent = $("html");
    }
    const actionToggleAdd = $($scope).attr('data-bt-toggle-add');
    const actionToggleRemove = $($scope).attr('data-bt-toggle-remove');
    const actionToggleType = $($scope).attr('data-bt-type') || 'click';
    var datas = null;
    var toggleSens = true;
    if (actionToggleAdd != undefined) {

        datas = $($scope).attr('data-bt-toggle-add').split(',');
        toggleSens = true;

    }
    if (actionToggleRemove != undefined) {

        datas = $($scope).attr('data-bt-toggle-remove').split(',');
        toggleSens = false;

    }
    const active = datas[0];
    const targetName = datas[1] || 'do'
    const target = $(datas[1], $parent) || $scope;
    const classToggle = datas[2] || active;
    $scope.toggleKey = active + targetName;

    if (window.togglesKey[$scope.toggleKey] == undefined) {
        //console.log('NEW KEY ',$scope.toggleKey);
        window.togglesKey[$scope.toggleKey] = {};
        window.togglesKey[$scope.toggleKey].bool = toggleSens;
        //console.log('RESULT ',window.togglesKey[$scope.toggleKey].bool);
    } else {
        //console.log('ADD KEY ',$scope.toggleKey);
    }

    if (window.togglesKey[active] == undefined) {
        //console.log('NEW KEY ',$scope.toggleKey);
        window.togglesKey[active] = [];
        window.togglesKey[active].push(target);
        //console.log('RESULT ',window.togglesKey[$scope.toggleKey].bool);
    } else {
       
        window.togglesKey[active].push(target);
    }
    //console.log('RESET  KEY ',window.togglesKey[active]);

    $scope.toggles = {};

    $($scope).on(actionToggleType, $scope, function (e) {

        $scope.toggle();

    });
    $scope.toggle = function () {

        $.each(window.togglesKey[active], function (index, value) {

            if(value != target){
                $(value).removeClass(classToggle);
            }
        
        });
        //console.log("TOGGLE ")
        //console.log('TEST KEY ',window.togglesKey[$scope.toggleKey].bool);
        if ($scope.toggles[active] == undefined) {
            $scope.toggles[active] = window.togglesKey[$scope.toggleKey].bool;
        }
        window.togglesKey[$scope.toggleKey].bool = !window.togglesKey[$scope.toggleKey].bool;
        $scope.toggles[active] = window.togglesKey[$scope.toggleKey].bool;
        $($scope).toggleClass(active);
        if(window.togglesKey[active].length > 1){
            target.toggleClass(classToggle);
        }else{
            if ($scope.toggles[active]) {
                target.removeClass(classToggle);
            } else {
                target.addClass(classToggle);
            }
        }
        //console.log("TOGGLE ",classToggle,$scope.toggles[active]);
    }
    //
}

window.WFmodules = moduleManager;