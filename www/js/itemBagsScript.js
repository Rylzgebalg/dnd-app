//Alles mit Taschen hier

//Ändert den div mit Items
function changeBag(){
    if(JSON.parse(localStorage.getItem("bagList")).length == 0){
        return 0;
    }
        
    //Alte löschen
    if(document.getElementsByClassName("itemBagClass").length > 0){
        var parent = document.getElementById("content");
        var child = document.getElementsByClassName("itemBagClass");
        var removeMe = child[0]
        parent.removeChild(removeMe);
    }
    //Neue Bag-div
    var bagID = document.getElementById("bagSelect").value;
    var IDlist = JSON.parse(localStorage.getItem("bagList"));
    var nameIndex= IDlist.indexOf(bagID);
    createHTML("div", "content", ["id", IDlist[nameIndex], "class", "itemBagClass"]);
    createHTML("span", IDlist[nameIndex], ["id", IDlist[nameIndex]+"_name"], IDlist[nameIndex+1]);
    createHTML("button", IDlist[nameIndex], ["onclick", "addItem(this.parentNode.id)"], "Add")
    createHTML("button", IDlist[nameIndex], ["onclick", "renameBag(this.parentNode.id)"], "Rename")
    createHTML("button", IDlist[nameIndex], ["onclick", "deleteBag(this.parentNode.id)"], "Delete")
    
    //WIP
    
    updateItems();
    
}



//onclick des new-buttons, erstellt neue Tasche
function createNewBag(){
    var name = prompt("Enter Name:");
    if(!name){return 0};
    //alert(name);

    var idNumber;
    if(localStorage.getItem("bagList")){
        if(JSON.parse(localStorage.getItem("bagList")).length > 0){
            //idNumber = 2;
            idNumber = findFreeNumber(everyNthElementOf(JSON.parse(localStorage.getItem("bagList")), 3));

        }else{idNumber = 1;}
    } else {idNumber = 1;}

    //alert(idNumber);
    //alert(idNumber);
    //alert(everyNthElementOf(JSON.parse(localStorage.getItem("bagList")), 3));
    updateBagList(name, idNumber); //LocalStorage Array updaten
    updateSelect(); //Die Auswahl updaten
    document.getElementById("bagSelect").value = "id"+idNumber.toString();
    changeBag();

}




function updateBagList(name, idNum){
    var bagArray;
    if(JSON.parse(localStorage.getItem("bagList"))){
        bagArray = JSON.parse(localStorage.getItem("bagList"));
    } else {
        bagArray = [];
    }
    //alert("bagArray ist"+ bagArray);
    bagArray.push("id"+idNum.toString());
    bagArray.push(name);
    bagArray.push(idNum);
    localStorage.setItem("bagList", JSON.stringify(bagArray));
}




function updateSelect(){
    //Alle löschen
    if( document.getElementsByClassName("bagOption")){
        var parent = document.getElementById("bagSelect");
        var child = document.getElementsByClassName("bagOption");
        for(i = child.length ; i > 0 ; i--){
            parent.removeChild(child[i-1]);
        }
    }

    //neue Optionen
    //hier evtl Funktion zum Ordnen hinzufügen
    if(JSON.parse(localStorage.getItem("bagList"))){
        var bagArray = JSON.parse(localStorage.getItem("bagList"));
        for(i = 0; i < bagArray.length; i = i + 3){
            createHTML("option", "bagSelect", ["value", bagArray[i], "class", "bagOption"], bagArray[i+1]);
        }
    }
}



function deleteBag(bagID){
    if(!confirm("Delete?")){return 0;}
    //div löschen
    var child = document.getElementById(bagID);
    var parent = document.getElementById("content");
    parent.removeChild(child);
    var bagArray = JSON.parse(localStorage.getItem("bagList"));
    for(i = 0; i < bagArray.length; i = i+3){
        if(bagID == bagArray[i]){
            bagArray.splice(i, 3);
        }
    }
    localStorage.setItem("bagList", JSON.stringify(bagArray));
    localStorage.removeItem(bagID);
    updateSelect();
    if(JSON.parse(localStorage.getItem("bagList")).length > 0){
        changeBag();
    }
}

