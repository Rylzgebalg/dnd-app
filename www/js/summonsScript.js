function Creature(creatureName, lifePoints,  numberOfAttacks, damageDice ,numberOfDamageDice, hitModifier, damageModifier) {
  this.name = creatureName;
  this.hp = lifePoints;
  this.attacks = numberOfAttacks;
  this.dd = damageDice;
  this.nodd = numberOfDamageDice;
  this.hitMod = hitModifier;
  this.dmgMod = damageModifier;
}

//var wolf = new Creature(20, 12, 13);
var i =1;
var trigger = true;

function monster() {
  var creature = chooseCreature();
  alert(creature.name);
}

function chooseCreature(creatureType){
  switch(creatureType){
    case "Wolf":
    return new Creature("Wolf",11, 1, 4, 2, 4);
    break;
    case "Dragon":
    return new Creature("Dragon", 198, 3, 12, 9,3);
    break;
  }
}

/*********************************************************************************************************************************************************************** */
//Aussehen
//Div-Block der mehrere divs einzelner Monster hält
function createCreatureBoard() {
  var creatureType = document.getElementById("creatureInput").value;
  var creature = chooseCreature(creatureType);
  var quantity = document.getElementById("creatureQuantity").value;

  var thisID = creature.name+i.toString();
  createHTML("div", "content", ["id", thisID], "Summoned "+ creature.name+"(s)"); //div für alle anderen komponenten
  createHTML("button", thisID , ["id", "Attack_" + thisID, "onclick","allCreaturesAttack(this.id, this.parentNode.id)"], "Attack"); //Angriffsknopf


  for(var index = 1; index <= quantity ; index++){
    createCreatureDiv(thisID, index.toString(), creature, creatureType);
  }

  i++;

}


//Block für individuelle Kreatur
function createCreatureDiv(parentID, number, creature, creatureType){
  var thisID = parentID+"_"+number;
  createHTML("div", parentID, ["id",thisID]); //div für eine Kreatur
  createHTML("span", thisID, ["id","Attack_"+parentID+"_Name"], creature.name+" "+number); //Namesfeld der i-ten Kreatur
  createHTML("input", thisID, ["type", "number", "value", creature.hp, "max", creature.hp, "id",thisID+"_HP"]); //HP-Feld
  createHTML("table", thisID, ["id",thisID+"_Table"]);// <table>
  createTableHeaderTR(thisID+"_Table", creatureType);//Tabelle füllen
}


//Erstellt <tr>-Teil der Tabelle
function createTableHeaderTR(parentID,creatureType){
  for(var index = 0; index < 2 ; index++){
    var para = document.createElement("tr");
    var element = document.getElementById(parentID);
    para.setAttribute("id",parentID+"_Header"+index.toString());
    element.appendChild(para);
    if(trigger) {
      createTableHeaderTH(para.id, creatureType);
      trigger = false;
    } else {
      createAttackRollRow(para.id, creatureType);
      trigger = true;
    }
  }
}

//Headerzeile für Angriffstabelle einer Kreatur
function createTableHeaderTH(parentID, creatureType){
  var numberOfColumns = chooseCreature(creatureType);
  //var element;
  for(var index = 0; index < 1+numberOfColumns.attacks ; index++){
    var para = document.createElement("th");
    var element = document.getElementById(parentID);
    element.appendChild(para);

    if(index == numberOfColumns.attacks){
      var node = document.createTextNode("Total Damage");
    }else {
      var node = document.createTextNode("Attack Roll "+(index+1).toString() );
    }
    //para.setAttribute("class","lul");  
    para.appendChild(node);
  }
}

function createAttackRollRow(parentID, creatureType){
  var numberOfColumns = chooseCreature(creatureType);
  //var element;
  for(var index = 0; index < 1+numberOfColumns.attacks ; index++){
    var para = document.createElement("td");
    var element = document.getElementById(parentID);
    element.appendChild(para);

    if(index == numberOfColumns.attacks) {
      para.setAttribute("class","TotalDamage"+i.toString());  
    }else {
      para.setAttribute("class","AttackRoll"+i.toString());
    }
    //para.appendChild(node);
  }
}

/******************************************************************************************************************************************************** */
//Funktionen

function randomIntFromInterval(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function attackRoll(creature) {
  var roll = randomIntFromInterval(1, 20)+ creature.hitMod;
  if(roll ===20+creature.hitMod){
    return "Crit!";
  } else {
    return roll;
  }
}

function allCreaturesAttack(myID, divID){

  //alert(divID);

  var boardNumber = myID.substring(myID.length - 1, myID.length);
  var cells = document.getElementsByClassName("AttackRoll"+boardNumber);
  
  var creatureType = divID.substring(0, divID.length -1);
  var creature = chooseCreature(creatureType);
  //alert(creature.name);
  
  var roll = [];
  for(var index = 0; index < cells.length ; index++){
    roll[0] = attackRoll(creature);
    roll[1] = attackRoll(creature);
    cells[index].innerHTML = roll;
  }
}


