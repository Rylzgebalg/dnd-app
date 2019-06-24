function createMenuOnStart(){
    createHTML("a","navigation", ["id","leftIcon"]);
    createHTML("img", "leftIcon",["id", "flipThis", "class", "navButtons", "src", "img/arrowright.png", "onclick", "changeMenu()"]);


    createHTML("a","navigation",["id","diceLink", "href","dice.html","class","row1"]);
    createHTML("img", "diceLink", ["class", "navButtons", "src", "img/dice.png"]);
    
    createHTML("a","navigation",["id", "wmLink", "href","wildmagic.html","class","row1"]);
    createHTML("img", "wmLink", ["class", "navButtons", "src", "img/wildm.png"]);
    
    createHTML("a","navigation",["id", "slotsLink", "href","spellslots.html","class","row1"]);
    createHTML("img", "slotsLink", ["class", "navButtons", "src", "img/spellslots.png"]);

    createHTML("a","navigation",["id", "conLink", "href","consumables.html","class","row2"]);
    createHTML("img", "conLink", ["class", "navButtons", "src", "img/cons.png"]);

    createHTML("a","navigation",["id", "upkLink", "href","upkeep.html","class","row2"]);
    createHTML("img", "upkLink", ["class", "navButtons", "src", "img/spellslots.png"]);

    createHTML("a","navigation",["id", "sumLink", "href","index.html","class","row2"]);
    createHTML("img", "sumLink", ["class", "navButtons", "src", "img/nocross.png"]);


    createHTML("a","navigation", ["id","rightIcon"]);
    createHTML("img", "rightIcon",["class", "navButtons", "src", "img/arrowright.png", "onclick", "changeMenu()"]);


}