function renameBag(bagID){
    //Name in HTML ändern
    var newName = prompt("New Name:");
    if(!newName){return 0;}
    document.getElementById(bagID+"_name").innerHTML =  newName;

    //Array ändern
    
    var bagArray = JSON.parse(localStorage.getItem("bagList"));

    for(i = 0; i < bagArray.length; i = i+3){
        if(bagArray[i] == bagID){
            bagArray[i+1] = newName;
            break;
        }
    }
    localStorage.setItem("bagList", JSON.stringify(bagArray));
    updateSelect();
    loadCurrentBag();
}
/********************************************************************************************************************************************************************/
//Alles mit Items

function addItem(bagID){
    var name = prompt("Enter name:");
    if(!name){return 0;}
    var quantity = prompt("Enter quantity")
    if(!quantity){return 0;}

    //alert(bagID);
    var itemArray = [];


    if(JSON.parse(localStorage.getItem(bagID))){
        itemArray = JSON.parse(localStorage.getItem(bagID));
    }
    addToBag(name, quantity, bagID);  
    /*
    //alert(itemArray);
    var newNumber;
    
    if(itemArray.length > 0){
        newNumber = findFreeNumber(everyNthElementOf(itemArray, 4));
    } else {newNumber = 1;}
    //alert(newNumber);
    

    itemArray.push(bagID+"_"+newNumber.toString());
    itemArray.push(name);
    itemArray.push(quantity);
    itemArray.push(newNumber);

    localStorage.setItem(bagID, JSON.stringify(itemArray));
    updateItems();
    changeBag();
*/
    updateItems();
    changeBag();
}


function addToBag(name, quantity, bagID){
    var itemArray = [];

    if(JSON.parse(localStorage.getItem(bagID))){
        itemArray = JSON.parse(localStorage.getItem(bagID));
    }
    
    
    //alert(itemArray);
    var newNumber;
    
    if(itemArray.length > 0){
        newNumber = findFreeNumber(everyNthElementOf(itemArray, 4));
    } else {newNumber = 1;}
    //alert(newNumber);
    

    itemArray.push(bagID+"_"+newNumber.toString());
    itemArray.push(name);
    itemArray.push(quantity);
    itemArray.push(newNumber);

    localStorage.setItem(bagID, JSON.stringify(itemArray));
    

}



function updateItems(){
    var thisBag = document.getElementById("bagSelect").value;
    var itemArray = [];
    
    //Alte HTMLs löschen
    if( document.getElementsByClassName("bagItemClass")){
        //alert("ok");
        var parent = document.getElementById(thisBag);
        var child = document.getElementsByClassName("bagItemClass");
        for(i = child.length ; i > 0 ; i--){
            parent.removeChild(child[i-1]);
        }
    }   
    //alert(thisBag);

    if(JSON.parse(localStorage.getItem(thisBag))){
        itemArray = JSON.parse(localStorage.getItem(thisBag));
    }

    for(i = 0; i< itemArray.length; i = i+4){
        var divID = thisBag + "_" + itemArray[i+3].toString();
        createHTML("div", thisBag, ["id", divID, "class", "bagItemClass"]);
        createHTML("span", divID, ["id", divID+"_name"], itemArray[i+1]);
        createHTML("button", divID, ["onclick", "changeInputByButton(this.parentNode.id, this.innerHTML)"], "-");
        createHTML("input", divID, ["id", divID+"_quant", "value", itemArray[i+2], "onchange", "saveNewItemQuantity()"]);
        createHTML("button", divID, ["onclick", "changeInputByButton(this.parentNode.id, this.innerHTML)"], "+");
        createHTML("br", divID,[]);
        
        //Knöpfe mit Text /*
        /*
        createHTML("button", divID, ["id", divID+"_del", "onclick", "deleteItem(this.parentNode.id)"], "Del");
        createHTML("button", divID, ["id", divID+"_ren", "onclick", "renameItem(this.parentNode.id)"], "Re");
        createHTML("button", divID, ["id", divID+"_up", "onclick", "moveUp(this.parentNode.id)"], "Up");
        createHTML("button", divID, ["id", divID+"_down", "onclick", "moveDown(this.parentNode.id)"], "Down");
        */

        //Knöpfe mit Bild
        createHTML("img", divID, ["id",divID+"_del","src", "img/nocross.png", "onclick", "deleteItem(this.parentNode.id)"]);        
        createHTML("img", divID, ["id",divID+"_ren","src", "img/fink.png", "onclick", "renameItem(this.parentNode.id)", "class", "renameIcon"]);
        createHTML("img", divID, ["id",divID+"_up","src", "img/copy.png", "onclick", "openCopyInterface(this.parentNode.id)", "class", "copyIcon"]);        
        createHTML("img", divID, ["id",divID+"_up","src", "img/arrowright.png", "onclick", "moveUp(this.parentNode.id)", "class", "moveUpIcon"]);  
        createHTML("img", divID, ["id",divID+"_up","src", "img/arrowright.png", "onclick", "moveDown(this.parentNode.id)", "class", "moveDownIcon"]);    
    
      


        
    }
}


