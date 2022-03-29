// do-mouse-datas v1
// connecter le framework SCSS Do avec la position de la souris par rapport à un point ou objet.

// update : 22 marss 2022


var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

moduleManager["domousedatas"] = function () {

    var $scope = $(this);
    $scope.target = $scope.attr("data-do-target-id");
    $scope.rayon = parseInt($scope.attr("data-do-rayon")) || 1;
    $scope.offsetVal = Number($scope.attr("data-do-offset")) || 0;
    $scope.calcul = $scope.attr("data-do-calcul") || "go-in";
    $scope.force = Number($scope.attr("data-do-force")) || 1;
    $scope.start = $scope.attr("data-do-start") || "top center+=10%";
    $scope.end = $scope.attr("data-do-end") || "bottom center+=10%";
    
    
    var targetItem = $('#'+$scope.target);
    var distanceMax = parseInt(targetItem.width()/2*$scope.rayon);
    var calculType = {};   
    calculType["go-in"] = function(pEvent){

        var screenX = e.clientX;
        var screenY = e.clientY;
        var pageX = e.pageX;
        var pageY = e.pageY;
        var mouseData = {
            x:screenX,
            y:screenY
        }


        var distance = getDistanceBetweenElements(
            getPositionAtCenter(document.getElementById($scope.target)),
            mouseData
        );
        
        distance = Number((distanceMax-distance)/distanceMax).toFixed(4);
        if(distance >= 0){
            targetItem.css("--progress",Number(distance)+$scope.offsetVal);
        }else{
            targetItem.css("--progress",$scope.offsetVal);
        }
    }

    var getPositionAtCenter = function(element) {
        const {top, left, width, height} = element.getBoundingClientRect();
        return {
          x: left + width / 2,
          y: top + height / 2
        };
      }
     
      var getDistanceBetweenElements = function(a, b) {
       const aPosition = a;
       const bPosition = b;
     
       return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);  
     }
     



    $(document).mousemove(function(e){


        calculType[$scope.calcul](e)

       
        //
     


    });


}
window.WFmodules = moduleManager;