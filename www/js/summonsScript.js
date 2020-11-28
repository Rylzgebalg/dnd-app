
/*
function Creature(creatureName, lifePoints,  numberOfAttacks, damageDice ,numberOfDamageDice, hitModifier, damageModifier) {
  this.name = creatureName;
  this.hp = lifePoints;
  this.attacks = numberOfAttacks;
  this.dd = damageDice; //array
  this.nodd = numberOfDamageDice; //array
  this.hitMod = hitModifier;
  this.dmgMod = damageModifier;
}

*/
//var wolf = new Creature(20, 12, 13);
/*
function monster() {
  var creature = chooseCreature();
  alert(creature.name);
}

function chooseCreature2(creatureType){
  switch(creatureType){
    case "Wolf":
      return new Creature("Wolf",11, 1, [4], [2], 4,[2]);
      break;
      case "Wolf Spider":
        return new Creature("Wolf Spider", 11, 2, [6,6], [2,1],3, [1,0]);
        break;
        case "Dragon":
          return new Creature("Dragon", 198, 3, [120,3,3], [2,2,2],3, [8,1,2]);
          break;
        }
      }
      */
var i =1;
var trigger = true;


function chooseCreature(creatureType){
  var index;
  var creatureData = JSON.parse(data); 
  //alert("Länge der JSON ist"+creatureData.length);
  //alert(creatureData[2].name);
  for(index = 0; index < creatureData.length; index++){
    //alert("Im Select ist "+creatureType);
    //alert("Index ist "+index);
    //alert(creatureData[index].name);
    if(creatureData[index].name == creatureType){
      return creatureData[index];
    }
  }
  return 0;
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
  createHTML("button", thisID,["type","button", "onclick", "deleteThisBlock(this.parentNode.id)"], "Delete");

  for(var index = 1; index <= quantity ; index++){
    createCreatureDiv(thisID, index.toString(), creature, creatureType);
  }

  i++;

}


//Block für individuelle Kreatur
function createCreatureDiv(parentID, number, creature, creatureType){
  var thisID = parentID+"_"+number;
  var IDhp = thisID+'_HP';
  createHTML("div", parentID, ["id",thisID]); //div für eine Kreatur
  createHTML("span", thisID, ["id","Attack_"+parentID+"_Name"], creature.name+" "+number); //Namesfeld der i-ten Kreatur
  createHTML("button", thisID, ["type", "button","id", thisID+"_H", "onclick", "changeInputPM(this.id + 'P', '-', 1)"],"-");
  createHTML("input", thisID, ["type", "number", "value", creature.hp, "max", creature.hp, "id",thisID+"_HP"]); //HP-Feld
  createHTML("button", thisID, ["type", "button","id", thisID+"_", "onclick", "changeInputPM(this.id + 'HP', '+', 1)"],"+");
  createHTML("table", thisID, ["id",thisID+"_Table"]);// <table>
  createTableHeaderTR(thisID+"_Table", creatureType, number);//Tabelle füllen
}


//Erstellt <tr>-Teil der Tabelle
function createTableHeaderTR(parentID,creatureType, number){
  for(var index = 0; index < 2 ; index++){
    var para = document.createElement("tr");
    var element = document.getElementById(parentID);
    para.setAttribute("id",parentID+"_Header"+index.toString());
    element.appendChild(para);
    if(trigger) {
      createTableHeaderTH(para.id, creatureType);
      trigger = false;
    } else {
      createAttackRollRow(para.id, creatureType, number);
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
      var node = document.createTextNode("Attack Roll "+(index+1).toString());
    }
    //para.setAttribute("class","lul");  
    para.appendChild(node);
  }
}

