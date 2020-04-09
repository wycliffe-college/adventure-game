//Brendan's Level
import { Vec2, Box } from "./planck-module.js";
import { createPlatform } from './platform.js';
import {createBox} from './box.js';


//Constant Setting
const friction = 0.6;
const density = 0.0;


//Create the Level
export function createLevel(world) {

    //Give it properties i.e. Density/Gravity (not used with createPlatform)
    var groundFD = {density: density, friction: friction};

    //Create a platform
    createPlatform(world, Vec2(-2,0), 8);

    createPlatform(world, Vec2(-10,-3), 3);

    createPlatform(world, Vec2(3,-5), 2);

    createBox(world, Vec2(0, -20), 1, 1);

    //world.createBody(Vec2(-10,-10)).createFixture(planck.Box(1.0, 0.25), groundFD);
}