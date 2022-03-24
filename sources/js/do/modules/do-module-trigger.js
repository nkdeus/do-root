// doXXX version 1
// update : 9 marss 2022

var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

moduleManager["dotrigger"] = function () {
    
    var $scope = this;
    $scope.toggle = $($scope).attr("data-do-trigger") == "true";
    $scope.target = $($scope).attr("data-do-target");
    $scope.classToggle = $($scope).attr("data-do-class") || "active"
    $scope.creatNav = $($scope).attr("data-do-scroll-nav") == "true";
    $scope.targetNav = $($scope).attr("data-do-target-nav");
    $scope.targetNavOffsetY = $($scope).attr("data-do-target-nav-offset-y") ||90;
    $scope.btName = $($scope).attr("data-do-bt-name");
    $scope.start = $($scope).attr('data-do-start') || "top center";
    $scope.end = $($scope).attr('data-do-end') || "bottom center";

    $scope.isClone = false;
                
    var initScrollNav = function() {

        var menu = $($scope.targetNav);
        var win = $(window);

        $('a', menu) .click(function (event) {
        event.preventDefault();
        
        var scope = $(this),
        href = scope.attr("href"),
        topY = $(href).offset().top - $scope.targetNavOffsetY;
    
    
        TweenMax.to(win, 1, {
            scrollTo: {
            y: topY,
            autoKill: true
            },
            ease: Power3.easeOut
        });
    
        return false;
        });
    
    }

    if($scope.creatNav){
       
        var idSection = $($scope).attr("data-do-section-id") || $($scope).attr("id");

        if(window.WFmodules[$scope.targetNav.toString()] == undefined){
            window.WFmodules[$scope.targetNav.toString()] = $("li", $scope.targetNav);
            window.WFmodules[$scope.targetNav.toString()].remove();
        }
        var tpl = window.WFmodules[$scope.targetNav.toString()];
        var clone = tpl.clone();
       
        $("ul", $scope.targetNav).append(clone);
        $("span", clone).html($scope.btName);
        $("a", clone).attr("href","#"+idSection);
        $scope.targetClone = $("a", clone);
        $scope.isClone = true;

        initScrollNav();

    }

    ScrollTrigger.create({
        trigger: $scope,
        start: $scope.start,
        end: $scope.end,

        onToggle: function () {
            $scope.toggle = !$scope.toggle;
            $($scope).toggleClass("active");
            //console.log("toggle ",$scope.toggle);
            $($scope).attr("data-do-trigger", $scope.toggle);

            if ($scope.target && $scope.isClone == false) {
                $($scope.target).toggleClass($scope.classToggle);
                $.event.trigger({
                    type: "darkMode",
                    class: $scope.classToggle,
                    toggle: $scope.toggle     
                });
            }
            if($scope.isClone){
               // console.log("targetClone ",$scope.classToggle);
                $scope.targetClone.toggleClass($scope.classToggle);
            }
        },

    });

}

window.WFmodules = moduleManager;