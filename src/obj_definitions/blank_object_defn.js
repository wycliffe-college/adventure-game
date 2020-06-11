//The attributes for the defn platform

export function createDefinition() {
    var defn = Object();
    
    defn.width_phy = 2;
    defn.height_phy = 2;
    defn.density = 1;

    defn.objImage = new Image();
    defn.objImage.src = './images/Crest_White.png';

    //set to false to hide the bounding boxes
    defn.boundingBox = true;

    //type
    defn.type = "default box";

    return defn;
}


export var defaultObject = createDefinition();