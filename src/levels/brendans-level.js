//Brendan's Level
import { Vec2, Box } from "../planck-module.js";
import { createPlatform } from '../objects/platform.js';
import {grass} from "../definitions/grass_definition.js";
import {createBox} from '../objects/box.js';
import {createDoor} from "../objects/door.js"


//Constant Setting
const friction = 0.6;
const density = 0.0;


//Create the Level
export function createLevel(world) {

    //Give it properties i.e. Density/Gravity (not used with createPlatform)
    var groundFD = {density: density, friction: friction};

    //Create a platform
    createPlatform(world, 10,10,20,grass);
    createPlatform(world, -10, 5, 10, grass);
    createPlatform(world, 9, 0, 5, grass);
    return createDoor(world, Vec2(-10,0));
    return createBox(world, Vec2(0,0),10,10);
}