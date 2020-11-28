function saveDicePreset(){
    //alert("1")
    var operation = localStorage.getItem("diceOperation") //aus localstorgae entscheiden ob neu oder edit
    //alert(operation)
    var activeID = localStorage.getItem("activeChar")
	//var activeChar = JSON.parse(localStorage.getItem("char_"+activeID));
    
    //alert("2")
    var dicePresets = []
    if(JSON.parse(localStorage.getItem("dicePresets_"+ activeID))){dicePresets = JSON.parse(localStorage.getItem("dicePresets_"+ activeID))}
    var diceProperties = document.getElementsByClassName("dicePresetProperty")
    var preset = {}
    //alert("3")
    preset.name = diceProperties[0].value
    preset.diceKind = []
    preset.diceNumber = []
    preset.modOnEvery = []
    preset.modOnSum = []
    preset.showSumOption = true
    preset.showAllOption = true
    preset.showAdvOption = false
    preset.showVisOption = true
    
    //alert(preset.name)
    /*alert(diceProperties[0])
    alert(diceProperties[1].innerHTML)
    alert(diceProperties[2].value)
    alert(diceProperties[3])
    alert(diceProperties[4])
    alert(diceProperties[5])*/
    for(var i = 0; i < 6; i++){
        //alert(typeof parseInt(diceProperties[2+i*3].value))
        var checkFor = parseInt(diceProperties[2+i*4].value)
        //alert(diceProperties[2+i*3].value)
        //alert(checkFor)
        //alert(typeof checkFor)
        //alert(typeof 0)
        if(checkFor > 0){
            //alert("Drin")
            preset.diceKind.push(diceProperties[1+i*4].innerHTML)
            preset.diceNumber.push(diceProperties[2+i*4].value)
            preset.modOnEvery.push(diceProperties[3+i*4].value)
            preset.modOnSum.push(diceProperties[4+i*4].value)
        }
        
    }
    //alert(preset.diceKind)
    //alert(preset.diceNumber)
    //alert(preset.modOnEvery)
    //alert(preset.modOnSum)

    if(operation =="new"){
        dicePresets.push(preset)
    }else{
        dicePresets[parseInt(operation)] = preset
    }
    //alert("6")
    localStorage.removeItem("dicePresets_"+ activeID)
    localStorage.setItem("dicePresets_"+ activeID, JSON.stringify(dicePresets))
    //alert("7")
}



function loadDicePresets(){
    var activeID = localStorage.getItem("activeChar")
    //ocalStorage.removeItem("dicePresets_"+ activeID)
    if(!JSON.parse(localStorage.getItem("dicePresets_"+ activeID))){return 0}
    var dicePresets = JSON.parse(localStorage.getItem("dicePresets_"+ activeID))
    //alert(dicePresets[0].diceKind)
    for(i=0; i < dicePresets.length; i++){
        divIDname = i.toString() + "_presetDiv"
        createHTML("div", "presetSpan", ["id", divIDname])
        createHTML("span", divIDname, [], dicePresets[i].name)
        createHTML("br", divIDname, [])
        createHTML("button", divIDname, ["onclick", "rollAndDisplay(this.parentNode.id)"], makeButtonLabel(dicePresets[i].diceKind, dicePresets[i].diceNumber, dicePresets[i].modOnEvery, dicePresets[i].modOnSum ))
        createHTML("br", divIDname, [])
        //createHTML("button", divIDname, ["onclick","hideShowSum(this.parentNode.id)"],"S")
        createHTML("img", divIDname, ["id", divIDname+ "_sumButton", "src", "img/showSumOn.png", "onclick","hideShowSum(this.parentNode.id)"])
        //createHTML("button", divIDname, [],"E")
        createHTML("img", divIDname, ["id", divIDname+ "_allButton", "src", "img/showAllOn.png", "onclick","hideShowAll(this.parentNode.id)"])
        //createHTML("button", divIDname, [],"A")
        createHTML("img", divIDname, ["id", divIDname+ "_advButton" ,"src", "img/advantageOff.png", "onclick","hideShowAdv(this.parentNode.id)"])
        createHTML("a", divIDname, ["href", 'dicePresetCreator.html', "id", divIDname + "Link"])
        //createHTML("button", divIDname+ "Link", ["onclick", 'localStorage.setItem("diceOperation", extractFirstNumber(this.parentNode.id))'],"E")
        createHTML("img", divIDname+ "Link", ["src", "img/editButton.png", "onclick", 'localStorage.setItem("diceOperation", extractFirstNumber(this.parentNode.id))'])
        //createHTML("button", divIDname, ["onclick", "deleteThisPreset(extractFirstNumber(this.parentNode.id))"],"D")
        createHTML("img", divIDname, ["src", "img/deleteButton.png", "onclick", "deleteThisPreset(extractFirstNumber(this.parentNode.id))"],"D")
        createHTML("br", divIDname, [])
        createHTML("span", divIDname, ["id", divIDname+"_sum"], "")
        createHTML("br", divIDname, [])
        createHTML("span", divIDname, ["id", divIDname+"_all"], "")

        turnSumOnOff(dicePresets[i], divIDname)
        turnAllOnOff(dicePresets[i], divIDname)
        turnAdvOnOff(dicePresets[i], divIDname)
    }

}

