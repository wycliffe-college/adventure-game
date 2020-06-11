//Brendan's Level
import { Vec2, Box } from "../planck-module.js";
import { createPlatform } from '../objects/platform.js';
import {ruined_forest} from "../definitions/ruined_forest_definition.js";
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
    createPlatform(world, 5,10,20,ruined_forest); //Main large bottom platform
    createPlatform(world, -19, 5, 10, ruined_forest); //Left platform where box lands
    createPlatform(world, -10, 8, 1, ruined_forest); //single left platform to jump on before box platform
    createPlatform(world, 6, 2, 5, ruined_forest); //Upper medium sized platform over main spawn
    createPlatform(world, -26, 2, 2, ruined_forest); //single platform to hold box from falling off
    createPlatform(world, -9, -4, 10, ruined_forest); //platform with door on it
    createBox(world, Vec2(-16,2),1,1.5, 50, "./images/barrel.png", ruined_forest);
    createBox(world, Vec2(5,1),1,1.5, 50, "./images/barrel.png", ruined_forest);
    createBox(world, Vec2(10,5),1,1.5, 50, "./images/barrel.png", ruined_forest);
    createBox(world, Vec2(11,5),1,1.5, 50, "./images/barrel.png", ruined_forest);
    createBox(world, Vec2(9,8),1,1.5, 50, "./images/barrel.png", ruined_forest);
    createPlatform(world, -15.5, -3, 1, ruined_forest); //single platform attached to door plat left
    createPlatform(world, -3, -2, 1, ruined_forest); //single platform attached to door plat right


    //createObtainable(world, Vec2(0,0));


    return createDoor(world, Vec2(-9,-8.2), ruined_forest); //Must be called last. (??)

}