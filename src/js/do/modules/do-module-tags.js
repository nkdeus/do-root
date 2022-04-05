// dofilters version 1
// update : 8 marss 2022

var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

moduleManager["dofilters"] = function () {

    const $scope = this;
    //data-do-stage="#items-container" data-do-target=".js-tween-item3" data-do-nav="#nav-filters" data-do-type="solo" data-do-class-toggle="active"
    $scope.stage = $($($scope).attr("data-do-stage") || "#items-container");
    $scope.target = $($scope).attr("data-do-target");
    $scope.subTarget = $($scope).attr("data-do-sub-target");
    $scope.nav = $($scope).attr("data-do-nav") || "#nav-filters";
    $scope.type = $($scope).attr("data-do-type") || "solo"; // solo || multi
    $scope.toggleClass = $($scope).attr("data-do-class-toggle") || "active:do-hide";
    $scope.btToggleClass = $($scope).attr("data-do-class-toggle-bt") || "active";
    $scope.defaultClass = $($scope).attr("data-do-class-default") || "do-block";
    $scope.customData = $($scope).attr("data-do-custom-data") || "data-do-tag";
    $scope.inputArea = $($scope).attr("data-do-target-input") || "rechercheArea";
    $scope.attrName = $($scope).attr("data-do-attr") || "href";
    $scope.btAttrName = $($scope).attr("data-do-bt-attr") || "href";
    $scope.sep = $($scope).attr("data-do-sep") || "/";
    $scope.tagIndex = parseInt($($scope).attr("data-do-tag-index")) || 1;

    var datas = [];
    var tags = {};
    var autoCompleteList = [];
    var bts = [];
    var currentTag = undefined;
    var currentTags = [];

    var item = {
        id:"",
        instance:"",
        tags:""
    }

    $($scope.nav).find('a').each(function() {  
        var bt = $(this);
        bts.push(bt);
        var tag = bt.attr($scope.btAttrName).split($scope.sep)[$scope.tagIndex];
        if(tag == undefined){
            tag = bt.attr($scope.btAttrName);
        }
        bt.attr($scope.customData,tag);
        autoCompleteList.push(tag);
        console.log(">>>>>>>>>>>>>>>>>>>> push ",tag);
        tags[tag] = [];
    
        bt.click(function (event) {
            event.preventDefault();
            $scope.updateTag($(this).attr($scope.customData),$(this));
        });     
    });

    $.each($($scope.target,$scope.stage), function (key, value) {         
        var instance = $(value);
        
        instance.addClass($scope.defaultClass);
        instance.addClass($scope.toggleClass);     
        var tagsToSplit = instance.attr($scope.attrName);
        if($scope.subTarget != undefined){
            tagsToSplit = instance.find($scope.subTarget).attr($scope.attrName);
        }
        var tempsTags = tagsToSplit.split($scope.sep);
        tempsTags = $.grep(tempsTags,function(n){ return n != '' || n });

        console.log("tempsTags ",tempsTags);
  
        var item = 
        {
            id:key,
            instance:instance,
            tags:tempsTags
        }
        datas.push(item);
        $.each(item.tags, function (key, value) {
           

            if(tags[value]){
                tags[value].push(item);
            }
           
        });
    });

    $scope.resetNav = function(pBt=undefined){
        if(pBt == undefined){
            $($scope.nav).find('a').removeClass($scope.btToggleClass);
        }else{
            pBt.removeClass($scope.btToggleClass);
        }
    }

    $scope.activeItems = function(pItems){
        console.log("??? ",pItems);
        $.each(pItems, function (key, value) {
            value.instance.removeClass($scope.toggleClass);
            gsap.fromTo(value.instance, { duration: 0.5, opacity:0 }, { opacity: 1 });
        });
    }

    $scope.resetStage = function(pItems){
        $scope.stage.removeClass('active');
        currentTags = [];
        $.each(pItems, function (key, value) {
            value.instance.addClass($scope.toggleClass);
        });
        currentTag = undefined;
    }

    $scope.containsAny = function(source,target){
        var result = source.filter(function(item){ return target.indexOf(item) > -1});   
        return (result.length > 0);  
    } 
    
    $scope.removeOneTag = function(pTag){
        currentTags.splice($.inArray(pTag ,currentTags),1);
        console.log("multi : ",pTag," remove from array ",currentTags);
        currentTag = "";
        $.each(tags[pTag], function (key, value) {
            if(!$scope.containsAny(currentTags,value.tags)){
                value.instance.addClass($scope.toggleClass);
            }
        });
        $("["+$scope.customData+"="+pTag+"]").removeClass($scope.btToggleClass);
        if(currentTags.length == 0){
            $scope.stage.removeClass('active');
            currentTag = undefined;
            $($scope.nav).find('a').removeClass($scope.btToggleClass);
        }
    }

    $scope.activeOneTag = function(pItems){
        $.each(pItems, function (key, value) {
            value.instance.removeClass($scope.toggleClass);
            gsap.fromTo(value.instance, { duration: 0.5, opacity:0 }, { opacity: 1 });
        });
    }

    $scope.activeTags = function(){
        $.each(currentTags, function (key, value) {
            $("["+$scope.customData+"="+value+"]").addClass($scope.btToggleClass);
            $scope.activeOneTag(tags[value]);
        });
    }

    $scope.updateTag = function(pTag,pBt=undefined){
        var tag = pTag;
        console.log("[updateTag] ",pTag);
        if($scope.type == "solo"){
            $scope.resetNav();
        }
        if(currentTag == undefined){
            console.log("[pas de filtre activé encore]");
            $scope.stage.addClass('active');
            $scope.activeItems(tags[tag]);
            currentTag = tag;
            currentTags.push(currentTag);
            pBt.addClass($scope.btToggleClass);
        }else if(tag == currentTag || tag == undefined){
            console.log("[tag identique ou tag undefined]");
            if($scope.type == "solo"){
                $scope.resetStage(tags[currentTag]);
            }else if(tag != undefined){
                $scope.removeOneTag(tag);
            }
            if(pBt){
                pBt.removeClass($scope.btToggleClass);
            }          
        }else{
            console.log("[nouveau tag]");          
            $scope.stage.addClass('active');
            currentTag = tag;
            if($scope.type == "solo"){
                $($scope.target).addClass($scope.toggleClass);
                pBt.addClass($scope.btToggleClass);
                $scope.activeOneTag(tags[currentTag]);
            }else{
                if($.inArray(currentTag, currentTags) !== -1){
                    console.log("multi : ",currentTag," deja dans array ",currentTags);
                    $scope.updateTag(currentTag);
                }else{     
                    pBt.addClass($scope.btToggleClass);
                    currentTags.push(currentTag);
                    console.log("multi : ",currentTag," nouveau dans array ",currentTags);
                    $scope.activeOneTag(tags[currentTag]);
                }     
                console.log("multi : new result ",currentTags);
            }
        }
    }

    $scope.autocomplete = function(inp, arr, callback) {
        var success = false;
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;     
            success = false;     
            if (!val) {     
                callback(undefined);
                return false;  
            }
            for (i = 0; i < arr.length; i++) {    
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {         
                success = true;
                callback(arr[i]);
                a.appendChild(b);
                }
            }
            if(success == false){
                callback(undefined);
            }
        });     
        }

    $scope.resultRecherche = function(pTag){
        if(pTag == currentTag){
            return;
        }
        if(pTag == undefined){
            $scope.updateTag(pTag);
        }else{
            $scope.updateTag(pTag,$("["+$scope.customData+"="+pTag+"]"));
        }
    };

    $scope.autocomplete(document.getElementById($scope.inputArea),autoCompleteList, $scope.resultRecherche);

}

window.WFmodules = moduleManager;