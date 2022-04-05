// doXXX version 1
// update : 9 marss 2022

var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

moduleManager["dotweens"] = function () {

    
    var $scope = this;
    $scope.stage = $($scope).attr("data-do-stage") || false;

    $scope.target = $($scope).attr("data-do-target") || $scope;
    $scope.triggerContainer = $scope;

    if($scope.stage != false){
        $scope.target = $($scope.target,$($scope.stage));
        $scope.triggerContainer = $($scope.stage);
    }
    $scope.force = $($scope).attr('data-do-force') || 5;
    $scope.scrub = Number($($scope).attr('data-do-scrub')) || true;
    $scope.start = $($scope).attr('data-do-start') || "top center+=20%";
    $scope.end = $($scope).attr('data-do-end') || "bottom center-=20%";
    $scope.type = $($scope).attr('data-do-type-tween') || "to";
    $scope.order = $($scope).attr('data-do-order-tween') || "top";
    $scope.batch = $($scope).attr('data-do-batch-tween') == "true" || false;
    $scope.motion = $($scope).attr('data-do-motion-tween') || "fade-in";
    $scope.ease = $($scope).attr('data-do-ease-tween') || "sine.inOut";
    $scope.duration = $($scope).attr('data-do-duration-tween') || 0.4;
    $scope.stagger = $($scope).attr('data-do-stagger-tween') || 0.15;
    $scope.amount = $($scope).attr('data-do-amount-tween') || 1.5;

    if($($scope).attr("data-do-target") != undefined){
        $scope.target = $($scope.target,$scope);
    }
    

    $scope.getParams = function (motion,target,pOverwrite=true) {

        let onParams = [];
        
        let tempSetParams = {
            overwrite: pOverwrite
        };
        let tempSetParamsBack = {
            overwrite: pOverwrite
        };

        let tempToParams = {
            stagger: $scope.stagger,
            overwrite: pOverwrite,
            duration:$scope.duration
        };

        
        let tempToParamsBack = {
            stagger: $scope.stagger,
            overwrite: pOverwrite,
            duration:$scope.duration
        };
    
        if (motion == "fade-in") {
          
            tempToParams['opacity'] = 1;
   
            onParams["onEnter"] = tempToParams;

            tempSetParams['opacity'] = 0;
            onParams["onLeave"] = tempSetParams;

            tempToParams['opacity'] = 1;
            onParams["onEnterBack"] = tempToParams;

            tempSetParams['opacity'] = 0;
            onParams["onLeaveBack"] = tempSetParams;
            
            onParams["init"] = {opacity:0};
        }

        if (motion == "fade-out") {
          
            tempToParams['opacity'] = 0;
            onParams["onEnter"] = tempToParams;

            tempSetParams['opacity'] = 1;
            onParams["onLeave"] = tempSetParams;

            tempToParamsBack['opacity'] = 0;
            onParams["onEnterBack"] = tempToParamsBack;

            tempSetParamsBack['opacity'] = 1;
            onParams["onLeaveBack"] = tempSetParamsBack;
            
            onParams["init"] = {opacity:1};
        }

        if (motion == "slide-in") {
            

            tempToParams['opacity'] = 1;
            tempToParams['y'] = 0;
            onParams["onEnter"] = tempToParams;

            tempSetParams['opacity'] = 0;
            tempSetParams['y'] = -62;
            onParams["onLeave"] = tempSetParams;

            tempToParamsBack['opacity'] = 1;
            tempToParamsBack['y'] = 0;
            onParams["onEnterBack"] = tempToParamsBack;

            tempSetParamsBack['opacity'] = 0;
            tempSetParamsBack['y'] = 62;
            onParams["onLeaveBack"] = tempSetParamsBack;
           
            onParams["init"] = {opacity:0,y:62};
         
        }

        if (motion == "slide-out") {
            

            tempToParams['opacity'] = 0;
            tempToParams['y'] = 0;
            onParams["onEnter"] = tempToParams;

            tempSetParams['opacity'] = 1;
            tempSetParams['y'] = -62;
            onParams["onLeave"] = tempSetParams;

            tempToParamsBack['opacity'] = 0;
            tempToParamsBack['y'] = 0;
            onParams["onEnterBack"] = tempToParamsBack;

            tempSetParamsBack['opacity'] = 1;
            tempSetParamsBack['y'] = 62;
            onParams["onLeaveBack"] = tempSetParamsBack;
           
            onParams["init"] = {opacity:1,y:62};
         
        }

        if (motion == "slide-in-percent") {
            

            tempToParams['opacity'] = 1;
            tempToParams['y'] = 0;
            onParams["onEnter"] = tempToParams;

            tempSetParams['opacity'] = 0;
            tempSetParams['y'] = "-=50%";
            onParams["onLeave"] = tempSetParams;

            tempToParamsBack['opacity'] = 1;
            tempToParamsBack['y'] = 0;
            onParams["onEnterBack"] = tempToParamsBack;

            tempSetParamsBack['opacity'] = 0;
            tempSetParamsBack['y'] = "+=50%";
            onParams["onLeaveBack"] = tempSetParamsBack;
           
            onParams["init"] = {opacity:0,y:"+=50%"};
         
        }

        if (motion == "zoom-in") {
            

            
            tempToParams['scale'] = 1;
            onParams["onEnter"] = tempToParams;

            
            tempSetParams['scale'] = 0;
            onParams["onLeave"] = tempSetParams;

            
            tempToParamsBack['scale'] = 1;
            onParams["onEnterBack"] = tempToParamsBack;

            
            tempSetParamsBack['scale'] = 0;
            onParams["onLeaveBack"] = tempSetParamsBack;

            onParams["init"] = {scale:0};
             
        }

        return onParams;
    }

  
    if($scope.batch){

        var params = $scope.getParams($scope.motion,$scope.target);
        gsap.set($scope.target,params["init"]);
       
        ScrollTrigger.batch($scope.target, {
            onEnter: batch => gsap.to(batch,  params["onEnter"]),
            onLeave: batch => gsap.set(batch, params["onLeave"] ),
            onEnterBack: batch => gsap.to(batch, params["onEnterBack"] ),
            onLeaveBack: batch => gsap.set(batch, params["onLeaveBack"] ),
            start: $scope.start,
            end: $scope.end,
            marker:false
        });
        ScrollTrigger.addEventListener("refreshInit", () => gsap.set($scope.target, params["init"]));
        
    }else{

        var params = $scope.getParams($scope.motion,$scope.target,false);
        gsap.set($scope.target,params["init"]);

        var tl = gsap.timeline({scrollTrigger:{
            trigger:$scope.triggerContainer,
            start: $scope.start,
            end: $scope.end,
            scrub: $scope.scrub,
            toggleActions:"play resume play pause"
        }});

        var np = params["onEnter"];
        np["ease"] = "sine.inOut";
        np["stagger"] = { // wrap advanced options in an object
            amount: $scope.amount,
            from: $scope.order,
            ease: $scope.ease,
            repeat: 0 // Repeats immediately, not waiting for the other staggered animations to finish
          }

        tl.to($scope.target, np); 
    }
}

window.WFmodules = moduleManager;