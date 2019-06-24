var okSource;
var i;
var j;

//Variable zum Vergleich bei Entscheidung zur Änderung
function setSource(){
  okSource = document.getElementById("fcl1s1").src;
  showSlots();

}

//Speichert Level und Sources der einzelnen Slots
function saveMySlots(){
  var y = document.getElementsByClassName("slot");
  var saveLevel = document.getElementById("sides").value;
  var saveTable = document.getElementById("select").selectedIndex;
  for(i = 0; i < y.length ; i++){
    localStorage.setItem("slot".concat(i.toString()), y[i].src);
    localStorage.setItem("color".concat(i.toString()), y[i].style.backgroundColor);
  }
  localStorage.setItem("level", saveLevel);
  localStorage.setItem("table", saveTable);

}
//Lädt alle Slots und Level
function loadMySlots(){
  var yy = document.getElementsByClassName("slot");
  for(i = 0; i < yy.length ; i++){
    yy[i].src = localStorage.getItem("slot".concat(i.toString()));
    yy[i].style.backgroundColor = localStorage.getItem("color".concat(i.toString()));
  }
  document.getElementById("sides").value = localStorage.getItem("level");
  document.getElementById("select").selectedIndex = localStorage.getItem("table");
  showSlots();
  var tableVal = document.getElementById("select").value;
  showWhichTable(tableVal);
}

//Bestimmt Level der Slots des Warlocks
function setWarlockSlotLevel() {
  var slotLevel = 5;
  var level = parseFloat(document.getElementById("sides").value);
  level = Math.ceil(level/2);
  if(level > 5){level = 5;}
  document.getElementById("wlSlotLevel").innerHTML = level;
}

//Für Dropdown. Bestimmt welche Tabelle angezeigt werden soll
function showWhichTable(a) {
  var tables = document.getElementsByClassName("slotTable");
  for(i=0; i < tables.length; i++){
    tables[i].style.display = "none";
  }
  document.getElementById(a).style.display = "block";
}

//Bei Klick auf Slot. Vergleich mit der Source des unverbrauchten Slots
function changeSlot(myId) {
  var source = document.getElementById(myId).src;
  if(source == okSource){
    document.getElementById(myId).src = "img/nocross.png";
    document.getElementById(myId).style.backgroundColor ="red";
  }else{
    document.getElementById(myId).src = "img/okcircle.png";
    document.getElementById(myId).style.backgroundColor ="green";
  }
  saveMySlots();
}

//Alle Slots verstecken, damit anhand des Levels anzuzeigende Slots
//ausgewählt werden können
function hideAllSlots(){
  var y = document.getElementsByClassName("slot");
  for(i=0; i < y.length; i++){
    y[i].style.visibility = "hidden";
  }
}

//Wählt mit Level zu zeigende Slots aus
function showSlots(){
  hideAllSlots();
  var level = document.getElementById("sides").value;
  //alert(level);
  for( j= 1 ; j<=level; j++){
    var x = document.getElementsByClassName(j.toString());
    for( i = 0 ; i < x.length ; i++){
      x[i].style.visibility = "visible";
    }
  }
}

//Verhindert, dass mit + Knopf eine Zahl größer 20 eingegeben wird
function checkTwenty(){
  var testVar = document.getElementById("sides").value;
  if(testVar > 20){
    document.getElementById("sides").value = 20;
  }
}


/*
//Diese drei Funktionen setzen nur die ausgewählte Tabelle zurück
function setStop(a, type){
  switch(type){
    case "fc":
      if(a==1){return 5;}
      else if(a>1 && a<6){return 4;}
      else if(a>5 && a<8){return 3;}
      else {return 2;}
      break;
    case "wl":
      if(a>1){return 2;}
      return 5;
      break;
    case "hc":
      if(a==1){return 5;}
      else if(a>1 && a<5){return 4;}
      else {return 3;}
      break;
    case "sc":
      if(a==1){return 5;}
      else if(a>1 && a<4){return 4;}
      else {return 2;}
      break;
  }
}

function setI(t){
  switch(t){
    case "fc":
      return 10;
      break;
    case "sc":
      return 5;
      break;
    default:
      return 6;
  }
}

function longRest(){
  var id;
  var type = document.getElementById('select').value
  for( i = 1 ; i < setI(type) ; i++ ){
    for( j = 1 ; j < setStop(i, type) ; j++ ){
      id = type.concat("l", i.toString(),"s",j.toString());
      document.getElementById(id).src ="img/okcircle.png";
      document.getElementById(id).style.backgroundColor ="green";
    }
  }
}
*/
function longRest(){
  var prompt= confirm("Long rest?");
  if(prompt){
    var z = document.getElementsByClassName("slot");
    for(i = 0; i < z.length ; i++){
      z[i].src ="img/okcircle.png";
      z[i].style.backgroundColor ="green";
    }
  }
}


function firstStart(){
  if(!(localStorage.getItem("start"))){
    saveMySlots();
    localStorage.setItem("start", "ok");
    document.getElementById("sides").value=1;
    document.getElementById("select").selectedIndex = "0";
  }
  setSource();
  loadMySlots();
  setWarlockSlotLevel();
}
