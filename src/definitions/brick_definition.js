//The attributes for the brick platform

export var brick = Object();

//Left stuff
brick.leftImage = new Image();
brick.leftImage.src = 'address';
brick.px_leftWidth = 0;

//Right stuff
brick.rightImage = new Image();
brick.rightImage.src = 'address';
brick.px_rightWidth = 0;

//centre stuff
brick.centreImage = new Image();
brick.centreImage.src = 'address';
brick.px_centreWidth = 0;

//Misc vars.
brick.verticalOffset = 0;

brick.friction = 1; //Default friction, keep same usually.
brick.px_platformHeight = 45; //Keep same usually, this is the height of each platform part

brick.px_minWidth = brick.px_leftWidth + brick.px_rightWidth; //Dont change

//Portal Stuff
brick.portalWidth_px = 0;
brick.portalHeight_px = 0;
brick.portalAddress = "address";

//set to false to hide the bounding boxes
brick.boundingBox = true;