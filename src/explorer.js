var explorer = {
    create: function(world)
    {
        var explorer = world.createDynamicBody(Vec2(0.0, 1.0));
        explorer.createFixture(planck.Polygon([
            Vec2(-1.5, -0.5),
            Vec2(1.5, -0.5),
            Vec2(1.5, 0.0),
            Vec2(0.0, 0.9),
            Vec2(-1.15, 0.9),
            Vec2(-1.5, 0.2)
        ]), 1.0);

        return explorer;
    },
};