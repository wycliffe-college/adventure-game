//Brendan's Level, based upon level1.js

const friction = 0.6
const density = 0.0

export function createLevel(world) {
    var ground = world.createBody();
    var groundFD = {density: density, friction: friction};

    ground.createFixture(planck.Edge(Vec2(-20.0, 0.0), Vec2(30.0, 0.0)), groundFD);

    return ground;