// doXXX version 1
// update : 9 marss 2022

var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

moduleManager["doautotheme"] = function () {
    var $scope = this;
    var paletteReady = false;
    var urlInput = $($scope).attr('data-do-input-url');
    var customTarget = $($scope).attr('data-do-custom-target') || $scope;
    var urlInputPhoto = urlInput != undefined;
    var datac = $($scope).attr('data-do-target-container');
    var imgContainer = datac || $($scope);
    var imgDom = $("img", imgContainer);
    var img = imgDom[0];
    var imgSrc = imgDom.attr('data-src') || imgDom.attr('src');
    var consoleCss;
    if (window.doautotheme == null) {
        window.doautotheme = $scope;
    }

    $scope.colors = [];

    if (urlInputPhoto) {
        var inputUrl = $(urlInput);
        inputUrl.focusout(function () {
            $scope.forceLoad();
        })
    }

    $scope.getPalette = function (targetImg) {
        if (paletteReady == false) {
            return;
        }
        // https://jariz.github.io/vibrant.js/
        var vibrant = new Vibrant(targetImg, 64, 5);
        $scope.swatches = vibrant.swatches();
        $scope.colors = [];
        // console.log('__$scope.swatches ',$scope.swatches);
        for (var swatch in $scope.swatches) {
            if ($scope.swatches.hasOwnProperty(swatch) && $scope.swatches[swatch]) {
                $scope.colors.push($scope.swatches[swatch].getHex());
            }
        }
        if ($scope.swatches['Vibrant'] != undefined) {
            $scope.colors.push($scope.swatches['Vibrant'].getTitleTextColor());
            var hsv = Please.HEX_to_HSV($scope.swatches['Vibrant'].getHex());
            result = Please.make_scheme(hsv, { 'scheme_type': 'complementary', format: 'hex' });
            var result2 = Please.make_color({
                golden: true,
                base_color: hsv,
                saturation: 0.01,
                value: 0.15,
                colors_returned: 2,
                format: 'hex'
            });
            var result3 = Please.make_color({
                golden: true,
                base_color: Please.HEX_to_HSV(result[1]),
                saturation: 0.01,
                value: 0.91,
                colors_returned: 2,
                format: 'hex'
            });
            $scope.colors.push(result[1]);
            $scope.colors = $.merge($scope.colors, result2);
            $scope.colors = $.merge($scope.colors, result3);
        } else {

            console.log("__error :/");
            $scope.colors = [];
            //$scope.forceLoad();
            return;
        }
        var i;
        //console.log("window.dothemes : ",window.dothemes);
        if (window.dothemes != null && customTarget == "html") {

            for (i = 0; i < window.dothemes.length; ++i) {
                var cItem = window.dothemes[i];
                cItem.pushColors($scope.colors);
            }

        } else {

            var currentIndex = 0;
            var customChoice = { "main": 0, "second": 5, "contraste": 2, "extra": 6 };
            $.each(customChoice, function (key, value) {

                var cssVar = "--" + key + "-color";
                if (customTarget == "html") {
                    cssVar = "--" + key;
                }
                var color = $scope.colors[value];
                //console.log("OK --> ",cssVar, color);
                $(customTarget).css(cssVar, color);
            });

        }




    }

    $scope.doconsole = function () {
        var i;
        var consoleCss = ""
        for (i = 0; i < window.dothemes.length; ++i) {
            var cItem = window.dothemes[i];
            consoleCss += cItem.getCssLine();
        }
        $('#console').html(consoleCss);
    };

    $scope.imageLoaded = function () {

        paletteReady = true;
        setTimeout(function () {
            $scope.getPalette(img);
        }, 0);

    }

    $scope.forceLoad = function () {

        if ($(urlInput).val() == "" && urlInputPhoto) {
            console.log("$scope.imageLoaded()");
            img.onload = $scope.imageLoaded();

        } else {

            if (img) {
                img.remove();
                img.onload = null;
                img = null;
            }

            var tmpImg = new Image();
            var urlImg = $(urlInput).val() || imgSrc;

            tmpImg.crossOrigin = "anonymous";

            tmpImg.addEventListener("load", function () {
                img = tmpImg;
                $scope.imageLoaded();
            }, false);

            tmpImg.src = urlImg;
            $(imgContainer).html(tmpImg);

        }


    }

    if (urlInputPhoto) {

        $($scope).click(function () {
            var R = window.innerWidth - Math.floor(window.innerWidth / 10) - Math.floor(Math.random() * 10);
            $(urlInput).val(imgSrc + R.toString());
            $scope.forceLoad();
        });

        var R = window.innerWidth - Math.floor(window.innerWidth / 10) - Math.floor(Math.random() * 10);
        $(urlInput).val(imgSrc + R.toString());
        $scope.forceLoad();

    } else {

        $($scope).click(function () {
            console.log("click")
            $scope.imageLoaded();
        });
        //$scope.imageLoaded();
        //$scope.forceLoad();

        if (imgDom.prop('complete')) {
            console.log("deja load")
            $scope.imageLoaded();
        } else {
            console.log("on load")
            imgDom.on('load', function () {
                $scope.imageLoaded();
            });
        }



    }

    return $scope;

}
window.WFmodules = moduleManager;