function createAttackRollRow(parentID, creatureType, number){
  var numberOfColumns = chooseCreature(creatureType);
  //var element;
  for(var index = 0; index < 1+numberOfColumns.attacks ; index++){
    var para = document.createElement("td");
    var element = document.getElementById(parentID);
    element.appendChild(para);

    if(index == numberOfColumns.attacks) {
      para.setAttribute("class","TotalDamage"+i.toString());  
      para.setAttribute("id", "AttackRoll"+i.toString() +"_" + number.toString()+"_totalDamage");
    }else {
      para.setAttribute("class", "AttackRoll"+i.toString() +"_" + number.toString()+"_class, " + "AttackRoll"+i.toString() );
      para.setAttribute("id", "AttackRoll"+i.toString() +"_" + number.toString() + "_" + index.toString() );
      para.setAttribute("onclick", "tapToHit(this.id)");
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

function damageRoll(creature, k) {
  var roll = creature.dmgMod[k];
  for(var index = 0; index < creature.nodd[k]; index++ ){
    roll = roll + randomIntFromInterval(1, creature.dd[k]);
  }

  localStorage.setItem("damageDoneWithoutCrit", roll) //wird für die crit-funktion eingespeicher
  return roll;
}

//Normaler Schaden wird um Crit-Schaden erweitert
function damageRollCrit(creature, k, myID) {
  var roll = 0;
  var noCrit = parseInt(localStorage.getItem("damageDoneWithoutCrit"));
  for(var index = 0; index < creature.nodd[k]; index++ ){
    roll = roll + randomIntFromInterval(1, creature.dd[k]);
  }
  var totalDamage = roll + noCrit;
  return totalDamage;
}

function allCreaturesAttack(myID, divID){
  //alert(divID);
//das noch ändern für 2stellige zahlen
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
  displayDamage(boardNumber, creature);
  
  var attacks = document.querySelectorAll(".AttackRoll"+ boardNumber.toString());
  for(index = 0; index < attacks.length ; index++){
    attacks[index].style.backgroundColor ="#F5F5DC";
    attacks[index].style.color ="#58180d";
  }
  var totalDamages = document.querySelectorAll(".TotalDamage"+ boardNumber.toString());
  for(index = 0; index < totalDamages.length ; index++){
    totalDamages[index].innerHTML =0;
  }
}

/* schaden in total Damage
function displayDamage(boardNumber, creature){
  var cells = document.getElementsByClassName("TotalDamage"+boardNumber);
  var roll = [];
  for(var index = 0; index < cells.length ; index++){
    for(var innerIndex = 0; innerIndex < creature.attacks ; innerIndex++){
      roll[innerIndex] = damageRoll(creature, innerIndex);
      
    }
    //alert(roll);
    cells[index].innerHTML = roll;
  }
}*/

// Schaden unter Würfen
function displayDamage(boardNumber, creature){
  var cells = document.getElementsByClassName("AttackRoll"+boardNumber);
  var roll = [];
  var noOfCreatures = cells.length/creature.attacks;
  var k = 0;
  //alert(noOfCreatures);
  for(var index = 0; index < cells.length ; index++){
    //for(var innerIndex = 0; innerIndex < creature.attacks ; innerIndex++){
      //roll[innerIndex] = damageRoll(creature, innerIndex);
      
    //}

    //alert(cells[index].id);
    createHTML("br", cells[index].id,[]);
    //cells[index].innerHTML = roll;
    if(k == creature.attacks){ k = 0;}
    createHTML("span", cells[index].id,["id", cells[index].id+"_spanNormal", "class", "damageSpans"], damageRoll(creature, k));
    //createHTML("br", cells[index].id, []);
    createHTML("span", cells[index].id,["id", cells[index].id+"_span", "class", "damageSpans, critSpans"], damageRollCrit(creature, k, (cells[index].id+"_span")));
    
    k++;

  }
}

function deleteThisBlock(parentID){
  var r = confirm("Delete this?")
  if (r){
    var parent = document.getElementById("content");
    var child = document.getElementById(parentID);
    
    //parentID.substring(parentID.length-1, parentID.length);
    //alert(number);
    parent.removeChild(child);
  }
}


function tapToHit(tapped){
  if(document.getElementById(tapped).style.backgroundColor =="orange"){
    document.getElementById(tapped).style.backgroundColor ="#F5F5DC";
    document.getElementById(tapped).style.color ="#58180d";
    document.getElementById(tapped+"_spanNormal").style.display ="inline";
    document.getElementById(tapped+"_span").style.display ="none";
  }else if(document.getElementById(tapped).style.backgroundColor !="green"){
    document.getElementById(tapped).style.backgroundColor ="green";
    document.getElementById(tapped).style.color ="white";
  }else if(document.getElementById(tapped).style.backgroundColor !="orange") { 
    document.getElementById(tapped).style.backgroundColor ="orange";
    document.getElementById(tapped).style.color ="white";
    document.getElementById(tapped+"_spanNormal").style.display ="none";
    document.getElementById(tapped+"_span").style.display ="inline";
  }  
  updateTotalDamage(tapped)
}

function updateTotalDamage(tapped){
  attackClass = tapped.substring(0, findUnderscore(tapped, 1))+"_class";

  overallClass = tapped.substring(0, findUnderscore(tapped, 2));

  totDamID = tapped.substring(0, findUnderscore(tapped, 1))+"_totalDamage";

  indivAtt = document.getElementsByClassName(attackClass+", " + overallClass);

  totalDamage = 0;
  for(index = 0; index < indivAtt.length; index++){
    colorValue = getColorValue(indivAtt[index]);
    totalDamage = totalDamage + colorValue;
  }
  
  document.getElementById(totDamID).innerHTML = totalDamage;
}

function getColorValue(attackBox) {
  if (attackBox.style.backgroundColor == "green"){
    return parseInt(document.getElementById(attackBox.id+"_spanNormal").innerHTML);
  } else if(attackBox.style.backgroundColor == "orange"){
    return parseInt(document.getElementById(attackBox.id+"_span").innerHTML)
  } else {
    return 0;
  }
}

//Findet _ und gibt die Stelle aus. Untersucht string von hinten. place ist der place-vielte _
function findUnderscore(string, place){
  x = place;
  for(index = 1; index < string.length; index++){
    if(string[string.length - index] =="_" &  x ==1){
      return string.length - index;
    } else if(string[string.length - index] =="_" ){
      x = x-1;
    }
  }
}