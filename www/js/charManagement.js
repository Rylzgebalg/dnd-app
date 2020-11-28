//rassenselect füllen

function fillRaceSelect(){
	allRaces = JSON.parse(races)
	for(i=0; i < allRaces.length; i++){
		createHTML("option", "raceSelect", ["value", allRaces[i].name], allRaces[i].name)
	}
}

function createSubraces(){

	var x = document.getElementById("subraceSelect");
	while(x.length > 0) {
	  x.remove(x.length-1);
	}
	
	activeRace = document.getElementById("raceSelect").value
	allRaces = JSON.parse(races)
	for(i=0; i < allRaces.length; i++){
		//alert(allClasses[i].name)
		if(activeRace == allRaces[i].name){
			//alert(allClasses[i].subclass.length)
			
			for(j = 0; j < allRaces[i].subclass.length; j++){
				//alert(allClasses[i].subclass[j])
				createHTML("option", "subraceSelect", ["class","subraceOptions", "value", allRaces[i].subclass[j]], allRaces[i].subclass[j])
			}
		}
	}

}


/*selects für erste  aufbauen*/

function createCEfirstClass(){
	createHTML("input", "CEfirstClass", ["type", "number", "class","charProperties","value",1])
	createHTML("br", "CEfirstClass", [])
	createHTML("select", "CEfirstClass", ["id", "CEfirstClass_select", "class", "charProperties", "onchange", "createMulticlasses(this.id, this.parentNode.id)"])
	allClasses = JSON.parse(classes)
	for(i=0; i < allClasses.length; i++){
		createHTML("option", "CEfirstClass_select", ["value", allClasses[i].name], allClasses[i].name)
	}
}

/*selects von subclasses*/

function createMulticlasses(classID, classParentID){
	
	activeClass = document.getElementById(classID).value
	allClasses = JSON.parse(classes)

	if(document.getElementById(classParentID+ "Sub_select")){
		document.getElementById(classParentID+"_sub").remove()
		document.getElementById(classParentID+ "Sub_select").remove()
	}
	
	//createHTML("select", "CEfirstClass", ["id", "CEfirstClassSub_select", "class", "charProperties"])
	

	for(var i=0; i < allClasses.length; i++){
		//alert(allClasses[i].name)
		if(activeClass == allClasses[i].name){
			//alert(allClasses[i].subclass.length)
			createHTML("span", classParentID, ["id",classParentID+"_sub","value", allClasses[i].name], allClasses[i].subPrefix)
			createHTML("select", classParentID, ["id", classParentID+ "Sub_select", "class", "charProperties"])
			
			for(var j = 0; j < allClasses[i].subclass.length; j++){
				//alert(allClasses[i].subclass[j])
				createHTML("option", classParentID+ "Sub_select", ["value", allClasses[i].subclass[j]], allClasses[i].subclass[j])
			}
		}
	}


}

/*div und select für die multiclasses bauen*/

function makeMulticlassBlock(oldOrNew){
	// div Block und Knopf nach unten
	document.getElementById("moreMulticlassesButton").remove()
	nextIdNumber = 1
	if(document.getElementsByClassName("MulticlassDiv").length > 0){
		nextIdNumber = nextIdNumber + document.getElementsByClassName("MulticlassDiv").length
	}
	nextID = "CEmultiClass" + nextIdNumber.toString()

	createHTML("div", "content", ["id", nextID, "class", "MulticlassDiv"])
	createHTML("button", "content", ["id", "moreMulticlassesButton", "onclick", "makeMulticlassBlock('new')"], "MULTICLASSING")
	createHTML("button", nextID,["onclick", "this.parentNode.remove()"], "DELETE")
	createHTML("br", nextID,[])



	//Eingabe für die Klasse ab hier
	createHTML("input", nextID, ["type", "number", "class","charProperties", "value",1]) //Textbox für level
	createHTML("select", nextID, ["id", nextID+"_select", "class", "charProperties", "onchange", "createMulticlasses(this.id, this.parentNode.id)"])
	allClasses = JSON.parse(classes)
	for(i=0; i < allClasses.length; i++){
		createHTML("option", nextID+"_select", ["value", allClasses[i].name], allClasses[i].name)
	}
	createMulticlasses(nextID+"_select", nextID)

	

}

