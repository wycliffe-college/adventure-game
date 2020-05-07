//The attributes for the grass platform
export var lava = Object();

//Left stuff
lava.leftImage = new Image();
lava.leftImage.src = 'images/lavaleft.png';
lava.px_leftWidth = 73;

//Right stuff
lava.rightImage = new Image();
lava.rightImage.src = 'images/lavaright.png';
lava.px_rightWidth = 48;

//centre stuff
lava.centreImage = new Image();
lava.centreImage.src = 'images/lavacenter.png';
lava.px_centreWidth = 75;

//Misc vars.
lava.verticalOffset = -5;

lava.friction = 1;
lava.px_platformHeight = 66;

lava.px_minWidth = lava.px_leftWidth + lava.px_rightWidth;

//set to false to show the bounding boxes
lava.boundingBox = true;

