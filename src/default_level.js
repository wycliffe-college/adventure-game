import { Vec2, Box } from "./planck-module.js";
import { createPlatform } from './platform.js';
import {grass} from "./grass_definition.js";
import {lava} from "./lava_definition.js";
import {createDoor} from "./leveldoor.js"

export function createLevel(world) {
    createPlatform(world, -10,-4, 5,grass);
    createPlatform(world, 0,0, 10,grass);
    createPlatform(world, 15,-8, 20,grass);

    createPlatform(world, 0, 10, 40, lava);

    var door = createDoor(world , Vec2(25,-12) );
    return door;
}
