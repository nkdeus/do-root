// doXXX version 1
// update : 9 marss 2022

var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

moduleManager["dochange"] = function () {
    const $scope = this;
    var $target = $($scope);
    var $container = $('.do-span', $target);
    var $mainColor = $target.css("--main-color");
    var $baseColor = $target.css("color");
    var $mots = $target.attr('data-do-change').split(",");
    var $max = $mots.length;
    $mots.push($container.text());

    var random = $target.attr('data-do-random') == "true";
    var index = 0;
    var duration = 0.2;
    var delay = 3;

    var stateActive = false;
    var stateAnim = false;

    $scope.random = function (exclude) {

        var r = Math.floor(Math.random() * ($max + 1));

        while (r == exclude) {
            r = Math.floor(Math.random() * ($max + 1));

        }

        return r;
    }
    $scope.randomDelay = function () {
        if (random) {
            return Number(2 + Math.floor(Math.random() * 4));
        } else {
            return delay;
        }
    }

    $scope.changeMot = function () {

        if (stateActive == false) {
            return;
        }

        stateAnim = true;
        gsap.to($container, {
            duration: duration / 2, delay: $scope.randomDelay, opacity: 0, y: -5, onComplete: function () {

                var newMot = $mots[index];
                $container.text(newMot);

                $container.attr("data-do-fx", "wtf");
                setTimeout(function () {
                    $container.attr("data-do-fx", "none");
                }, 200);

                gsap.fromTo($container, { duration: duration * 50, y: 5 }, {
                    opacity: 1, y: 0, onComplete: function () {

                        stateAnim = false;
                        if (stateActive == true) {
                            $scope.changeMot();
                        }

                    }
                })
                if (random) {

                    index = $scope.random(index);

                } else {
                    index++;
                    if (index > $max) {
                        index = 0;
                    }
                }

            }
        })
    }

    $scope.getCurrentSection = function () {

        var isActive = $target.hasClass("ok");
        if (stateActive != isActive) {

            stateActive = isActive;
            if (stateAnim == false) {
                $scope.changeMot();
            }

        }

    }

    ScrollTrigger.create({
        trigger: this,
        start: 'bottom bottom-=10%',
        end: 'top top+=10%',
        toggleClass: { targets: $target, className: "ok" },
        onUpdate: $scope.getCurrentSection
    });
}
window.WFmodules = moduleManager;