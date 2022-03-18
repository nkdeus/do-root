// doXXX version 1
// update : 9 marss 2022

var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

moduleManager["dowtf"] = function () {

    const $scope = this;
    $scope.max = $($scope).attr('data-do-max') || 6;
    $scope.space = $($scope).attr('data-do-space') || 2;
    $scope.itemClass = $($scope).attr('data-do-wtf') || 'do-wtf-item';
    $scope.gap = $($scope).attr('data-do-gap') || '1px';
    $scope.force = $($scope).attr('data-do-force') || 5;
    $scope.blend = $($scope).attr('data-do-blend') || 'screen';
    $scope.random = [];
    $scope.random = $($scope).attr('data-do-tween').split(",");
    //console.log($scope.random);

    $scope.getParams = function () {
        let gsapParams = { duration: 20, ease: 'power3.inOut' };
        $.each($scope.random, function (index, value) {

            if (value == "scale" || value == "scaleX" || value == "scaleY" || value == "opacity") {
                gsapParams[value] = "random(0," + (0.2 * $scope.force) + ")";
            }
            if (value == "x" || value == "y") {
                gsapParams[value] = "random(0," + (20 * $scope.force) + ")";
            }
            if (value == "rotation" || value == "rotationX" || value == "rotationY" || value == "rotationZ") {
                gsapParams[value] = "random(0," + (10 * $scope.force) + ")";
            }

        });
        return gsapParams;
    }


    //gsap.set(item,{opacity:0,x:"random(0,50)", y:"random(0,50)"});
    $($scope).css('position', $($scope).attr('data-do-position') || 'relative');

    var containerItems = $("<div>");
    containerItems.addClass('do-grid-wtf');
    containerItems.css("mix-blend-mode", $scope.blend);
    var columns = Math.floor($scope.max / $scope.space);
    var cssRepeat = "repeat(" + columns + ", 1fr)";
    containerItems.css("grid-template-columns", cssRepeat);
    containerItems.css("gap", $scope.gap);
    //console.log(cssRepeat);


    $scope.append(containerItems[0]);
    var tl = gsap.timeline({ yoyo: true, repeat: 5 });

    $scope.creatWtf = function () {

        let item = $("<li></li>");
        item.addClass($scope.itemClass);
        containerItems.append(item[0]);
        gsap.set(item, $scope.getParams());
        tl.to(item, $scope.getParams(), 0)
        return item;

    }
    var wtfItems = [];

    for (var i = 0; i < $scope.max; i++) {

        wtfItems.push($scope.creatWtf());

    }
}

window.WFmodules = moduleManager;