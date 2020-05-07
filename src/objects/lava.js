import {lava} from "../definitions/lava_definition.js";
import {createPlatform} from "./platform.js";

export function createLava( world , xPos , yPos , width ) {
    createPlatform(world, xPos , yPos , width, lava);
}