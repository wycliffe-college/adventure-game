import { Vec2, Box } from "../planck-module.js";
import { createPlatform } from '../objects/platform.js';
import { createLava } from "../objects/lava.js";
import {grass} from "../definitions/grass_definition.js";
import {createDoor} from "../objects/door.js"
import {createBox} from "../objects/box.js";

export function createLevel(world) {
    createPlatform(world, -10,-4, 5,grass);
    createPlatform(world, 0,0, 10,grass);
    createPlatform(world, 50,-8, 50,grass);
    const wall = world.createBody(Vec2(-10,0));
    wall.createFixture(planck.Box(2,10,0))
    wall . edge = wall.createFixture({
        shape: Box(5, 10, 2.1, 0),
        isSensor: false,
        friction: 0
    })
    createBox(world, Vec2(5,-3),2,2, 10);


    createLava(world, 0, 10, 40);

    var door = createDoor(world , Vec2(25,-12) );





    var segmentDef = {};
    segmentDef.density = 20.0;
    segmentDef.friction = 0.2;
    segmentDef.filterCategoryBits = 0x0001;
    segmentDef.filterMaskBits = 0xFFFF & ~0x0002;

    var segmentJointDef = {};
    segmentJointDef.collideConnected = false;

    var N = 10;
    var y = -25.0;

    var prevBody = wall;
    for (var i = 0; i < N; ++i) {
        var shape = planck.Box(0.5, 0.125);
        var bd = {};
        bd.type = 'dynamic';
        bd.position = Vec2(0.5 + 1.0 * i, y);
        if (i === N - 1) {
            shape = planck.Box(1.5, 1.5);
            segmentDef.density = 100.0;
            segmentDef.filterCategoryBits = 0x0002;
            bd.position = Vec2(1.0 * i, y);
            bd.angularDamping = 0.4;
        }

        var body = world.createBody(bd);

        body.createFixture(shape, segmentDef);

        var anchor = Vec2(i, y);
        world.createJoint(planck.RevoluteJoint(segmentJointDef, prevBody, body, anchor));

        prevBody = body;
    }

    var ropeJointDef = {};
    ropeJointDef.maxLength = N - 1.0 + 0.01;
    ropeJointDef.localAnchorA = Vec2(-10.0, y);
    ropeJointDef.localAnchorB = Vec2(-10, 0);
    var rope = world.createJoint(planck.RopeJoint(ropeJointDef, wall, prevBody));



    rope = world.createJoint(planck.RopeJoint(ropeJointDef, wall, prevBody));

    return door;
}
