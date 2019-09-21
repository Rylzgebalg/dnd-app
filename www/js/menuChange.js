function changeMenu() {
  var nextSegment = changeSegment(localStorage.getItem("segment"));
  localStorage.setItem("segment", nextSegment);
  changeRowDisplay(localStorage.getItem("segment"));
}

function changeSegment(seg){
  /*
  if(seg == "1"){
    return "2";
  } else {
    return "1";
  }
*/
  var row = document.getElementsByClassName("navRow");
  var numberOfSets = row.length /3;
  if(parseInt(seg) < numberOfSets -1){ //Nummer an sets -1
    return parseInt(seg)+1;
  }
  return 0;
}

function changeRowDisplay(string) {
  /*
  var row1 = document.getElementsByClassName("row1");
  var row2 = document.getElementsByClassName("row2");

  if(string == "1"){
    for(var i = 0; i<row1.length; i++){
      row1[i].style.display = "inline";
      row2[i].style.display = "none";
    }
  } else {
    for(var i = 0; i<row1.length; i++){
      row1[i].style.display = "none";
      row2[i].style.display = "inline";
    }
  }

*/
  var row = document.getElementsByClassName("navRow");
  var rowNumber = parseInt(string);
  
  
  for(i = 0; i < row.length; i++){
    if(i >= 3*rowNumber && i < 3*rowNumber+3){
      row[i].style.display = "inline";
    } else{
      row[i].style.display = "none";
    }
  }
}

function selectMenuOnStart(){
  if(!(localStorage.getItem("segment"))){
    localStorage.setItem("segment", 0);
  }
  changeRowDisplay(localStorage.getItem("segment"));
}


