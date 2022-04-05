// do-scroll-datas v1
// connecter le framework SCSS Do avec la position du scroll par rapport à un point ou objet.
// @use scrolltrigger.js from gsap
// update : 22 marss 2022


/*

"linear" (a.k.a. "none" or "power0")
"power1" (a.k.a. "quad")
"power2" (a.k.a. "cubic")
"power3" (a.k.a. "quart")
"power4" (a.k.a. "strong" or "quint")
"back"
"bounce"
"circ"
"elastic"
"expo"
"sine"

*/

var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

gsap.registerPlugin(ScrollTrigger);

moduleManager["doscrolldatas"] = function () {

    var $scope = this;
    $scope.target = $($scope).attr("data-do-target") || $scope;
    $scope.trigger = $($scope).attr("data-do-trigger-calcul") || $scope;
    $scope.calcul = $($scope).attr("data-do-calcul") || "yoyo";
    $scope.maxStep = Number($($scope).attr("data-do-max-step")) || 10;
    $scope.force = Number($($scope).attr("data-do-force")) || 1;
    $scope.ease = $($scope).attr("data-do-ease") || false;
    $scope.easeDuration = Number($($scope).attr("data-do-ease-duration")) || 0.4;
    $scope.update = $($scope).attr("data-do-update") == "true" || false;
    $scope.toggle = $($scope).attr("data-do-toggle") == "true" || false;
    $scope.classik = $($scope).attr("data-do-classik") == "true" || false;
    $scope.start = $($scope).attr("data-do-start") || "top center+=10%";
    $scope.end = $($scope).attr("data-do-end") || "bottom center+=10%";

    $scope.progress = {pY: 0};

    
    if($scope.calcul=="full-reverse"){
        $($scope.target).css("--progress",1*$scope.force);
    }else{
        $($scope.target).css("--progress",0);
    }

    var calculType = {};   
    calculType["yoyo"] = function(pValue){

        var result = pValue;
        if(pValue >= 0.5){
            result = 1-pValue;
        }
        return Number(result*2*$scope.force).toFixed(4);

    }

    
    calculType["step"] = function(pValue){

   //console.log(Math.min((($scope.maxStep-1)/$scope.maxStep),Math.round(pValue*$scope.force*$scope.maxStep)/($scope.maxStep)));
        return Math.min((($scope.maxStep-1)/$scope.maxStep),Math.round(pValue*$scope.force*$scope.maxStep)/($scope.maxStep));

    }

    calculType["full"] = function(pValue){

        return pValue*$scope.force;

    }

    calculType["full-reverse"] = function(pValue){

        return (1-pValue)*$scope.force;

    }

    ScrollTrigger.create({
        trigger: $scope.trigger,
        start: $scope.start,
        end: $scope.end,
        onEnter: self => {
            if($scope.classik){
                $($scope.target).css("--progress",1);
            }
        },
        onLeave: self => {
            if($scope.classik){
                $($scope.target).css("--progress",1);
            }
        },
        onEnterBack: self => {
            if($scope.classik){
                $($scope.target).css("--progress",1);
            }
        },
        onLeaveBack: self => {
            if($scope.classik){
                $($scope.target).css("--progress",0);
            }
        },
        onToggle: self => {
            if($scope.toggle){
                if(self.isActive){
                    $($scope.target).css("--progress",1);
                }else{
                    $($scope.target).css("--progress",0);
                }
                
            }
           // console.log("toggled, isActive:", self.isActive)
        },
        onUpdate: self => {
            if($scope.update){
                //console.log("[scroll-event] progress:", self.progress.toFixed(1), "direction:", self.direction, "velocity", self.getVelocity());
                if($scope.ease){
                    gsap.to($scope.progress, {ease:$scope.ease, duration:$scope.easeDuration , overwrite: true, pY: calculType[$scope.calcul](self.progress.toFixed(4)), onUpdate: function(){
                        $($scope.target).css("--progress",$scope.progress.pY);
                    }});
                }else{
                    $($scope.target).css("--progress",calculType[$scope.calcul](self.progress.toFixed(4)));
                }
               

            }
  
        }
    });

}
window.WFmodules = moduleManager;