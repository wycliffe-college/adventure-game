export function createLevel(world) {
    var ground = world.createBody();
    var groundFD = {density: 0.0, friction: 0.6};
    ground.createFixture(planck.Edge(Vec2(-10.0, 0.0), Vec2(10.0, 0.0)), groundFD);
    ground.createFixture(planck.Edge(Vec2(-20.0, -5.0), Vec2(-10.0, -5.0)), groundFD);

    return ground;
}
