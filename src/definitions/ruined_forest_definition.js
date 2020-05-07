//The attributes for the ruined_forest platform

export var ruined_forest = Object();

//Left stuff
ruined_forest.leftImage = new Image();
ruined_forest.leftImage.src = 'images/ruined_forest/left.png';
ruined_forest.px_leftWidth = 30;

//Right stuff
ruined_forest.rightImage = new Image();
ruined_forest.rightImage.src = 'images/grassright.png';
ruined_forest.px_rightWidth = 64;

//centre stuff
ruined_forest.centreImage = new Image();
ruined_forest.centreImage.src = 'images/ruined_forest/centre.png';
ruined_forest.px_centreWidth = 120;

//Misc vars.
ruined_forest.verticalOffset = 0;

ruined_forest.friction = 1; //Default friction, keep same usually.
ruined_forest.px_platformHeight = 45; //Keep same usually, this is the height of each platform part

ruined_forest.px_minWidth = ruined_forest.px_leftWidth + ruined_forest.px_rightWidth; //Dont change

//Portal Stuff
ruined_forest.portalWidth_px = 0;
ruined_forest.portalHeight_px = 0;
ruined_forest.portalAddress = "images/door.png";

//set to false to hide the bounding boxes
ruined_forest.boundingBox = true;