import { Vec2, Box } from "./planck-module.js";

//Brendan's Level, based upon level1.js

const friction = 0.6;
const density = 0.0;

export function createLevel(world) {
    var groundFD = {density: density, friction: friction};

    world.createBody(Vec2(0,0)).createFixture(planck.Box(20.0, 0.25), groundFD);

    world.createBody().createFixture(planck.Edge(Vec2(-1.0, 0.0), Vec2(-1.0, 10.0)), groundFD);
    world.createBody().createFixture(planck.Edge(Vec2(-2.0, 0.0), Vec2(-2.0, 10.0)), groundFD);
    world.createBody().createFixture(planck.Edge(Vec2(-3.0, 0.0), Vec2(-3.0, 10.0)), groundFD);
    world.createBody().createFixture(planck.Edge(Vec2(-4.0, 0.0), Vec2(-4.0, 10.0)), groundFD);
}