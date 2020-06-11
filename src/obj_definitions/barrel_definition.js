import {createDefinition} from "./blank_object_defn.js";

export var barrel = createDefinition();

barrel.width_phy = 1;
barrel.height_phy = 1.5;
barrel.density = 50;

barrel.objImage = new Image();
barrel.objImage.src = './images/barrel.png';

//set to false to hide the bounding boxes
barrel.boundingBox = true;

//type
barrel.type = "barrel";