function rollAndDisplay(parentID){
    var activeID = localStorage.getItem("activeChar")
    var dicePresets = JSON.parse(localStorage.getItem("dicePresets_"+ activeID))

    var activePresetNumber = extractFirstNumber(parentID)
    var activePreset = dicePresets[activePresetNumber]

    //alert(activePreset.showAdvOption)
    
    var rolls = []
    var totalRoll = 0
    
    var advRolls = []
    var advTotal = []


    for(var i = 0; i < activePreset.diceKind.length; i++){
        for(var j = 0; j < parseInt(activePreset.diceNumber[i]); j++){
            rolls.push(randomIntFromInterval(1, parseInt(activePreset.diceKind[i])) + parseInt(activePreset.modOnEvery[i]))
            totalRoll = totalRoll + rolls[rolls.length-1]
            
        }
        totalRoll = totalRoll + parseInt(activePreset.modOnSum[i])
        
    }


    if(activePreset.showAdvOption){
        advTotal.push(totalRoll)
        advRolls.push(rolls)

        rolls = []
        totalRoll = 0

        for(var i = 0; i < activePreset.diceKind.length; i++){
            for(var j = 0; j < parseInt(activePreset.diceNumber[i]); j++){
                rolls.push(randomIntFromInterval(1, parseInt(activePreset.diceKind[i])) + parseInt(activePreset.modOnEvery[i]))
                totalRoll = totalRoll + rolls[rolls.length-1]
            
            }
            totalRoll = totalRoll + parseInt(activePreset.modOnSum[i])
            
        
        }
        advTotal.push(totalRoll)
        advRolls.push(rolls)
        document.getElementById(parentID +"_sum").innerHTML = styleAdvantageArray(advTotal)
        document.getElementById(parentID +"_all").innerHTML = styleAdvantageArray(advRolls)
    }

    else{
    document.getElementById(parentID +"_sum").innerHTML = totalRoll
    document.getElementById(parentID +"_all").innerHTML = rolls

    }
}

function hideShowSum(parentID){
    var activeID = localStorage.getItem("activeChar")
    var dicePresets = JSON.parse(localStorage.getItem("dicePresets_"+ activeID))

    var activePresetNumber = extractFirstNumber(parentID)
    var activePreset = dicePresets[activePresetNumber]

    if(activePreset.showSumOption){activePreset.showSumOption = false}
    else{activePreset.showSumOption = true}

    turnSumOnOff(activePreset, parentID)
    localStorage.removeItem("dicePresets_"+ activeID)
    localStorage.setItem("dicePresets_"+ activeID, JSON.stringify(dicePresets))
}

function turnSumOnOff(preset, parentID){
    if(preset.showSumOption){
        document.getElementById(parentID + "_sumButton").src = "img/showSumOff.png"
        document.getElementById(parentID+"_sum").style.visibility = "hidden"
    }else{
        document.getElementById(parentID + "_sumButton").src = "img/showSumOn.png"
        document.getElementById(parentID+"_sum").style.visibility = "visible"
    }
}


function hideShowAll(parentID){
    var activeID = localStorage.getItem("activeChar")
    var dicePresets = JSON.parse(localStorage.getItem("dicePresets_"+ activeID))

    var activePresetNumber = extractFirstNumber(parentID)
    var activePreset = dicePresets[activePresetNumber]

    if(activePreset.showAllOption){activePreset.showAllOption = false}
    else{activePreset.showAllOption = true}

    turnAllOnOff(activePreset, parentID)
    localStorage.removeItem("dicePresets_"+ activeID)
    localStorage.setItem("dicePresets_"+ activeID, JSON.stringify(dicePresets))
}

