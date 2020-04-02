//Josia's Level, based upon Brendan's Level, based upon level1.js

const friction = 0.6;
const density = 0.0;

export function createLevel(world) {
    var groundFD = {density: density, friction: friction};

    world.createBody().createFixture(planck.Edge(Vec2(-100.0, 0.0), Vec2(100.0, 0.0)), groundFD);
    world.createBody().createFixture(planck.Edge(Vec2(-10.0, 1.0), Vec2(-10.0, 5.0)), groundFD);
    world.createBody().createFixture(planck.Edge(Vec2(-20.0, 1.0), Vec2(-20.0, 5.0)), groundFD);
    world.createBody().createFixture(planck.Edge(Vec2(-30.0, 1.0), Vec2(-30.0, 5.0)), groundFD);
    world.createBody().createFixture(planck.Edge(Vec2(-40.0, 1.0), Vec2(-40.0, 5.0)), groundFD);
}