/*
onclick von New und Edit Button auf index.html
Bestimmt ob neuer char ertsellt wird oder alter editiert wird. Setzt localStorage newOrEdit, die createEditChar() kontrolliert. 
op ist der Text der Buttons, anhand dem entschieden wird ob neu oder editieren

*/
function setOperation(op){
	//alert(op)
	if(op == "New"){
		//alert(op)
		localStorage.setItem("newOrEdit", -1)
	}else{
		//alert(op)
		localStorage.setItem("newOrEdit", document.getElementById("charSelect").value)
	}
	//alert(localStorage.getItem("newOrEdit"))
}

function giveHer(){
	b = JSON.parse(classes)
	alert(b.length)

}




function createEditChar(){
	var operation = localStorage.getItem("newOrEdit")
	var futureID
	var IDs = []
	
	if(JSON.parse(localStorage.getItem("charIDs"))){
		IDs = JSON.parse(localStorage.getItem("charIDs"))
	}
	
	var charStats = document.getElementsByClassName("charProperties")
	
	if(operation == "-1"){
		alert("new block")
		futureID = findFreeNumber(IDs)
		alert(futureID)
		/*var newChar = []
		for(var i = 0; i < 4 ; i++){
			newChar[i] = document.getElementsByClassName("charProperties")[i].value;
			alert(newChar[i])
		}*/
		
		numberOfCharEntries = document.getElementsByClassName("charProperties").length
		var newChar = {}
		newChar.name = charStats[0].value //name aus input
		newChar.race = charStats[1].value //rasse und subrasse aus selects
		newChar.subrace = charStats[2].value
		
		newChar.levels = []
		newChar.classes = []
		newChar.subclasses = []
		for(i = 3; i < numberOfCharEntries; i = i+3){
			newChar.levels.push(charStats[i].value)
			newChar.classes.push(charStats[i+1].value)
			newChar.subclasses.push(charStats[i+2].value)
		}


	
		localStorage.setItem("char_" + futureID.toString(), JSON.stringify(newChar))
		//IDs.push(futureID)
		IDs[IDs.length] = futureID
		//IDs[parseInt(futureID) -1] = futureID
		//alert(IDs)
		localStorage.setItem("charIDs", JSON.stringify(IDs))
		//alert(newChar)
		localStorage.setItem("activeChar", futureID)
	} else {
		//alert("edit block")
		futureID = operation
		//alert(typeof futureID)
		var editChar = JSON.parse(localStorage.getItem("char_"+futureID))
		//alert(editChar)
		/*alert("loop start")
		for(var j = 0; j< 4 ; j++){
			
			editChar[j] = document.getElementsByClassName("charProperties")[j].value;
			alert(document.getElementsByClassName("charProperties")[j].value)
		}
		*/
		numberOfCharEntries = document.getElementsByClassName("charProperties").length
		var editChar = {}
		editChar.name = charStats[0].value //name aus input
		editChar.race = charStats[1].value //rasse und subrasse aus selects
		editChar.subrace = charStats[2].value
		
		editChar.levels = []
		editChar.classes = []
		editChar.subclasses = []
		for(i = 3; i < numberOfCharEntries; i = i+3){
			editChar.levels.push(charStats[i].value)
			editChar.classes.push(charStats[i+1].value)
			editChar.subclasses.push(charStats[i+2].value)
		}
		



		
		
		//alert(editChar)
		localStorage.removeItem("char_"+futureID)
		localStorage.setItem("char_"+futureID, JSON.stringify(editChar))
		localStorage.setItem("activeChar", futureID)
	}

}

function loadCharToEdit(){
	
	var operation = localStorage.getItem("newOrEdit")
	//alert(operation)
	if(operation != "-1"){
		charStats = document.getElementsByClassName("charProperties")
		activeID = localStorage.getItem("activeChar")
		activeChar = JSON.parse(localStorage.getItem("char_"+activeID));
		//alert(activeChar.levels)
		charStats[0].value = activeChar.name
		charStats[1].value = activeChar.race
		createSubraces()
		charStats[2].value = activeChar.subrace
		var k = 0
		//alert(activeChar.classes.length)
		clacLength = 3 + 3*activeChar.classes.length
		for(var j = 3; j < clacLength; j =j+3){
			
			if(j>3){
				makeMulticlassBlock("old")
				
			}
			charStats = document.getElementsByClassName("charProperties")
			charStats[j].value = activeChar.levels[k]
			charStats[j+1].value = activeChar.classes[k]
			if(j>3){
				createMulticlasses('CEmultiClass'+k.toString() +'_select', 'CEmultiClass'+k.toString())
				//document.getElementById('CEmultiClass'+k.toString()).childNodes[2].remove()
				//createHTML("button", 'CEmultiClass'+k.toString(),["onclick", "this.parentNode.remove()"], "DELETE")
			}
			if(j == 3){createMulticlasses('CEfirstClass_select', 'CEfirstClass')}
			charStats[j+2].value = activeChar.subclasses[k]
			k++
		}
	
	
	}
}

