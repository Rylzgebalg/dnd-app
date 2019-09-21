function setCreaturesInSelect(){
    var creatureData = JSON.parse(data);
    var names = [];
    for(index = 0; index < creatureData.length ; index++){
        names[index] = creatureData[index].name;
    } 
    names.sort();

    for(index = 0; index < names.length ; index++){
        createHTML("option", "creatureInput", ["value", names[index]], names[index]);
    }

}