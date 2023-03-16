// do-mouse-datas v1
// connecter le framework SCSS Do avec la position de la souris par rapport à un point ou objet.

// update : 22 marss 2022


var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

moduleManager["domousedatas"] = function () {

    var $scope = $(this);
    $scope.target = $scope.attr("data-do-target");
    $scope.rayon = parseInt($scope.attr("data-do-rayon")) || 321;
    $scope.reverse = parseInt($scope.attr("data-do-reverse")) || 1;
    $scope.axe = $scope.attr("data-do-axe") || "y";
    $scope.calcul = $scope.attr("data-do-calcul") || "distance";
    $scope.elem = $('#'+$scope.target);
 
    
    var distanceMax = $scope.rayon;
    var calculType = {};  
    var slowerX = 0; 
    var slowerY = 0;
    var senssi = 10; 
    calculType["distance"] = function(e){
        
        var screenX = e.pageX;
        var screenY = e.pageY;
 
        if(slowerX == Math.round(screenX/senssi) && slowerY == Math.round(screenY/senssi)){           
            return;
        }
        slowerX = Math.round(screenX/senssi);
        slowerY = Math.round(screenY/senssi);

        if($scope.axe == false){
            distance = calculateDistance($scope.elem,screenX,screenY);  
        }else if($scope.axe == "x"){
            distance = calculateDistanceX($scope.elem,screenX);
        }else{
            distance = calculateDistanceY($scope.elem,screenY);
        }
        
        if(distance >= distanceMax){
            distance = 1;
        }else{
            distance = (distance/distanceMax);
        }
        distance = Math.abs($scope.reverse - distance);
        $scope.elem.css("--progress",distance);
    }

    function calculateDistance(elem, mouseX, mouseY) {
        return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
    }
    function calculateDistanceX(elem, mouseX) {
        return mouseX - (elem.offset().left+(elem.width()/2));
    }
    function calculateDistanceY(elem, mouseY) {
        return mouseY - (elem.offset().top+(elem.height()/2));
    }
     

    $(document).mousemove(function(e){

        calculType[$scope.calcul](e);

    });


}
window.WFmodules = moduleManager;