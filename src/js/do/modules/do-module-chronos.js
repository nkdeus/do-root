// doXXX version 1
// update : 9 marss 2022

var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

moduleManager["dochronos"] = function () {
    
    var $target = $(this);
    var $type = $target.attr('data-do-chronos');
    var $notrigger = $target.attr('data-do-notrigger') == "true";
    var $dateStart = $target.attr('data-do-date');
    var $start = $target.attr('data-do-start') || "bottom bottom";
    var $end = $target.attr('data-do-end') || "top top+=50%";
    // console.log("$dateStart ",$dateStart);
    var cible = ".do-date";
    var $container = $(cible, $target);

    var start = new Date('2004-01-01T00:00');
    if ($dateStart != undefined) {
        start = new Date($dateStart);
    }
    var now = new Date();

    function dayDiff(d1, d2) {
        d1 = d1.getTime() / 86400000 / 360;
        d2 = d2.getTime() / 86400000 / 360;
        return new Number(d2 - d1).toFixed(0);
    }


    var getData = {

        annees: function () {
            return dayDiff(start, now);
        },
        epoque: function () {
            return start.getFullYear();
        },
        number: function () {
            return Number($target.attr('data-do-number'));
        }

    }

    var result = { count: $container.text(), max: getData[$type] };



    if ($notrigger) {
        gsap.to(result, {
            duration: 1, count: result.max, onUpdate: function () {
                $container.text(result.count.toFixed(0));
            }
        });
    } else {
        gsap.to(result, {
            count: result.max, onUpdate: function () {
                $container.text(result.count.toFixed(0));
            }, scrollTrigger: {
                trigger: $container,
                scrub: 1,
                start: $start,
                end: $end,
                ease: 'expo.in'
            }
        });
    }

}
window.WFmodules = moduleManager;