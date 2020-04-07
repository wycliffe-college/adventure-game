import Renderer, { Runner } from 'https://cdn.jsdelivr.net/npm/planck-renderer@2.2.0/dist/renderer.min.js';
import { createExplorer } from "./explorer.js";
import { Vec2, Box } from "./planck-module.js";
import { doKeyDown , doKeyUp , forceVector } from './bindings.js';

//Import available levels
import { createLevel as defaultLevel } from './level1.js';
import { createLevel as brendanLevel } from './brendans-level.js'; //comment out this code to add/remove brendan's level
import { createLevel as josiaLevel } from './Josias-orginal-level.js'; //comment out this code to add/remove Josia's level
var levels = { "default" : defaultLevel , "josia":josiaLevel , "brendan" :brendanLevel };

// Function to parse the url data into parameters
function parseHtmlParameters()
{
    //Add parameters and their default values to this dictionary
    var params = {"level":"default"};

    var parameters = location.search.substring(1).split("&");
    var index;
    for (index = 0; index < parameters.length; index++) {
        var temp = parameters[0].split("=");
        if ( unescape(temp[0]) in params ) {
            params[unescape(temp[0])] = unescape(temp[1]);
        }
    }
    return params;
}

function createWorld(params) {
    // initialise the world with gravity towards the bottom of the screen
    var world = new planck.World({
        gravity : Vec2(0, 10)
    });

    // create the ground
    levels[params.level](world);
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
var params = parseHtmlParameters();
const world = createWorld( params );
const explorer = createExplorer(world);

//creating background
const backgroundimg = new Image();
backgroundimg.src = "images/background.png";
backgroundimg.onload = () => {
    world.background=backgroundimg;
};

const backgroundmidimg = new Image();
backgroundmidimg.src = "images/backgroundmid.png";
backgroundmidimg.onload = () => {
    world.backgroundmid = backgroundmidimg;
};

// create a renderer
const scale = 30;
const renderer = new Renderer(world, ctx, {
    scale: scale
});

renderer.clear = (canvas, ctx) => {

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
        //console.log( ctx.getTransform());
        ctx.clearRect(
            -canvas.width / 2,
            -canvas.height / 2,
            canvas.width,
            canvas.height
        );
        if(world.background)(
            ctx.drawImage(world.background, (-canvas.width/2)+((pos.x*scale)*0.1), -canvas.height/2, canvas.width, canvas.height )
        );
        if(world.backgroundmid)(
            ctx.drawImage(world.backgroundmid, (-canvas.width/2)+((pos.x*scale)*0.01), (-canvas.height/2)+100, canvas.width, canvas.height )
        );
        renderer.renderWorld();
    });