function turnAllOnOff(preset, parentID){
    if(preset.showAllOption){
        document.getElementById(parentID + "_allButton").src = "img/showAllOff.png"
        document.getElementById(parentID+"_all").style.visibility = "hidden"
    }else{
        document.getElementById(parentID + "_allButton").src = "img/showAllOn.png"
        document.getElementById(parentID+"_all").style.visibility = "visible"
    }
}




function hideShowAdv(parentID){
    var activeID = localStorage.getItem("activeChar")
    var dicePresets = JSON.parse(localStorage.getItem("dicePresets_"+ activeID))

    var activePresetNumber = extractFirstNumber(parentID)
    var activePreset = dicePresets[activePresetNumber]

    if(activePreset.showAdvOption){activePreset.showAdvOption = false}
    else{activePreset.showAdvOption = true}

    turnAdvOnOff(activePreset, parentID)
    localStorage.removeItem("dicePresets_"+ activeID)
    localStorage.setItem("dicePresets_"+ activeID, JSON.stringify(dicePresets))
}

function turnAdvOnOff(preset, parentID){
    if(preset.showAdvOption){
        document.getElementById(parentID + "_advButton").src = "img/advantageOn.png"
    }else{
        document.getElementById(parentID + "_advButton").src = "img/advantageOff.png"
    }
}









function setUpPresetEdit(){
    //alert("start")
    if(!localStorage.getItem("diceOperation" || localStorage.getItem("diceOperation") == "new")){return 0}
    
    var activePresetNumber = localStorage.getItem("diceOperation")
    //alert(activePresetNumber)
    var activeID = localStorage.getItem("activeChar")
    var dicePresets = JSON.parse(localStorage.getItem("dicePresets_"+ activeID))
    var activePreset = dicePresets[activePresetNumber]


    var diceProperties = document.getElementsByClassName("dicePresetProperty")

    diceProperties[0].value = activePreset.name
    //alert(diceProperties[21].innerHTML)
    //alert(activePreset.diceKind[0])
    for(var i = 0; i < activePreset.diceKind.length; i++){
        
        for( var j = 1; j< diceProperties.length -1; j = j+4){
            
            if(activePreset.diceKind[i] == diceProperties[j].innerHTML){
                
                diceProperties[j+1].value = activePreset.diceNumber[i]
                diceProperties[j+2].value =activePreset.modOnEvery[i]
                diceProperties[j+3].value =activePreset.modOnSum[i]
            }
        }            
    }

}

function deleteThisPreset(arrayIndex){
    if(!confirm("Delete")){return 0}
    //alert(arrayIndex)
    var activeID = localStorage.getItem("activeChar")
    var dicePresets = JSON.parse(localStorage.getItem("dicePresets_"+ activeID))


    //alert(dicePresets)
    dicePresets.splice(parseInt(arrayIndex), 1)
    //alert(dicePresets)

    localStorage.removeItem("dicePresets_"+ activeID)
    localStorage.setItem("dicePresets_"+ activeID, JSON.stringify(dicePresets))
    location.reload()
}

/*
function makeButtonLabel(diceKind, diceNumber, modsOnRoll, modOnSum){
    var rolls = []
    var label =""
    var modSum = 0
    alert(diceKind)
    for(var i = 0; i < diceKind.length; i++){
        if(modsOnRoll[i].toString() == "0"){
            rolls[i] = diceNumber[i].toString() + "d" + diceKind[i]
        } else{
            rolls[i] = diceNumber[i].toString() + "d(" + diceKind[i] + " + " + modsOnRoll[i] + ")"
        }
        label = label + rolls[i] + " + "
        modSum = modSum +  parseInt(modOnSum[i])
    }

    

    return label + modSum.toString()
    

}
*/

function makeButtonLabel(diceKind, diceNumber, modsOnRoll, modOnSum){
    var rolls = []
    var label =""
    var modSum = 0
    //alert(diceKind)
    for(var i = 0; i < diceKind.length; i++){
        if(parseInt(modsOnRoll[i]) == 0){
            rolls[i] = diceNumber[i]+ "d" + diceKind[i]
        } else{
            rolls[i] = diceNumber[i]+ "d(" + diceKind[i] + " + " + modsOnRoll[i] + ")"
        }
        label = label + rolls[i]
        modSum = modSum +  parseInt(modOnSum[i])
    }

    if(parseInt(modSum) == 0){return label}
    else{return label + " + " + modSum.toString()}

    
    

}

