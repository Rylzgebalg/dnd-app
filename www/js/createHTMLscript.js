//HTML-Elemente mit einer Funktion erstellen

function createHTML(tag, parentID, attributes){
    var para = document.createElement(tag);
    var element = document.getElementById(parentID);
    
    if(arguments.length == 4){
        var node = document.createTextNode(arguments[arguments.length -1]);
        para.appendChild(node);
    }
    
    if (attributes.length > 0){
        for(var index = 0; index < attributes.length ; index = index +2 ){
            para.setAttribute(attributes[index],attributes[index+1]);
        }
    }
    element.appendChild(para);
}


/*

function createHTML(tag, parentID, attributes){
    var para = document.createElement(tag);
    var element = document.getElementById(parentID);
    
    if(arguments.length == 4){
        var node = document.createTextNode(arguments[arguments.length -1]);
        para.appendChild(node);
    }
    
    if (attributes.length > 0){
        for(var index = 0; index <= attributes.length ; index = index +2 ){
            para.setAttribute(attributes[index],attributes[index+1]);
        }
    }
    element.appendChild(para);
}*/