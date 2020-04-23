//Brendan's Level
import { Vec2, Box } from "./planck-module.js";
import { createPlatform } from './platform.js';
import {brick} from "./grass_definition.js";
import {createBox} from './box.js';


//Constant Setting
const friction = 0.6;
const density = 0.0;


//Create the Level
export function createLevel(world) {

    //Give it properties i.e. Density/Gravity (not used with createPlatform)
    var groundFD = {density: density, friction: friction};

    //Create a platform
    createPlatform(world, 10,10,20,brick);
}