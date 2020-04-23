import {px2phy,phy2px} from "./scale.js";
import {Vec2} from "./planck-module.js"
import {Box} from "./planck-module.js";

const px_width=144;
const px_height=160;

const doorimg = new Image();
doorimg.src = "images/door.png";

export function createDoor(world, position) {
    const door = world.createBody(Vec2(position.x,position.y));
    door.createFixture(planck.Box(px2phy(px_width/2),px2phy(px_height/2)), 0.0);
    door.drawingLayer = 1 ;
    door.render = {
        custom: (fixture, ctx, pos, size) => {
            if (doorimg.complete) {
                if (fixture === door.doorSensor ) {  return true; }
                ctx.drawImage(doorimg, pos.x, pos.y ,
                    px2phy(doorimg.width), px2phy(doorimg.height));
            }
            return false;
        }
    }

    // add a sensor
    door.doorSensor = door.createFixture({
        shape: planck.Box(px2phy(px_width/2),px2phy(px_height/2), Vec2(0,0) ),
        isSensor: true,
    });

    return door;
}
