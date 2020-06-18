import {px2phy, phy2px} from "../scale.js";
import {Vec2} from "../planck-module.js"
import {Box} from "../planck-module.js";

export function createDoor(world, position, definition) {

    const door = world.createBody(position);
    door.createFixture(planck.Box(px2phy(definition.portalWidth_px / 2), px2phy(definition.portalHeight_px / 2)), 0.0);
    door.drawingLayer = 1;

    door.contactHandler = function(world) {
        console.log( "touching the door" );
        if( world.nextLevelHandler !== undefined ) {
            world.nextLevelHandler();
        }
    }

    door.render = {
        custom: (fixture, ctx, pos, size, def = definition) => {
            if (def.portalImage.complete) {
                if (fixture === door.doorSensor ) {  return def.boundingBox; }
                ctx.drawImage(def.portalImage, pos.x, pos.y ,
                    px2phy(def.portalHeight_px), px2phy(def.portalWidth_px));
            }
            return def.boundingBox;
        }
    };

    // add a sensor
    door.doorSensor = door.createFixture({
        shape: planck.Box(px2phy(definition.portalWidth_px / 2), px2phy(definition.portalHeight_px / 2), 0.0),
        isSensor: true
    });

    return door;
}
