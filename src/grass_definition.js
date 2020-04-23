//The attributes for the brick platform

export var brick = Object();

//Left stuff
brick.leftImage = new Image();
brick.leftImage.src = 'images/grassleft.png';
brick.px_leftWidth = 60;

//Right stuff
brick.rightImage = new Image();
brick.rightImage.src = 'images/grassright.png';
brick.px_rightWidth = 64;

//centre stuff
brick.centreImage = new Image();
brick.centreImage.src = 'images/grasscenter.png';
brick.px_centreWidth = 289;

//Misc vars.
brick.verticalOffset = -80;

brick.friction = 1;
brick.px_platformHeight = 100;

brick.px_minWidth = brick.px_leftWidth + brick.px_rightWidth;


//set to false to show the bounding boxes
brick.boundingBox = true;
