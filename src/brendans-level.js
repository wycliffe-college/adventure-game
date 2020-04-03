//Brendan's Level, based upon level1.js


import { createPlatform } from './platform.js';

const friction = 0.6;
const density = 0.0;

export function createLevel(world) {
    var groundFD = {density: density, friction: friction};

    createPlatform(world,Vec2(0,0),10);

    world.createBody(Vec2(-10,-10)).createFixture(planck.Box(1.0, 0.25), groundFD);
}