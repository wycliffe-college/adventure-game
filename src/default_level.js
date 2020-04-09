import { Vec2, Box } from "./planck-module.js";
import {createPlatform} from "./glassplatform.js";

export function createLevel(world) {
    var ground = world.createBody();
    var groundFD = {density: 0.0, friction: 0.6};
    createPlatform(world, Vec2(-10,-4), 5);
    createPlatform(world, Vec2(0,0), 10);
    createPlatform(world, Vec2(15,-8), 20);
    return ground;
}
