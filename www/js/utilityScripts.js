function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function sumUpArrayElements(array){
    var sum = 0
    for(var i = 0; i< array.length; i++){
        sum = sum +array[i]
    }

    return sum
}

function arrayOfZeros(length){
    var array = [0]
    for(var i = 1; i < length; i++){
        array.push(0)
    }

    return array
}

function extractFirstNumber(string){
    for(var i = 0; i < string.length; i++){
        if(string[i] == "_"){
            return string.slice(0, i)
        }
    }
}


function styleAdvantageArray(array){

    var styledString = ""
    /*for(var i = 0; i < array.length; i++){
        styledString = styledString + array[i]
        if(i+1 == array.length/2){styledString = styledString + " | "}
    }*/


    styledString = (array.splice(0, array.length/2)).toString() + " | " + (array).toString()
    return styledString
}

function switchTwoArrayElements(array, index1, index2){
    var placeholder = array[index1]
    array[index1] = array[index2]
    array[index2] = placeholder

}