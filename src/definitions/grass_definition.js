//The attributes for the grass platform

export var grass = Object();

//Left stuff
grass.leftImage = new Image();
grass.leftImage.src = 'images/grassleft.png';
grass.px_leftWidth = 60;

//Right stuff
grass.rightImage = new Image();
grass.rightImage.src = 'images/grassright.png';
grass.px_rightWidth = 64;

//centre stuff
grass.centreImage = new Image();
grass.centreImage.src = 'images/ruined_forest/centrePlat.png';
grass.px_centreWidth = 298;

//Misc vars.
grass.verticalOffset = -80;

grass.friction = 1;
grass.px_platformHeight = 45;

grass.px_minWidth = grass.px_leftWidth + grass.px_rightWidth;

//Portal Stuff
grass.portalWidth_px = 30;
grass.portalHeight_px = 30;
grass.portalAddress = "images/door.png";



//set to false to hide the bounding boxes
grass.boundingBox = true;