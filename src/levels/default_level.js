import { Vec2, Box } from "../planck-module.js";
import { createPlatform } from '../objects/platform.js';
import {grass} from "../definitions/grass_definition.js";

import {createDoor} from "../objects/door.js"

export function createLevel(world) {
    createPlatform(world, -10,-4, 5,grass);
    createPlatform(world, 0,0, 10,grass);
    createPlatform(world, 15,-8, 20,grass);



    var door = createDoor(world , Vec2(25,-12) );
    return door;
}
