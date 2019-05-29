function groupSizeBars(size){
    
}

function endDay() {
    var end = confirm("End day?");
    if(end){
        var nextDay = parseInt(document.getElementById("day").innerHTML) +1;
        var upkeep = document.getElementById("groupsize").value;
        var food = document.getElementById("foodcount").value;
        var water = document.getElementById("watercount").value;

        var currentFood = food - upkeep;
        var currentWater = water - upkeep;

        if(currentFood < 0){
            currentFood = 0;
        }
        if(currentWater < 0){
            currentWater = 0;
        }

        document.getElementById("foodcount").value = currentFood; 
        document.getElementById("watercount").value = currentWater;
        document.getElementById("day").innerHTML = nextDay;
        createBars();
    }
}

function revertDay(){
    var revert = confirm("Revert day?");
    if(revert){
        var nextDay = parseInt(document.getElementById("day").innerHTML) -1;
        if(nextDay <1){
            alert("You cant't go back.");
        } else{
            var upkeep = parseInt(document.getElementById("groupsize").value);
            var food = parseInt(document.getElementById("foodcount").value);
            var water = parseInt(document.getElementById("watercount").value);

            var currentFood = food + upkeep;
            var currentWater = water + upkeep;

            document.getElementById("foodcount").value = currentFood; 
            document.getElementById("watercount").value = currentWater;
            document.getElementById("day").innerHTML = nextDay;
            createBars();
            saveData();
        }
    }
}

/*
function manualBarFill(thisBar){
    var val = thisBar.value;

    val = val + 25;
    if(val > 100){val = 0;}

    thisBar.value = val;
}
*/

function distributeSupplies(){
    distributeFood();
    distributeWater();
}




function distributeFood(){
    var upkeep = parseInt(document.getElementById("groupsize").value);
    var food = parseInt(document.getElementById("foodcount").value);
    var foodBars = document.getElementsByClassName("foodbar");
    var barValue;


    if(food < upkeep/2){
        for(var index = 0; index < upkeep; index++){
            if(index < 2*food){foodBars[index].value = 50;}
            else{foodBars[index].value = 0;}
        }       

    } else if(food < upkeep){
        for(var index = 0; index < upkeep; index++){
            if(index < 2*food-upkeep){foodBars[index].value = 100;}
            else{foodBars[index].value = 50;}
        }
    } else {
        barValue = 100;
        for(var index = 0; index < upkeep ; index++){
            foodBars[index].value = barValue;
        }
    }

}


function distributeWater(){
    var upkeep = parseInt(document.getElementById("groupsize").value);
    var food = parseInt(document.getElementById("watercount").value);
    var foodBars = document.getElementsByClassName("waterbar");


    if(food < upkeep/2){
        for(var index = 0; index < upkeep; index++){
            if(index < 2*food){foodBars[index].value = 50;}
            else{foodBars[index].value = 0;}
        }       

    } else if(food < upkeep){
        for(var index = 0; index < upkeep; index++){
            if(index < 2*food-upkeep){foodBars[index].value = 100;}
            else{foodBars[index].value = 50;}
        }
    } else {
        for(var index = 0; index < upkeep ; index++){
            foodBars[index].value = 100;
        }
    }

}

function createBars() {
    if(document.getElementById(localStorage.getItem("barID"))){
        var parent = document.getElementById("content");
        var child = document.getElementById(localStorage.getItem("barID"));
        //alert(document.getElementById(localStorage.getItem("barID")));
        parent.removeChild(child);
    }


    var para = document.createElement("div");
    para.id = "progessbarsDiv";
    var element = document.getElementById("content");
    element.appendChild(para);
    localStorage.setItem("barID", para.id);

    var groupsize = document.getElementById("groupsize").value;
    for(var index=0 ; index < groupsize ; index++){
        createCharacterDiv(para.id,"characterDiv"+index.toString(), index +1);
    }
}


function createCharacterDiv(parentID, myID, number){
    var para = document.createElement("div");
    para.id = myID;
    para.setAttribute("class","characterDiv");
    var element = document.getElementById(parentID);
    element.appendChild(para);

    createCharacterName(para.id, number);

    createFoodIcon(para.id);
    createFoodBar(para.id);
    createFoodIcon(para.id);

    createBreak(para.id);

    createWaterIcon(para.id);
    createWaterBar(para.id);
    createWaterIcon(para.id);
}

function createCharacterName(parentID, number){
    var para = document.createElement("p");
    var node = document.createTextNode("Character " + number.toString());
    para.appendChild(node);
    var element = document.getElementById(parentID);
    para.setAttribute("class","charName");
    element.appendChild(para);
}

function createBreak(parentID){
    var para = document.createElement("br");
    //para.id = "progessbarsDiv";
    var element = document.getElementById(parentID);
    element.appendChild(para);
}


function createFoodIcon(parentID){
    var para = document.createElement("img");
    //para.id = "progessbarsDiv";
    para.setAttribute("src","img/meat.png");
    para.setAttribute("class","foodpic");
    var element = document.getElementById(parentID);
    element.appendChild(para);
}


function createWaterIcon(parentID){
    var para = document.createElement("img");
    //para.id = "progessbarsDiv";
    para.setAttribute("src","img/water.png");
    para.setAttribute("class","waterpic");
    var element = document.getElementById(parentID);
    element.appendChild(para);
}


function createFoodBar(parentID){
    var para = document.createElement("progress");
    //para.id = "progessbarsDiv";
    var element = document.getElementById(parentID);
    element.appendChild(para);
    para.setAttribute("max","100");
    para.setAttribute("value","0");
    para.setAttribute("class","foodbar");
    para.setAttribute("onclick","manualBarFill(this)");
}


function createWaterBar(parentID){
    var para = document.createElement("progress");
    //para.id = "progessbarsDiv";
    var element = document.getElementById(parentID);
    element.appendChild(para);
    para.setAttribute("max","100");
    para.setAttribute("value","0");
    para.setAttribute("class","waterbar");
    para.setAttribute("onclick","manualBarFill(this)");
}


function saveData(){
    var currentDay = document.getElementById("day").innerHTML;
    var upkeep = document.getElementById("groupsize").value;
    var food = document.getElementById("foodcount").value;
    var water = document.getElementById("watercount").value;

    var saveArray = [currentDay, upkeep, food, water];
    localStorage.setItem("saveUpkeep", JSON.stringify(saveArray));
}


function loadUpkeepData(){
    if(JSON.parse(localStorage.getItem("saveUpkeep"))) {
        var storedUpkeep = JSON.parse(localStorage.getItem("saveUpkeep"));
        document.getElementById("day").innerHTML = storedUpkeep[0];
        document.getElementById("groupsize").value = storedUpkeep[1];
        document.getElementById("foodcount").value = storedUpkeep[2]; 
        document.getElementById("watercount").value = storedUpkeep[3];
    }
    createBars();
}


function resetData(){
    var r = confirm("Reset tracker?");
    if(r){
        localStorage.removeItem("saveUpkeep");
        document.getElementById("day").innerHTML = 1;
        document.getElementById("groupsize").value = 0;
        document.getElementById("foodcount").value = 0; 
        document.getElementById("watercount").value = 0;
        createBars();
    }
}