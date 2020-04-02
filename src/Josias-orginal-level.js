//Josia's Level, based upon Brendan's Level, based upon level1.js

const friction = 10.0;
const density = 10.0;

export function createLevel(world) {
    var groundFD = {density: density, friction: friction};

<<<<<<< HEAD
    world.createBody().createFixture(planck.Edge(Vec2(0.0, -100.0), Vec2(0.0, 100.0)), groundFD);
    world.createBody().createFixture(planck.Edge(Vec2(0.0, -100.0), Vec2(0.0, 100.0)), groundFD)
=======
    world.createBody(Vec2(0,0)).createFixture(planck.Box(20.0, 0.25), groundFD);

    world.createBody().createFixture(planck.Edge(Vec2(0.0, -100.0), Vec2(0.0, 100.0)), groundFD);
    world.createBody().createFixture(planck.Edge(Vec2(0.0, -100.0), Vec2(0.0, 100.0)), groundFD);
>>>>>>> the thing forced me to write a comment
}