/**
 * Löscht Item vom Interface und aus dem Itemarray der Tasche
 * @param {*} itemID
 *  
 */
function deleteItem(itemID){
    if(!confirm("Delete?")){return 0;}

    //HTML element löschen
    var parentID = document.getElementById("bagSelect").value;
    var parent = document.getElementById(parentID);
    var child = document.getElementById(itemID);
    parent.removeChild(child);

    //Aus Array entfernen
    var itemArray = JSON.parse(localStorage.getItem(parentID));
    //alert(itemArray);
    for(i = 0; i < itemArray.length; i = i+4){
        if(itemID == itemArray[i]){
            itemArray.splice(i, 4);
        }
    }
    localStorage.setItem(parentID, JSON.stringify(itemArray));
    
    updateItems();
}



function saveNewItemQuantity(){
    var bagID = document.getElementById("bagSelect").value;
    var itemArray = JSON.parse(localStorage.getItem(bagID));

    for(i = 0; i < itemArray.length; i = i+4){
        itemArray[i+2] = document.getElementById(itemArray[i]+"_quant").value;
    }
    localStorage.setItem(bagID, JSON.stringify(itemArray));
}



function changeInputByButton(itemID, op){
    changeInputPM(itemID+"_quant", op, 1);
    saveNewItemQuantity();
}



//Funktionen zum Kopieren von Items in andere Taschen

/**Baut bei Klick auf den grünen kleinen Knopf mit Kopiersymbol checkboxen mit Namen aller Taschen und Copy-Knopf. Um Item in Tasche zu kopieren: Checkbox markieren
 * und Copy drücken. Bei einem zweiten Klick wird das Interface wieder geschlossen.
 * itemID: id des Items, das kopiert wird
 */
function openCopyInterface(itemID){
        if(!document.getElementById( itemID +"_checkbox_span")){
    
        var activeBag = document.getElementById("bagSelect").value;
        var bagList = JSON.parse(localStorage.getItem("bagList"));

    //alert(bagList);
        for(i = 0; i < bagList.length; i = i +3){
            if(bagList[i] != activeBag | true){
                createHTML("br", itemID, []);
                createHTML("input", itemID, ["type", "checkbox", "value", bagList[i], "class", itemID + "_checkbox"]);
                createHTML("span", itemID, ["id", itemID +"_checkbox_span"], bagList[i+1]);
            }
        }

        createHTML("br", itemID, []);
        createHTML("br", itemID, []);
        createHTML("button", itemID, ["onclick", "copyItem(this.parentNode.id)"], "Copy");
    }
    else{
        updateItems();
    }

}


/** 
 * Bei Druck auf Copy-Knopf ausgeführt. Nimmt Name und Anzahl des Items unter dem Copy geöffnet wurde und fügt sie zu jeder Tasche hinzu, deren checkbox markiert wurde.
 * itemID: id des Items, das kopiert wird
 * Hinzufügen selbst mit addToBag. */
function copyItem(itemID){
    var checkboxes = document.getElementsByClassName(itemID + "_checkbox");

    var name = document.getElementById(itemID + "_name").innerHTML;
    var quant = document.getElementById(itemID + "_quant").value;

    
    //alert(checkboxes.length);
    for(i = 0; i < checkboxes.length; i++){
        //alert(checkboxes[i].value);
        
        //alert(checkboxes[i].checked);
        if(checkboxes[i].checked){
            addToBag(name, quant, checkboxes[i].value);
        }
    }

    if(confirm("Remove from here?")){
        deleteItem(itemID);
    }
    updateItems();
    changeBag();
}


/********************************************************************************************************************************************************************/
//Utilityzeug wie vertauschen, umbennen, etc...