function updateCharSelect(){
	//alert("lol")
	//var charList = JSON.parse(localStorage.getItem("charIDs"))
	
	if(JSON.parse(localStorage.getItem("charIDs"))){
		var IDs = JSON.parse(localStorage.getItem("charIDs"))
		//alert(IDs)
		//alert(IDs.length)
		for(var i = 0; i < IDs.length ; i++){
			var chara = JSON.parse(localStorage.getItem("char_"+IDs[i].toString()))
			//alert(Object.entries(chara))
			createHTML("option", "charSelect", ["value", IDs[i]], chara.name)
		}
	}
}

function markActiveChar(){
	localStorage.setItem("activeChar", document.getElementById("charSelect").value)
	
}

function displayActiveChar(){
	if(localStorage.getItem("activeChar")){
		var activeID = localStorage.getItem("activeChar")
		var activeChar = JSON.parse(localStorage.getItem("char_"+activeID));
	
		document.getElementById("charSelect").value = activeID
		document.getElementById("activeCharP").style.visibility = "visible"
		document.getElementById("activeCharName").innerHTML = activeChar.name

		document.getElementById("activeCharRace").innerHTML = activeChar.race
		document.getElementById("activeCharSubrace").innerHTML = activeChar.subrace
		
		var levelSum = 0;


		if(document.getElementsByClassName("activeCharDisplay")){
			var activeCharDisplays = document.getElementsByClassName("activeCharDisplay")
			//alert("a")
			for(var i = activeCharDisplays.length-1 ; i >= 0; i--){
				activeCharDisplays[i].remove()
			}
		}

		for(var i = 0; i < activeChar.levels.length; i++){
			levelSum = levelSum + parseInt(activeChar.levels[i])
			createHTML("br", "activeCharP", ["class", "activeCharDisplay"])
			//alert("b")
			createHTML("span", "activeCharP", ["class", "activeCharDisplay"], "Lvl. "+ activeChar.levels[i] +" "+ activeChar.classes[i] +" ("+ displayPrefix(activeChar.classes[i]) + activeChar.subclasses[i] + ")")
		}

		document.getElementById("activeCharTotalLevel").innerHTML = levelSum
	} else {
		document.getElementById("activeCharP").style.visibility = "hidden"
	}
}

function displayPrefix(className){
	allClasses = JSON.parse(classes)
	for(var i = 0; i < allClasses.length; i++){
		if(allClasses[i].name == className){
			
			return allClasses[i].subPrefix
		}
	}
	return "a"
}

function deleteChar(){
	
	if(confirm("The character and any dice presets, items, etc. will be deleted. Proceed?")){
		//alert("del")
		var delID = document.getElementById("charSelect").value
	
	
		IDs = JSON.parse(localStorage.getItem("charIDs"))
		for(i = 0; i < IDs.length; i++){
			if(delID ==IDs[i]){
				IDs.splice(i,1)
			}
		}
		localStorage.removeItem("char_"+delID)
		localStorage.removeItem("charIDs")
		localStorage.setItem("charIDs", JSON.stringify(IDs))
		localStorage.removeItem("activeChar")
		location.reload()
	}
	
}


//Hätte man mit .includes(checkFor) machen können, versteht cordova aber nicht 
function findFreeNumber(array) {
	var checkFor = 1;
	var isContained = false
    //alert(array[0])
	if(array.length > 0){
	/*	//alert("is true")
		while(array.includes(checkFor)){
			checkFor++;
		}
	*/
		while(true){
			for(var i = 0; i < array.length; i++){
				if(array[i] == checkFor){
					isContained = true
				} 			
			}
			if(!isContained){
				return checkFor
			}
			checkFor++
			isContained = false
		}
	
	}



    return checkFor;
}

//localStorage.clear()