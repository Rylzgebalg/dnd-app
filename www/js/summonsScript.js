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
  var para = document.createElement("div");
  var node = document.createTextNode("Summoned "+ creature.name+"(s)");
  var element = document.getElementById("content");
  para.setAttribute("id",creature.name+i.toString());
  para.appendChild(node);
  element.appendChild(para);

  createAttackButton(para.id);


  for(var index = 1; index <= quantity ; index++){
  createCreatureDiv(para.id, index.toString(), creature, creatureType);
  }

  i++;

}

//Block für individuelle Kreatur
function createCreatureDiv(parentID, number, creature, creatureType){
  var para = document.createElement("div");
  var element = document.getElementById(parentID);
  para.setAttribute("id",parentID+"_"+number);
  element.appendChild(para);

  createCreatureName(para.id, number, creature.name, parentID);
  createCreatureHP(para.id, creature.hp);
  createAttackTable(para.id, creatureType);
}

//Kreaturennamen durchnummeriert
function createCreatureName(parentID, number, creatureName, boardID){
  var para = document.createElement("span");
  var node = document.createTextNode(creatureName+" "+number);
  var element = document.getElementById(parentID);
  para.setAttribute("id","Attack_"+boardID+"_Name");
  para.appendChild(node);
  element.appendChild(para);
}

//Input-Feld mit HP, änderbar
function createCreatureHP(parentID, creatureHP){
  var para = document.createElement("input");
  var element = document.getElementById(parentID);
  para.setAttribute("type", "number");
  para.setAttribute("value", creatureHP);
  para.setAttribute("id",parentID+"_HP");
  element.appendChild(para);
  
}

//Lässt alle Kreaturen in einem Block angreifen
function createAttackButton(parentID) {
  var para = document.createElement("button");
  var node = document.createTextNode("Attack");
  para.appendChild(node);
  var element = document.getElementById(parentID);
  para.setAttribute("onclick","allCreaturesAttack(this.id, this.parentNode.id)");
  para.setAttribute("id", "Attack_" + parentID);
  element.appendChild(para);
}

//Tabelle für Attack Rolls, Damage Rolls
function createAttackTable(parentID, creatureType){
  var para = document.createElement("table");
  var element = document.getElementById(parentID);
  para.setAttribute("id",parentID+"_Table");
  element.appendChild(para);
  createTableHeaderTR(para.id, creatureType);
  
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
//Button muss wissen, auf welche creature er sich beziehen muss

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

function aaa(){
  //for 
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


