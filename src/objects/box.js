//Created a file for making dynamic boxes.

import {barrel} from "../obj_definitions/barrel_definition.js";
import {phy2px} from "../scale.js";

export function createBox(world, position, definition) {
    console.log(definition.type + " created");
    //Make the platform as an object
    const box = world.createDynamicBody(position);

    //Fix the platform to the world with a width and fixed height of 0.25
    box.createFixture(planck.Box(definition.width_phy, definition.height_phy),definition.density);


/*console.log("before loading");
    //When the image loads, run the function...
    definition.objImage.onload = () => {
        console.log("loaded image");
        box.render = {
            custom: (fixture, ctx, pos, size, custom_def=definition) => {
                ctx.drawImage(custom_def.objImage, pos.x, pos.y, size.width, size.height);
                return custom_def.boundingBox; // don't draw bounding box
            }
        }
    };
    //return box;*/

    box.render = {
        custom: (fixture, ctx, pos, size, def = definition) => {
            if (def.objImage.complete) {
                ctx.drawImage(def.objImage, pos.x, pos.y ,
                    def.width_phy*2, def.height_phy*2);
            }
            return def.boundingBox;

        }
    };
}
