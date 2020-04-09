import Renderer, { Runner } from 'https://cdn.jsdelivr.net/npm/planck-renderer@2.2.0/dist/renderer.min.js';
import { createExplorer } from "./explorer.js";
import { Vec2, Box } from "./planck-module.js";
import { doKeyDown , doKeyUp , applyImpulse , desiredVerticalVelocity, desiredHorizontalVelocity } from './movement.js';
import { createCanvas, createContext, getClipRect, clearCanvas} from "./canvas.js";
import {scale} from "./scale.js"

//Import available levels
import { createLevel as defaultLevel } from './default_level.js';
import { createLevel as brendanLevel } from './brendans-level.js';
import { createLevel as josiaLevel } from './Josias-orginal-level.js';
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
        gravity : Vec2(0, 40)
    });

    // create the ground
    levels[params.level](world);

    return world;
}

// canvas and graphics context
const canvas = createCanvas();
const ctx = createContext(canvas);

// key bindings
document.onkeydown = doKeyDown ;
document.onkeyup = doKeyUp ;

// create the world
var params = parseHtmlParameters();
const world = createWorld( params );
const explorer = createExplorer(world);

// handle collisions
world.on('begin-contact', function(contact) {
    var fixtureA = contact.getFixtureA();
    var fixtureB = contact.getFixtureB();

    // count floor contacts
    if (fixtureA === explorer.footSensor || fixtureB === explorer.footSensor ) {
        explorer.numFootContacts += 1;
    }
});

world.on('end-contact', function(contact) {
    var fixtureA = contact.getFixtureA();
    var fixtureB = contact.getFixtureB();

    // count floor contacts
    if (fixtureA === explorer.footSensor || fixtureB === explorer.footSensor ) {
        explorer.numFootContacts -= 1;
    }
});

//creating background
const backgroundimg = new Image();
backgroundimg.src = "images/game background tile.png";
backgroundimg.onload = () => {
    world.background=backgroundimg;
};

const backgroundmidimg = new Image();
backgroundmidimg.src = "images/backgroundmid.png";
backgroundmidimg.onload = () => {
    world.backgroundmid = backgroundmidimg;
};

// create a renderer
const renderer = new Renderer(world, ctx, {
    scale: scale
});

renderer.clear = (canvas, ctx) => {};

// create the runner
const runner = new Runner(world, {
    speed: 1,
    fps: 60,
});

// start the runner
var trans= ctx.getTransform();
runner.start(
    () => {
        // Move the explorer
        applyImpulse(explorer);

        //get the current clip rect
        var cliprect = getClipRect(ctx);

        // clear the canvas
        clearCanvas(ctx);

        // draw the background
        var pos = explorer.getPosition();
        ctx.setTransform(trans.a,trans.b,trans.c,trans.d,trans.e-(pos.x*scale), trans.f-(pos.y*scale));
        //console.log( ctx.getTransform());

        if(world.background) {
            var cliprectpos = cliprect.x+(cliprect.width / 2)
            var backgroundrenderpos = cliprectpos / backgroundimg.width

            var backgroundrenderposleft = (Math.floor(backgroundrenderpos)) * 2516
            var backgroundrenderposright = (Math.ceil(backgroundrenderpos)) * 2516
            if((backgroundrenderpos-Math.floor(backgroundrenderpos))<0.5){
                var backgroundrenderposleft = ((Math.floor(backgroundrenderpos))*2516)-2516
                var backgroundrenderposright = (Math.floor(backgroundrenderpos))*2516

            }
            ctx.drawImage(world.background, backgroundrenderposleft, (-canvas.height / 2)+(pos.y*scale)*0.9, backgroundimg.width, backgroundimg.height)
            ctx.drawImage(world.background, backgroundrenderposright, -canvas.height / 2+(pos.y*scale)*0.9, backgroundimg.width, backgroundimg.height)


        };
        if(world.backgroundmid)(



            ctx.drawImage(world.backgroundmid, (-canvas.width/2)+((pos.x*scale)*0.1), (-canvas.height/2)+100, canvas.width, canvas.height )
        );
        renderer.renderWorld();
    });

