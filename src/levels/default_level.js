import { Vec2, Box } from "../planck-module.js";
import {createPlatform} from "../grassplatform.js";
import {createDoor} from "../objects/door.js"

export function createLevel(world) {
    createPlatform(world, Vec2(-10,-4), 5);
    createPlatform(world, Vec2(0,0), 10);
    createPlatform(world, Vec2(15,-8), 20);
    var door = createDoor(world , Vec2(25,-12) );
    return door;
}
