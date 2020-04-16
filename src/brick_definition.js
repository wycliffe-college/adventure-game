//The attributes for the brick platform

var brick = Object();
//Left stuff
brick.leftImage = new Image().src = 'address';
brick.px_leftWidth = 0;

brick.rightImage = new Image().src = 'address';
brick.px_rightWidth = 0;

brick.centreImage = new Image().src = 'address';
brick.px_centreWidth = 0;

brick.verticalOffset = 0;

brick.friction = 0;
brick.px_platformHeight = 0;

brick.px_minWidth = brick.px_leftWidth + brick.px_rightWidth;
