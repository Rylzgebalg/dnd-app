function changeMenu() {
  var nextSegment = changeSegment(localStorage.getItem("segment"));
  localStorage.setItem("segment", nextSegment);
  changeRowDisplay(localStorage.getItem("segment"));
}

function changeSegment(seg){
  if(seg == "1"){
    return "2";
  } else {
    return "1";
  }
}

function changeRowDisplay(string) {
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
}

function selectMenuOnStart(){
  if(!(localStorage.getItem("segment"))){
    localStorage.setItem("segment", "1");
  }
  changeRowDisplay(localStorage.getItem("segment"));
}
