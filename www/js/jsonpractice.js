/*
window.onload = function() {
$.getJSON( "data.json", function( data ) {
    var items = [];
    $.each( data, function( key, val ) {
      items.push( "<li id='" + key + "'>" + val + "</li>" );
    });
   
    $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "body" );
  });
console.log("Hi");
};*/



function lal(){
    var userdata = JSON.parse(data); 
    var user1_name = userdata[2].name;
    alert(user1_name); 
}
/*
$.getJSON("test.json", function(json) {
    console.log(json); // this will show the info it in firebug console
});*/
/*

$.getJSON( "test.json", function( json ) {
    console.log( "JSON Data received, name is " + json.name);
});*/