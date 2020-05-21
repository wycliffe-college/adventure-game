import { Vec2, Box } from "../planck-module.js";
import { createPlatform } from '../objects/platform.js';
import { createLava } from "../objects/lava.js";
import {grass} from "../definitions/grass_definition.js";
import {createDoor} from "../objects/door.js"

export function createLevel(world) {
    createPlatform(world, -10,-4, 5,grass);
    createPlatform(world, 0,0, 10,grass);
    createPlatform(world, 50,-8, 50,grass);
    const wall = world.createBody(Vec2(-10,0));
    wall.createFixture(planck.Box(2,10,0))
    wall . edge = wall.createFixture({
        shape: Box(5, 10, 2.1, 0),
        isSensor: false,
        friction: 0
    })


    createLava(world, 0, 10, 40);

    var door = createDoor(world , Vec2(25,-12) );
    return door;
}
