
//Um Inhalt von Input-Feldern mit + und - Knopf zu manipulieren
function changeInput(targetID, myOperation, changeBy){
    var currentVal = parseInt(document.getElementById(targetID).value);
    
    if(myOperation == "+"){
        currentVal = currentVal + changeBy;
    }else{
        currentVal = currentVal - changeBy;
    }

    if(currentVal < 0){currentVal = 0;}
    document.getElementById(targetID).value = currentVal;

}