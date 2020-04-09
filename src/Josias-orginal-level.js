import { Vec2, Box } from "./planck-module.js";
//Josia's Level, based upon Brendan's Level, based upon default_level.js

const friction = 15.0;
const density = 1.0;

export function createLevel(world) {
    var groundFD = {density: density, friction: friction};

    world.createBody(Vec2(0,0)).createFixture(planck.Box(20.0, 0.25), groundFD);

    world.createBody().createFixture(planck.Edge(Vec2(0.0, -10.0), Vec2(0.0, 10.0)), groundFD);
    world.createBody().createFixture(planck.Edge(Vec2(-100.0, 0.0), Vec2(100.0, 0.0)), groundFD);
}