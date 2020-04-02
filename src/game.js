const { World, Vec2, Box, Edge, Circle, RevoluteJoint, Polygon } = planck;

import Renderer, { Runner } from 'https://cdn.jsdelivr.net/npm/planck-renderer@2.2.0/dist/renderer.min.js';
import { createExplorer } from "./explorer.js";
import { doKeyDown , doKeyUp , forceVector } from './bindings.js';
//import { createLevel } from './level1.js';
import { createLevel } from './brendans-level.js'; //comment out this code to add brendans level

function createWorld() {
    // initialise the world with gravity towards the bottom of the screen
    var world = new planck.World({
        gravity : Vec2(0, 10)
    });

    // create the ground
    createLevel(world);
    return world;
}

// canvas and graphics context
const canvas = document.querySelector('#test');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
ctx.translate(canvas.width / 2, canvas.height/2); //finds center of screen

// key bindings
document.onkeydown = (e) => { doKeyDown(e,explorer) };
document.onkeyup = doKeyUp;

// create the world
const world = createWorld();
const explorer = createExplorer(world);

// create a renderer
const scale = 30;
const renderer = new Renderer(world, ctx, {
    scale: scale
});

renderer.clear = (canvas, ctx) => {
    ctx.clearRect(
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
    );
};

// create the runner
const runner = new Runner(world, {
    speed: 1,
    fps: 60,
});

// start the runner
var trans= ctx.getTransform();
runner.start(
    () => {
        explorer.applyForceToCenter(forceVector,true);
        var pos = explorer.getPosition();
        ctx.setTransform(trans.a,trans.b,trans.c,trans.d,trans.e-(pos.x*scale), trans.f);
        console.log( ctx.getTransform());
        renderer.renderWorld();
    });

