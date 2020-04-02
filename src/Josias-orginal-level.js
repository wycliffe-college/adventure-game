//Josia's Level, based upon Brendan's Level, based upon level1.js

const friction = 0.9;
const density = 0.5;

export function createLevel(world) {
    var groundFD = {density: density, friction: friction};

    world.createBody().createFixture(planck.Edge(Vec2(-100.0, 0.0), Vec2(100.0, 0.0)), groundFD)
}