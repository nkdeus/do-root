// doXXX version 1
// update : 9 marss 2022

var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

moduleManager["doscrolldatas"] = function () {

    var $scope = this;
    $scope.target = $($scope).attr("data-do-target") || $scope;
    $scope.calcul = $($scope).attr("data-do-calcul") || "yoyo";
    $scope.force = Number($($scope).attr("data-do-force")) || 1;
    $scope.update = $($scope).attr("data-do-update") == "true" || false;
    $scope.toggle = $($scope).attr("data-do-toggle") == "true" || false;
    $scope.classik = $($scope).attr("data-do-classik") == "true" || false;
    $scope.start = $($scope).attr("data-do-start") || "top center+=10%";
    $scope.end = $($scope).attr("data-do-end") || "bottom center+=10%";

    var calculType = {};   
    calculType["yoyo"] = function(pValue){

        var result = pValue;
        if(pValue >= 0.5){
            result = 1-pValue;
        }
        return Number(result*2*$scope.force).toFixed(4);

    }

    calculType["full"] = function(pValue){

        return pValue*$scope.force;

    }

    ScrollTrigger.create({
        trigger: $scope.target,
        start: $scope.start,
        end: $scope.end,
        markers:true,
        onEnter: self => {
            if($scope.classik){
                $($scope.target).css("--progress",1);
                $($scope.target).attr('data-do-progress',1);
            }
        },
        onLeave: self => {
            if($scope.classik){
                $($scope.target).css("--progress",1);
                $($scope.target).attr('data-do-progress',1);
            }
        },
        onEnterBack: self => {
            if($scope.classik){
                $($scope.target).css("--progress",1);
                $($scope.target).attr('data-do-progress',1);
            }
        },
        onLeaveBack: self => {
            if($scope.classik){
                $($scope.target).css("--progress",0);
                $($scope.target).attr('data-do-progress',0);
            }
        },
        onToggle: self => {
            if($scope.toggle){
                if(self.isActive){
                    $($scope.target).css("--progress",1);
                    $($scope.target).attr('data-do-progress',1);
                }else{
                    $($scope.target).css("--progress",0);
                    $($scope.target).attr('data-do-progress',0);
                }
                
            }
            console.log("toggled, isActive:", self.isActive)
        },
        onUpdate: self => {
            if($scope.update){
                //console.log("[scroll-event] progress:", self.progress.toFixed(1), "direction:", self.direction, "velocity", self.getVelocity());
                $($scope.target).css("--progress",calculType[$scope.calcul](self.progress.toFixed(4)));
                $($scope.target).attr('data-do-progress',calculType[$scope.calcul](self.progress.toFixed(4)));
            }
  
        }
    });

}
window.WFmodules = moduleManager;