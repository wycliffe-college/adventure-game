//The attributes for the defn platform

export function createDefinition() {
    var defn = Object();
    
    //Left stuff
    defn.leftImage = new Image();
    defn.leftImage.src = '';
    defn.px_leftWidth = 0;
    
    //Right stuff
    defn.rightImage = new Image();
    defn.rightImage.src = '';
    defn.px_rightWidth = 0;
    
    //centre stuff
    defn.centreImage = new Image();
    defn.centreImage.src = '';
    defn.px_centreWidth = 0;
    
    //Misc vars.
    defn.verticalOffset = 0;
    
    defn.friction = 1; //Default friction, keep same usually.
    defn.px_platformHeight = 45; //Keep same usually, this is the height of each platform part
    
    defn.px_minWidth = defn.px_leftWidth + defn.px_rightWidth; //Dont change
    
    //Portal Stuff
    defn.portalImage = new Image();
    defn.portalImage.src = '';
    defn.portalWidth_px = 0;
    defn.portalHeight_px = 0;


    //set to false to hide the bounding boxes
    defn.boundingBox = true;

    //type
    defn.platform_type = "platform";

    //contact handler
    defn.contactHandler = function(world) { };

    return defn;
}
