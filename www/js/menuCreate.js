function createMenuOnStart(){
    createHTML("a","navigation", ["id","leftIcon"]);
    createHTML("img", "leftIcon",["id", "flipThis", "class", "navButtons", "src", "img/arrowright.png", "onclick", "changeMenu()"]);




    createHTML("a","navigation",["id","diceLink", "href","dice.html","class","navRow"]);
    createHTML("img", "diceLink", ["class", "navButtons", "src", "img/dice.png"]);
    
    createHTML("a","navigation",["id", "wmLink", "href","wildmagic.html","class","navRow"]);
    createHTML("img", "wmLink", ["class", "navButtons", "src", "img/wildm.png"]);
    
    createHTML("a","navigation",["id", "slotsLink", "href","spellslots.html","class","navRow"]);
    createHTML("img", "slotsLink", ["class", "navButtons", "src", "img/spellslots.png"]);




    createHTML("a","navigation",["id", "conLink", "href","itemBags.html","class","navRow"]);
    createHTML("img", "conLink", ["class", "navButtons", "src", "img/cons.png"]);

    createHTML("a","navigation",["id", "upkLink", "href","upkeep.html","class","navRow"]);
    createHTML("img", "upkLink", ["class", "navButtons", "src", "img/flesh.png"]);

    createHTML("a","navigation",["id", "sumLink", "href","summons.html","class","navRow"]);
    createHTML("img", "sumLink", ["class", "navButtons", "src", "img/wolf.png"]);




    createHTML("a","navigation",["id", "blankLink1", "href","index.html","class","navRow"]);
    createHTML("img", "blankLink1", ["class", "navButtons", "src", "img/switch.png"]);

    createHTML("a","navigation",["id", "blankLink2", "href","index.html","class","navRow"]);
    createHTML("img", "blankLink2", ["class", "navButtons", "src", "img/nocross.png"]);

    createHTML("a","navigation",["id", "blankLink3", "href","index.html","class","navRow"]);
    createHTML("img", "blankLink3", ["class", "navButtons", "src", "img/nocross.png"]);





    createHTML("a","navigation", ["id","rightIcon"]);
    createHTML("img", "rightIcon",["class", "navButtons", "src", "img/arrowright.png", "onclick", "changeMenu()"]);


}