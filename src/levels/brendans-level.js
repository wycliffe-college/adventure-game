//Brendan's Level
import { Vec2, Box } from "../planck-module.js";
import { createPlatform } from '../objects/platform.js';
import {grass} from "../definitions/grass_definition.js";
import {createBox} from '../objects/box.js';
import {createDoor} from "../objects/door.js";
import {createObtainable} from "../objects/obtainable.js"


//Constant Setting
const friction = 0.6;
const density = 0.0;

//Create the Level
export function createLevel(world) {

    //Give it properties i.e. Density/Gravity (not used with createPlatform)
    var groundFD = {density: density, friction: friction};

    //Create platforms
    createPlatform(world, 8,10,20,grass); //Main large bottom platform
    createPlatform(world, -25, 7, 10, grass); //Left platform where box lands
    createPlatform(world, -10, 8, 1, grass); //single left platform to jump on before box platform
    createPlatform(world, 9, 2, 5, grass); //Upper single platform over main spawn
    createPlatform(world, -35, 5, 1, grass); //single platform to hold box from falling off
    createPlatform(world, -12, -5, 10, grass); //platform with door on it
    createBox(world, Vec2(-28,2),2,2, 10);
    createPlatform(world, -20, -2, 1, grass); //single platform attached to door plat left
    createPlatform(world, -3, -2, 1, grass); //single platform attached to door plat right


    createObtainable(world, Vec2(0,0));


    return createDoor(world, Vec2(-10,-8)); //Must be called last.

}