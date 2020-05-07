//The platform code.

import {Vec2} from "../planck-module.js"
import {phy2px, px2phy} from "../scale.js";
import {Box} from "../planck-module.js";

//This sets a default value for the definition
var definition = "definitions/grass_definition.js";

export function createPlatform(world, xPos, yPos, width, definition) {

    function left(world, xPos, yPos, left_definition) {
        const platform = world.createBody(Vec2(xPos,yPos));
        platform.createFixture(planck.Box(px2phy(left_definition.px_leftWidth / 2), px2phy(left_definition.px_platformHeight / 2)), 1.0)
        platform.edge = platform.createFixture({
            shape: Box(0.1,px2phy(left_definition.px_platformHeight / 2), Vec2(-px2phy(left_definition.px_leftWidth / 2 )-0.01 ,0 ), 0),
            isSensor: false,
            friction: 0
        })
        platform.render = {

            custom: (fixture, ctx, pos, size, custom_definition=left_definition) => {
                if (fixture == platform.edge )  {
                    // don't draw the foot sensor
                    return custom_definition.boundingBox;
                }
                //console.log(custom_definition);
                if (custom_definition.leftImage.complete) {
                    ctx.drawImage(custom_definition.leftImage, pos.x, pos.y + px2phy(custom_definition.verticalOffset),
                        px2phy(custom_definition.leftImage.width), px2phy(custom_definition.leftImage.height));
                }
                return custom_definition.boundingBox;
            }
        }
    }

    function centre(world, xPos, yPos, centre_definition) {
        const platform = world.createBody(Vec2(xPos,yPos));
        platform.createFixture(planck.Box(px2phy(centre_definition.px_centreWidth / 2), px2phy(centre_definition.px_platformHeight / 2)), 1.0);
        platform.render = {
            custom: (fixture, ctx, pos, size, custom_definition=centre_definition) => {
                //console.log(custom_definition);
                if (custom_definition.centreImage.complete) {
                    ctx.drawImage(custom_definition.centreImage, pos.x, pos.y + px2phy(custom_definition.verticalOffset),
                        px2phy(custom_definition.centreImage.width), px2phy(custom_definition.centreImage.height));
                }
                return custom_definition.boundingBox;
            }
        }
    }

    function right(world, xPos, yPos, right_definition) {
        const platform = world.createBody(Vec2(xPos,yPos));
        platform.createFixture(planck.Box(px2phy(right_definition.px_rightWidth / 2), px2phy(right_definition.px_platformHeight / 2)), 1.0);
        platform.edger = platform.createFixture({
            shape: Box(0.1,px2phy(right_definition.px_platformHeight / 2), Vec2(px2phy(right_definition.px_rightWidth / 2 )+0.01 ,0 ), 0),
            isSensor: false,
            friction: 0
        })
        platform.render = {
            custom: (fixture, ctx, pos, size, custom_definition=right_definition) => {
                if (fixture == platform.edger )  {
                    // don't draw the foot sensor
                    return custom_definition.boundingBox;
                }
                //console.log(custom_definition);
                if (custom_definition.rightImage.complete) {
                    ctx.drawImage(custom_definition.rightImage, pos.x, pos.y + px2phy(custom_definition.verticalOffset),
                        px2phy(custom_definition.rightImage.width), px2phy(custom_definition.leftImage.height));
                }
                return custom_definition.boundingBox;
            }
        }
    }

    //CALLING ALL THE FUNCTIONS:

    // calculate px width for platform
    var pxWidth = phy2px(width); //Takes the width from the createPlatform(param)

    //calculate the number of center pieces
    var numpieces = Math.round((pxWidth - definition.px_minWidth) / definition.px_centreWidth);
    console.log(numpieces);
    numpieces = Math.max(numpieces, 0);
    var offset = xPos - (width / 2); //Take xPos from the params input

    //create the starting piece
    offset += px2phy(definition.px_leftWidth / 2);
    left(world, offset, yPos, definition);
    offset += px2phy(definition.px_leftWidth / 2);

    //create the center pieces
    while (numpieces) {
        offset += px2phy(definition.px_centreWidth / 2);
        centre(world, offset, yPos, definition);
        offset += px2phy(definition.px_centreWidth / 2);
        numpieces--;
    }

    //create the final piece
    offset += px2phy(definition.px_rightWidth / 2);
    right(world, offset, yPos, definition);

}