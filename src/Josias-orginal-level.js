//Josia's Level, based upon Brendan's Level, based upon level1.js

const friction = 10.0;
const density = 10.0;

export function createLevel(world) {
    var groundFD = {density: density, friction: friction};

    world.createBody().createFixture(planck.Edge(Vec2(0.0, -100.0), Vec2(0.0, 100.0)), groundFD);
    world.createBody().createFixture(planck.Edge(Vec2(0.0, -100.0), Vec2(0.0, 100.0)), groundFD)
}