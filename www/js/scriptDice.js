var i;
//var ruleCheck =1;


//Hinweise anzeigen und verschwinden lassen
/*
function rules(){
  if (ruleCheck>0){
    document.getElementById("ruleBlock").style.visibility = "visible";
    document.getElementById("ruleSet").style.borderLeft = "1px grey solid";
    document.getElementById("ruleButton").innerHTML = "- Hinweise";
    ruleCheck *= -1;
  }else{
    document.getElementById("ruleBlock").style.visibility = "hidden";
    document.getElementById("ruleSet").style.border = "1px white solid";
    document.getElementById("ruleButton").innerHTML = "+ Hinweise";
    ruleCheck *= -1;

  }
}
*/
//Würfeln

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
function rollDice(){
 var sides = setSides();
 var count = setCount();
 var mod = parseInt(document.getElementById("modifier").value);
 if(sides && count ){
   var dice=0;
   var numbers = [];
   var throww=0;
   for(i=1; i<= count; i++){
     throww = mod + randomIntFromInterval(1,parseInt(sides));
     dice = dice + throww;
     numbers.push(throww);
   }
   document.getElementById("diceAdded").style.display = "block";
   document.getElementById("ho").innerHTML = dice;
   if (numbers.length <= 50){
     document.getElementById("allNumbers").style.display = "inline";
     document.getElementById("he").innerHTML = numbers;
   }else{
     document.getElementById("allNumbers").style.display = "none";
   }
 }
}

function setSides(){
  return parseInt(document.getElementById("sides").value);
}

function setCount(){
  return parseInt(document.getElementById("count").value);
}


function changeSides(numOfSides){
  sides = numOfSides.substring(1, numOfSides.length);
  
  var changeBy = parseInt(sides);
  document.getElementById("sides").value = changeBy;
}

function changeModifier(myId){
  var current = document.getElementById("modifier").value;
  var changeBy = document.getElementById(myId).innerHTML;
  if( changeBy =="+"){
    document.getElementById("modifier").value = current *1 + 1;
  } else {
    document.getElementById("modifier").value = current *1 - 1;
  }
}
