var j = 1;

//Lädt Items mit Namen und Anzahl
function bohLoadOnStart(){
  if(localStorage.getItem("lest")){
    var itemList = JSON.parse(localStorage.getItem("lest"));
    for(var index = 0; index<itemList.length ;index = index+3 ){
      itemList[index] = j;
      bohCreateItemDiv(itemList[index+1], itemList[index+2]);
    }
    localStorage.setItem("lest", JSON.stringify(itemList));
  }
}

//Div-Block für alle anderen Komponenten
function bohCreateItemDiv(itemName, itemCount) {
  var thisId = "etem" + j.toString();
  //Elemente werden im Dokument erzeugt
  createHTML("div", "content2", ["id", thisId]) //Rahmen
  createHTML("span", thisId, [], itemName); //Name
  createHTML("button", thisId, ["onclick","bohChangeCount(this.id)", "id", "-" + thisId], "-"); // - Knopf
  createHTML("input", thisId, ["type", "number", "value", itemCount, "id", "count"+thisId, "onchange", "bohChangeCountOnchange(this.id)"]); // Anzahl
  createHTML("button", thisId, ["onclick","bohChangeCount(this.id)", "id", "+" + thisId], "+"); // + Knopf
  createHTML("img", thisId, ["src", "img/nocross.png", "onclick","bohDeleteThisBlock(this.parentNode.id)"]); // Löschen-Knopf
  j++; 
}

//Erstellt Gerüst, Reihenfolge der Funktionen ändern für andere Reihenfolge der Elemente
function bohCreateBlock(){
  if(localStorage.getItem("lest")){
    itemList = JSON.parse(localStorage.getItem("lest"));
    //alert(itemList);
  } else {
    itemList = [];
  }
  var namePrompt = prompt("Input name:");
  var countPrompt = setNumber();
  bohCreateItemDiv(namePrompt, countPrompt);
  itemList.push(j-1);
  itemList.push(namePrompt);
  itemList.push(countPrompt);
  localStorage.setItem("lest", JSON.stringify(itemList));
}

//Eingabe der Itemanzahl
function setNumber(){
  for(;;){
    var count = prompt("Input quantity:");
    if(parseInt(count) > 0){
      return count;
    }
  }
}


//Ändere und speicher Anzahl bei Betätigen der Knöpfe
function bohChangeCount(id){
  var operation = id.substring(0,1);
  var inputID = "count" + id.substring(1,id.length);
  var currentCount = document.getElementById(inputID).value;
  currentCount = eval(currentCount + operation + "1");
  document.getElementById(inputID).value = currentCount;

  var itemList = JSON.parse(localStorage.getItem("lest"));
  var saveTo = id.substring(id.length-1, id.length);
  //alert(saveTo);
  for(var index = 0; index < itemList.length ; index = index + 3 ){
    if(itemList[index] == saveTo){
      itemList[index+2] = currentCount;
    }

  }
  localStorage.setItem("lest", JSON.stringify(itemList));
}

//Speichert bei Eingabe ins Feld mit Tastatur
function bohChangeCountOnchange(id) {
  var currentCount = document.getElementById(id).value;
  var itemList = JSON.parse(localStorage.getItem("lest"));
  var saveTo = bohGetNumberToDelete(id);
  for(var index = 0; index < itemList.length ; index = index + 3 ){
    if(itemList[index] == saveTo){
      itemList[index+2] = currentCount;
    }
  }
  localStorage.setItem("lest", JSON.stringify(itemList));
}

//Löscht ein Consumable
function bohDeleteThisBlock(parentID){
  var r = confirm("Delete this?")
  if (r){
    var parent = document.getElementById("content2");
    var child = document.getElementById(parentID);
    var number = bohGetNumberToDelete(parentID);
    parent.removeChild(child);

    var itemList = JSON.parse(localStorage.getItem("lest"));
    for(var index = 0; index < itemList.length ; index = index + 3){
      if(itemList[index] == number){
        //Hier aus dem Array löschen
        itemList.splice(index, 3);
      }
    }
    localStorage.setItem("lest", JSON.stringify(itemList));
  }
}

function bohGetNumberToDelete(delID){

  var startIndex = delID.indexOf("m");
  return delID.substring(startIndex +1, delID.length);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Funktionen für das Gold

function bohSaveGoldInventory(){
  var wallet = [];
  wallet[0] = document.getElementById("coppBoh").value;
  wallet[1] = document.getElementById("silvBoh").value;
  wallet[2] = document.getElementById("goldBoh").value;
  wallet[3] = document.getElementById("platBoh").value;

  localStorage.setItem("walletBoh", JSON.stringify(wallet));
}

function bohLoadGoldInventory(){
  if(localStorage.getItem("walletBoh")){
    var wallet = JSON.parse(localStorage.getItem("walletBoh"));
    document.getElementById("coppBoh").value = wallet[0];
    document.getElementById("silvBoh").value = wallet[1];
    document.getElementById("goldBoh").value = wallet[2];
    document.getElementById("platBoh").value = wallet[3];
  }
}