function renameItem(itemID){
    //Name in HTML ändern
    var newName = prompt("New Name:");
    if(!newName){return 0;}
    document.getElementById(itemID+"_name").innerHTML =  newName;

    //Array ändern
    var bagID = document.getElementById("bagSelect").value;
    var itemArray = JSON.parse(localStorage.getItem(bagID));

    for(i = 0; i < itemArray.length; i = i+4){
        if(itemArray[i] == itemID){
            itemArray[i+1] = newName;
            break;
        }
    }
    localStorage.setItem(bagID, JSON.stringify(itemArray));
}



function moveUp(itemID){
    var bagID = document.getElementById("bagSelect").value;
    var bagArray = JSON.parse(localStorage.getItem(bagID));

    for(i = 4; i < bagArray.length; i = i+4){
        if(itemID == bagArray[i]){
            switchElements(bagArray, i-4, i, 4);
        }
    }
    localStorage.setItem(bagID, JSON.stringify(bagArray));
    updateItems();
}



function moveDown(itemID){
    var bagID = document.getElementById("bagSelect").value;
    var bagArray = JSON.parse(localStorage.getItem(bagID));

    for(i = 0; i < bagArray.length - 4; i = i+4){
        if(itemID == bagArray[i]){
            switchElements(bagArray, i, i+4, 4);
            i = bagArray;
        }
    }
    localStorage.setItem(bagID, JSON.stringify(bagArray));
    updateItems();
}


//Value der ausgewählten Tasche in localStorage. Diese Funktion wird bei onchange des selects ausgeführt
function saveCurrentBag(){
    var currentBag = document.getElementById("bagSelect").value;
    localStorage.setItem("bagCurrentBag", currentBag);
}

//Ändert Value der select auf die gespeicherte bag aus localStorage. Wird onload ausgeführt und lädt somit die letzte Tasche vor dem Schließen der letzten Nutzung.
function loadCurrentBag(){
    if(!localStorage.getItem("bagCurrentBag")){return 0}; //Blockt Funktion beim erstmaligen Ausführen wo localStorage noch nicht definiert
    var currentBag = localStorage.getItem("bagCurrentBag");
    document.getElementById("bagSelect").value = currentBag;
    changeBag();
}

/********************************************************************************************************************************************************************/
/*Utility


function findFreeNumber(array) {
    var checkFor = 1;
    
    while(array.includes(checkFor)){
        checkFor++;
    }

    return checkFor;
}*/


//Sucht die nächste kleinste Zahl, die nicht im array enthalten ist. Damit werden neue id-nummern ermittelt
function findFreeNumber(array) {
    var checkFor = 1;
    alert(array.length)
	if(array.length > 0){
		while(stringIncludes(array, checkFor)){
			checkFor++;
		}
	}
    return checkFor;
}



//Überprüft ob array das element enthält (keine Typengleichheit überprüft, da bisher nicht nötig bzw. hinderlich)
function stringIncludes(array, element){
    for(i = 0; i < array.length; i++){
        if(array[i] == element){
            return true;
        }
    }
    return false;
}


//Nimmt jedes n-te Element aus array und formt daraus einen neuen Array
function everyNthElementOf(array, n){
    if(!array){return [0];}
    
    var newArray = [];

    for(i = n-1; i < array.length ; i = i+n){
        newArray.push(array[i]);
    }
    return newArray;
}



function switchElements(array, pos1, pos2, n){
    var m;
    if(!n){ m = 1;}
    else{ m = n;}

    var stored = array.slice(pos1, pos1 + m);

    for(k = 0; k < m; k++){
        array[pos1+k] = array[pos2+k];
        array[pos2+k] = stored[k];
    }
}



function testFunction() {
    //alert(findFreeNumber([1,4,2,6]));
    //alert(everyNthElementOf([1,2,4,5], 3));
    //var bab = everyNthElementOf(JSON.parse(localStorage.getItem("bagList")), 3);
    //alert(bab[0]);
    //bub = findFreeNumber(everyNthElementOf(JSON.parse(localStorage.getItem("bagList")), 3));
    //alert(bub);
    //var arr = [1,2,3,4,5,6];
    //switchElements(arr, 2,0, 2);
    //alert(arr);
    alert(JSON.parse(localStorage.getItem("bagList")));
}