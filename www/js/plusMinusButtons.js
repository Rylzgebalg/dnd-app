
//Um Inhalt von Input-Feldern mit + und - Knopf zu manipulieren, true hinter changeBy um ändern auf kleiner 0 zuzulassen
function changeInputPM(targetID, myOperation, changeBy){
    var currentVal = parseInt(document.getElementById(targetID).value);
    
    if(myOperation == "+"){
        currentVal = currentVal + changeBy;
    }else{
        currentVal = currentVal - changeBy;
    }
    if(currentVal < 0 && !(arguments[arguments.length-1] === true) ){currentVal = 0;}
    document.getElementById(targetID).value = currentVal;
 
}