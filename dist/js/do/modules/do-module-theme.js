// doXXX version 1
// update : 9 marss 2022

var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

moduleManager["dotheme"] = function () {
    var $scope = this;
    var containerItem = $($scope);
    var currentItem = null;

    var timeOut = null;
    containerItem.click(function () {
        containerItem.toggleClass('active');
    });

    $scope.getCssLine = function () {

        if (currentItem == null) {
            return "null"
        }
        return "$" + currentItem.attr("data-bt-color") + "Color: " + currentItem.attr("data-color") + ";<br>";
    }

    $scope.changeSelectedColor = function (type, color) {

        var cssVar = "--" + type;
        //console.log(cssVar);
        if ($($scope).attr("data-custom-target") != undefined) {
            $($($scope).attr("data-custom-target")).css(cssVar, color);
        }

    };

    containerItem.on('click', '[data-bt-color]', function (e) {

        var timeOutDelay = 0;
        if (currentItem) {
            timeOutDelay = 300;
            var tempItem = currentItem;
            currentItem.removeClass('active');
        }

        currentItem = $(this);
        currentItem.addClass('active');
        $scope.changeSelectedColor(currentItem.attr("data-bt-color"), currentItem.attr("data-color"));
        clearTimeout(timeOut);
        timeOut = setTimeout(function () {
            if (tempItem) {
                containerItem.append(tempItem);
            }
            containerItem.prepend(currentItem);
        }, timeOutDelay);

        //$('#console').append($scope.getCssLine());
        window.doautotheme.doconsole();

    });

    $scope.itemsCreat = false;
    $scope.colorsList = undefined;
    $scope.itemsList = [];
    if ($($scope).attr("data-colors") != undefined) {

        $scope.colorsList = $($scope).attr("data-colors").split(",");

    }

    $scope.pushColors = function (colors) {

        var newColors = colors;

        var typeC = $($scope).attr("data-type-color");
        //console.log("max -- ",newColors.length);
        var i = 0;
        for (i = 0; i < newColors.length; ++i) {

            if ($scope.itemsCreat == false) {
                var cItem = "<div class='color-" + i + "' data-bt-color='" + typeC + "' data-color='" + newColors[i] + "'></div>";
                containerItem.append(cItem);
                $scope.itemsList.push(cItem);
                //console.log("__ __itemsCreat ");

            } else {
                //console.log("__reset");
                $(".color-" + i, $scope).removeClass('active');
            }
            $(".color-" + i, $scope).attr("data-color", newColors[i]);
            $(".color-" + i, $scope).css("background-color", newColors[i]);

        }

        var currentIndex = 0;
        //var customChoice = {"main":0,"second":9,"contraste":6,"extra":5};
        var customChoice = { "main": 0, "second": 5, "contraste": 2, "extra": 6 };
        currentIndex = customChoice[typeC];




        $(".color-" + currentIndex, $scope).css("background-color", newColors[currentIndex]);
        $(".color-" + currentIndex, $scope).attr("data-color", newColors[currentIndex]);
        $(".color-" + currentIndex, $scope).click();
        containerItem.toggleClass('active');
        $scope.itemsCreat = true;
        //containerItem.click();

    };

    if ($scope.colorsList != undefined) {
        $scope.pushColors($scope.colorsList);
    }

    return $scope;


}

window.WFmodules = moduleManager;