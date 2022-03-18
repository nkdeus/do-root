// doXXX version 1
// update : 9 marss 2022

var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

moduleManager["dopara"] = function () {
    var $scope = this;

    $scope.stage = $($scope).attr("data-do-stage") || false;

    $scope.target = $($scope).attr("data-do-target") || $scope;
    $scope.triggerContainer = $($scope);

    if($scope.stage != false){
        $scope.target = $($scope.target,$($scope.stage));
        $scope.triggerContainer = $($scope.stage);
    }

    $scope.force = $($scope).attr('data-do-force') || 5;
    $scope.scrub = Number($($scope).attr('data-do-scrub')) || true;
    $scope.start = $($scope).attr('data-do-start') || "top top";
    $scope.end = $($scope).attr('data-do-end') || "bottom top";
    $scope.type = $($scope).attr('data-do-type-tween') || "to";
    $scope.tweens = [];
    $scope.tweens = $($scope).attr('data-do-tween').split(",");

  

    $scope.getParams = function (deph) {
        let gsapParams = {
            ease: 'none',
            scrollTrigger: {
                trigger: $scope.triggerContainer,
                start: $scope.start,
                end: $scope.end,
                scrub: $scope.scrub
            }
        };
        $.each($scope.tweens, function (index, value) {

            if (value == "scale" || value == "scaleX" || value == "scaleY" || value == "opacity") {
               // console.log($scope.force * deph)
                gsapParams[value] = $scope.force * deph;
            }
            if (value == "in") {
                gsapParams["opacity"] = 1;
            }
            if (value == "out") {
                gsapParams["opacity"] = 0;
            }
            if (value == "x" || value == "y") {
                gsapParams[value] = 42 * $scope.force * deph;
            }
            if (value == "rotation" || value == "rotationX" || value == "rotationY" || value == "rotationZ") {
                gsapParams[value] = 1 * $scope.force * deph;
            }

        });
        return gsapParams;
    }


    $($scope.target, $scope).each((i, el) => {
        let deph = Number($(el).attr('data-do-deph')) || 1 + 0.1 * i;
    
        ScrollTrigger.matchMedia({

            // desktop
            "(min-width: 960px)": function() {
              // setup animations and ScrollTriggers for screens 800px wide or greater (desktop) here...
              // These ScrollTriggers will be reverted/killed when the media query doesn't match anymore.
                if ($scope.type == "to") {
                    gsap.to(el, $scope.getParams(deph));
                } else {
                    gsap.from(el, $scope.getParams(deph));
                }
            },
          
            // mobile
            "(max-width: 799px)": function() {
              // The ScrollTriggers created inside these functions are segregated and get
              // reverted/killed when the media query doesn't match anymore. 
             
            },
              
            // all 
            "all": function() {
              // ScrollTriggers created here aren't associated with a particular media query,
              // so they persist.
            }
              
          }); 

    });

}
window.WFmodules = moduleManager;