import { Vec2, Box } from "../planck-module.js";
import { createPlatform } from '../objects/platform.js';
import { createLava } from "../objects/lava.js";
import {grass} from "../definitions/grass_definition.js";
import {createDoor} from "../objects/door.js"
import {createBox} from "../objects/box.js";
import {defaultObject} from "../obj_definitions/blank_object_defn.js";


export function createLevel(world) {
    createPlatform(world, -10,-4, 5,grass);
    createPlatform(world, 0,0, 10,grass);
    createPlatform(world, 50,-8, 50,grass);
    const wall = world.createBody(Vec2(-5,0));
    wall.createFixture(planck.Box(2,5,0))
    wall . edge = wall.createFixture({
        shape: Box(5, 5, 2.1, 0),
        isSensor: false,
        friction: 1
    });
    createBox(world, Vec2(-5,-7),defaultObject);


    createLava(world, 0, 10, 40);

    var segmentDef = {};
    segmentDef.density = 1000;
    segmentDef.friction = 0;
    segmentDef.filterCategoryBits = 0x0001;
    segmentDef.filterMaskBits = 0xFFFF & ~0x0002;

    var segmentJointDef = {};
    segmentJointDef.collideConnected = false;

    var N = 17;
    var y = -25.0;

    var prevBody = wall;
    for (var i = 0; i < N; ++i) {
        var shape = planck.Box(0.5, 0.125);
        var bd = {};
        bd.type = 'dynamic';
        bd.position = Vec2(0.5 + 1.0 * i, y);
        if (i === N - 1) {
            shape = planck.Box(1.5, 1.5);
            segmentDef.density = 10.0;
            segmentDef.filterCategoryBits = 0x0002;
            bd.position = Vec2(1.0 * i, y);
            bd.angularDamping = 10;
        }

        var body = world.createBody(bd);

        body.createFixture(shape, segmentDef);

        var anchor = Vec2(i, y);
        world.createJoint(planck.RevoluteJoint(segmentJointDef, prevBody, body, anchor));

        prevBody = body;
    }


    var door = createDoor(world , Vec2(25,-12),grass);
    return door;
}
