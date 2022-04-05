var moduleManager = window.WFmodules;
if(moduleManager == undefined){
    moduleManager = {};
}

moduleManager["dotoggler"] = function () {

    let manager = new ToggleManager();
    let toggleItem = new ToggleItem(this,manager);

};

window.WFmodules = moduleManager;


class ToggleManager {
    
    constructor(){

        if(ToggleManager.instance instanceof ToggleManager){

            return ToggleManager.instance;
        }

        this.collection = {};

        ToggleManager.instance = this;
        return this;

    }

    addItem(pItem){

        console.log("[ToggleManager] addItem >>>>>>>>>>>>>>>>> ",pItem._name);

      
        if(!pItem.isAlone()){

            let idGroup = pItem.getIdGroup();
            if(this.collection[idGroup] == undefined){
                this.collection[idGroup] = [];
            }
            this.collection[idGroup].push(pItem);
            console.log("idGroup ",idGroup,this.collection[idGroup]);
        }

        if(pItem.isChildren() && !pItem.isForced()){
            let idMasterGroup = pItem.getIdMasterGroup();
            if(this.collection[idMasterGroup] == undefined){
                this.collection[idMasterGroup] = [];
            }
            this.collection[idMasterGroup].push(pItem);
            console.log("idMasterGroup ",idMasterGroup,this.collection[idMasterGroup]);
        }



        

    }


    onActionOnItem(pItem){

        console.log("[ToggleManager] onActionOnItem ",pItem.getLog());

        if(pItem.isForced()){
            pItem.toggle(true,true);
        }else{
            pItem.toggle();
        }
       

        if(pItem.isMaster()){


            console.log("MASTER DU GROUPE ",pItem.getIdMasterGroup());

            

            this.collection[pItem.getIdMasterGroup()].forEach(function(item){
                
                if(item.getState() && item != pItem){
                    item.toggle();
                }

            });

        }else if(pItem.isChildren()){

            console.log("UN MEMBRE DU GROUPE THEME !!",pItem._name ,pItem.getIdMasterGroup());
            if( this.collection[pItem.getIdMasterGroup()].length > 1){
                this.collection[pItem.getIdMasterGroup()].forEach(function(item){
                    if(item != pItem && !item.isMaster()){

                        console.log(" trouvé --- > ",item._name );
                        item.toggle(false,true);      
                      
                    }
                });
            }

        }else if(!pItem.isAlone()){

           console.log("UN MEMBRE DU GROUPE CUSTOM !!",pItem._name ,pItem.getIdGroup());
           let cc = this.collection;

           if( this.collection[pItem.getIdGroup()].length > 1){

                console.log("COMPORTANT AU MOINS 2 ITEMS dans ",pItem.getIdGroup());

                this.collection[pItem.getIdGroup()].forEach(function(item){ 

                    console.log("les items ",item._name);
                
                    if(item.isChildren() && item != pItem){

                        
                        console.log("MASTER DU CHILDREN ",item._name,item.getIdMasterGroup());

                        cc[item.getIdMasterGroup()].forEach(function(item2){
                
                            if(!item2.isMaster()){
                                item2.toggle(false,true);
                            }

                        });

                    }

                    item.toggle(pItem.getState(),true);

                });

            }


        }else{
            console.log("SOLO !!",pItem.getLog());
            pItem.toggle();
        }
            

        
        
    }

}

class ToggleItem {
    
    constructor(pItemTrigger,pManager){

        
        let scope = this;

        this.managerInstance = pManager;
      
        this.itemTrigger =  $(pItemTrigger);
        this.toggleClass = "active";
        this.targetToggleClass = this.itemTrigger.attr('data-do-custom-target-class') ||  this.toggleClass;

        this.idGroup = this.itemTrigger.attr('data-do-target');

        this.idMasterGroup = this.itemTrigger.attr('data-do-group');

        console.log("??? ",this.itemTrigger.attr('data-do-target'))
        this.targetItem = $(this.itemTrigger.attr('data-do-target')) || this.itemTrigger;


        this._name = this.itemTrigger.attr('data-do-debug') || "new auto";

        this.isActive = false;

        this._isMaster = this.itemTrigger.attr('data-do-is-master') == "true" || false;
        this._isChildren = this.idMasterGroup != undefined;
        this._forceToggle = this.itemTrigger.attr('data-do-force') == "true" || false;

        this._actionType = [];
       
        if(this.itemTrigger.attr('data-do-on') == undefined){
            this._actionType = ['click'];
        }else{
            this._actionType = this.itemTrigger.attr('data-do-on').split(',');
        }

        
              

        this._actionType.forEach(function(pAction){
       
           this.on(pAction, function (e) {

                scope.managerInstance.onActionOnItem(scope);
        
            });
          

        },this.itemTrigger);



  

        this.managerInstance.addItem(scope);

        return this;

    }

    getItemTrigger(){
        return this.itemTrigger;
    }

    getTarget(){
        return this.target;
    }
    
    getIdGroup(){
        return this.idGroup;
    }



    getIdMasterGroup(){
        return this.idMasterGroup;
    }

    isMaster(){
        return this._isMaster;
    }

    isAlone(){
        return this.idGroup == undefined;
    }

    isForced(){
        return this._forceToggle;
    }

    isChildren(){
        return this._isChildren;
    }

    getState(){
        return this.isActive;
    }

    getLog(){
        return [
                {"name" : this._name},
                {"isChildren" : this._isChildren},
                {"isMaster" : this._isMaster},
                {"idMasterGroup" : this.idMasterGroup},
                {"idGroup" : this.idGroup},
                {"forced" : this._forceToggle}
               ]
    }


    toggle(pActive = true, pForce = false){
        
        this.isActive = !this.isActive;
        if(pForce){
            this.isActive = pActive;
        }

        console.log("[ToggleItem] toggle ", this._name ,this.isActive," forced : ",pForce);

        if(this.targetItem == this.itemTrigger){
            this.targetItem.toggleClass(this.targetToggleClass);
            return;
        }

        if(this.isActive){
            this.targetItem.addClass(this.targetToggleClass);
            this.itemTrigger.addClass(this.toggleClass);
            return;
        }

        this.targetItem.removeClass(this.targetToggleClass);
        this.itemTrigger.removeClass(this.toggleClass);

    }

}
