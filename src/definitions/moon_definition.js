//The attributes for the LEVELNAME platform

import {createDefinition} from "./blank_definition.js";

export var LEVELNAME = createDefinition();

//Left stuff
LEVELNAME.leftImage = new Image();
LEVELNAME.leftImage.src = 'address';
LEVELNAME.px_leftWidth = 0;

//Right stuff
LEVELNAME.rightImage = new Image();
LEVELNAME.rightImage.src = 'address';
LEVELNAME.px_rightWidth = 0;

//centre stuff
LEVELNAME.centreImage = new Image();
LEVELNAME.centreImage.src = 'address';
LEVELNAME.px_centreWidth = 0;

//Misc vars.
LEVELNAME.verticalOffset = 0;

LEVELNAME.friction = 1; //Default friction, keep same usually.
LEVELNAME.px_platformHeight = 45; //Keep same usually, this is the height of each platform part

LEVELNAME.px_minWidth = LEVELNAME.px_leftWidth + LEVELNAME.px_rightWidth; //Dont change

//Portal Stuff
LEVELNAME.portalWidth_px = 0;
LEVELNAME.portalHeight_px = 0;
LEVELNAME.portalAddress = "address";

//set to false to hide the bounding boxes
LEVELNAME.boundingBox = true;