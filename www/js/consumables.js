var i = 1;

//Lädt Items mit Namen und Anzahl
function loadOnStart(){
  if(localStorage.getItem("list")){
    var itemList = JSON.parse(localStorage.getItem("list"));
    for(var j = 0; j<itemList.length ;j = j+3 ){
      itemList[j] = i;
      createItemDiv(itemList[j+1], itemList[j+2]);
    }
    localStorage.setItem("list", JSON.stringify(itemList));
  }
}

//Div-Block für alle anderen Komponenten
function createItemDiv(itemName, itemCount) {
  var thisId = "item" + i.toString();
  //Elemente werden im Dokument erzeugt
  createHTML("div", "content", ["id", thisId]) //Rahmen
  createHTML("span", thisId, [], itemName); //Name
  createHTML("button", thisId, ["onclick","changeCount(this.id)", "id", "-" + thisId], "-"); // - Knopf
  createHTML("input", thisId, ["type", "number", "value", itemCount, "id", "count"+thisId , "onchange", "changeCountOnchange(this.id)"]); // Anzahl
  createHTML("button", thisId, ["onclick","changeCount(this.id)", "id", "+" + thisId], "+"); // + Knopf
  createHTML("img", thisId, ["src", "img/nocross.png", "onclick","deleteThisBlock(this.parentNode.id)"]); // Löschen-Knopf
  i++; 
}

//Erstellt Gerüst, Reihenfolge der Funktionen ändern für andere Reihenfolge der Elemente
function createBlock(){
  if(localStorage.getItem("list")){
    itemList = JSON.parse(localStorage.getItem("list"));
    //alert(itemList);
  } else {
    itemList = [];
  }
  var namePrompt = prompt("Input name:");
  var countPrompt = setNumber();
  createItemDiv(namePrompt, countPrompt);
  itemList.push(i-1);
  itemList.push(namePrompt);
  itemList.push(countPrompt);
  localStorage.setItem("list", JSON.stringify(itemList));
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
function changeCount(id){
  var operation = id.substring(0,1);
  var inputID = "count" + id.substring(1,id.length);
  var currentCount = document.getElementById(inputID).value;
  currentCount = eval(currentCount + operation + "1");
  document.getElementById(inputID).value = currentCount;

  var itemList = JSON.parse(localStorage.getItem("list"));
  var saveTo = getNumberOfBlock(id);
  //alert(saveTo);
  for(var index = 0; index < itemList.length ; index = index + 3 ){
    if(itemList[index] == saveTo){
      itemList[index+2] = currentCount;
    }

  }
  localStorage.setItem("list", JSON.stringify(itemList));
}

//Speichert bei Eingabe ins Feld mit Tastatur
function changeCountOnchange(id) {
  var currentCount = document.getElementById(id).value;
  var itemList = JSON.parse(localStorage.getItem("list"));
  var saveTo = getNumberOfBlock(id);
  for(var index = 0; index < itemList.length ; index = index + 3 ){
    if(itemList[index] == saveTo){
      itemList[index+2] = currentCount;
    }
  }
  localStorage.setItem("list", JSON.stringify(itemList));
}

//Löscht ein Consumable
function deleteThisBlock(parentID){
  var r = confirm("Delete this?")
  if (r){
    var parent = document.getElementById("content");
    var child = document.getElementById(parentID);
    var number = getNumberOfBlock(parentID);
    //parentID.substring(parentID.length-1, parentID.length);
    //alert(number);
    parent.removeChild(child);

    var itemList = JSON.parse(localStorage.getItem("list"));
    for(var index = 0; index < itemList.length ; index = index + 3){
      if(itemList[index] == number){
        //Hier aus dem Array löschen
        itemList.splice(index, 3);
      }
    }
    localStorage.setItem("list", JSON.stringify(itemList));
  }
}

//Damit können auch mehrstellige Zahlen gefunden werden
function getNumberOfBlock(delID){

  var startIndex = delID.indexOf("m");
  return delID.substring(startIndex +1, delID.length);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Funktionen für das Gold

function saveGoldInventory(){
  var wallet = [];
  wallet[0] = document.getElementById("coppInv").value;
  wallet[1] = document.getElementById("silvInv").value;
  wallet[2] = document.getElementById("goldInv").value;
  wallet[3] = document.getElementById("platInv").value;

  localStorage.setItem("walletInv", JSON.stringify(wallet));
}

function loadGoldInventory(){
  if(localStorage.getItem("walletInv")){
    var wallet = JSON.parse(localStorage.getItem("walletInv"));
    document.getElementById("coppInv").value = wallet[0];
    document.getElementById("silvInv").value = wallet[1];
    document.getElementById("goldInv").value = wallet[2];
    document.getElementById("platInv").value = wallet[3];
  }
  if("invWalletVisibility"){
    document.getElementById("invWalletDiv").style.display = localStorage.getItem("invWalletVisibility");
  }
  if("bohWalletVisibility"){
    document.getElementById("bohWalletDiv").style.display = localStorage.getItem("bohWalletVisibility");
  }
}



function showHideWallet(userClass){
  var disp = document.getElementById(userClass + "WalletDiv").style.display;
  if(disp !== "none"){
    document.getElementById(userClass + "WalletDiv").style.display ="none";
  }else{
    document.getElementById(userClass + "WalletDiv").style.display = "inline-block";
  }
  localStorage.setItem(userClass+"WalletVisibility", document.getElementById(userClass + "WalletDiv").style.display);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Funktionen für Ansichtswechsel

function switchInvBoh(clickedOn){ //inneres vom html element muss direkt übergeben werden
  if(clickedOn == "Inventory"){
    document.getElementById("content").style.display = "block";
    document.getElementById("content2").style.display = "none";
    localStorage.setItem("inventoryMode", clickedOn);
  }else {
    document.getElementById("content").style.display = "none";
    document.getElementById("content2").style.display = "block";
    localStorage.setItem("inventoryMode", clickedOn);
  }
  //alert(clickedOn);
}