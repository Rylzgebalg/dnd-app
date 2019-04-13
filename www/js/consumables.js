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
  var para = document.createElement("div");
  para.id = "item" + i.toString();


  var element = document.getElementById("content");
  element.appendChild(para);

  //Elemente werden im Dokument erzeugt
  createItemName(para.id, itemName);
  createControlButton(para.id,"-")
  createCountField(para.id, itemCount);
  createControlButton(para.id,"+")
  createDelButton(para.id);
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

//Text mit Name für das Item
function createItemName(myID, name){
  var para = document.createElement("span");
  //var name = prompt("Name your Consumable:")
  var node = document.createTextNode(name);
  para.appendChild(node);

  var element = document.getElementById(myID);
  element.appendChild(para);
}


//Feld für die Anzahl
function createCountField(myID, name) {
  var para = document.createElement("input");
  //var name = setNumber();
  //var node = document.createTextNode(name);
  //para.appendChild(node);

  var element = document.getElementById(myID);
  para.setAttribute("type", "number");
  para.setAttribute("value", name);
  para.setAttribute("id","count" + myID);
  element.appendChild(para);
  para.setAttribute("onblur", "changeCountOnchange(this.id)");
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

//+ und - Knopf
function createControlButton(myID, nodeIn){
  var para = document.createElement("button"); //statt img button und das unten rein für button
  var node = document.createTextNode(nodeIn);
  para.appendChild(node);
  var element = document.getElementById(myID);
  para.setAttribute("onclick","changeCount(this.id)");
  para.setAttribute("id", nodeIn + myID);
  element.appendChild(para);
}

//Knopf zum Löschen
function createDelButton(myID){
  var para = document.createElement("img"); //statt img button und das unten rein für button
  //var node = document.createTextNode("BIBDEDO");
  //para.appendChild(node);
  para.src = "img/nocross.png";
  var element = document.getElementById(myID);
  para.setAttribute("onclick","deleteThisBlock(this.parentNode.id)");
  element.appendChild(para);
}

//Ändere und speicher Anzahl bei Betätigen der Knöpfe
function changeCount(id){
  var operation = id.substring(0,1);
  var inputID = "count" + id.substring(1,id.length);
  var currentCount = document.getElementById(inputID).value;
  currentCount = eval(currentCount + operation + "1");
  document.getElementById(inputID).value = currentCount;

  var itemList = JSON.parse(localStorage.getItem("list"));
  var saveTo = id.substring(id.length-1, id.length);
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
  var saveTo = id.substring(id.length-1, id.length);
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
    var number = parentID.substring(parentID.length-1, parentID.length);
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
