import { Vec2, Box } from "./planck-module.js";

//Brendan's Level, based upon default_level.js


import { createPlatform } from './platform.js';

const friction = 0.6;
const density = 0.0;

export function createLevel(world) {
    var groundFD = {density: density, friction: friction};

    createPlatform(world,Vec2(0,0),10);
    createPlatform(world,Vec2(-20,-4),1);
}