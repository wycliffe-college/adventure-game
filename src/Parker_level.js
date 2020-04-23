import { Vec2, Box } from "./planck-module.js";
import {createPlatform} from "./grassplatform.js";

export function createLevel(world) {
    var ground = world.createBody();
    var groundFD = {density: 0.0, friction: 0.6};
    createPlatform(world, Vec2(0,0), 10);
    createPlatform(world, Vec2(5,-5), 10);

    return ground;
}
