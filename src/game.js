import { CanvasRenderer as Renderer } from './renderer-canvas.js';
import { Runner } from './renderer-run.js';
import { createExplorer } from "./explorer.js";
import { Vec2, Box } from "./planck-module.js";
import { doKeyDown , doKeyUp , applyImpulse , desiredVerticalVelocity, desiredHorizontalVelocity } from './movement.js';
import { createCanvas, createContext, getClipRect, clearCanvas} from "./canvas.js";
import {scale} from "./scale.js"

//Import available levels
import { createLevel as defaultLevel } from './default_level.js';
import { createLevel as brendanLevel } from './brendans-level.js';
import { createLevel as ParkerLevel } from './Parker_level.js';
import { createLevel as josiaLevel } from './Josias-orginal-level.js';
var levels = { "default" : defaultLevel , "josia":josiaLevel , "brendan" :brendanLevel , "Parker" :ParkerLevel};

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
    console.log(params);
    return params;
}

function createWorld(params) {
    // initialise the world with gravity towards the bottom of the screen
    var world = new planck.World({
        gravity : Vec2(0, 40)
    });

    // create the ground
    world.door = levels[params.level](world);

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
    if( world.door != undefined ) {
        if ((fixtureA === world.door.doorSensor && fixtureB === explorer.mainFixture) ||
            (fixtureB === world.door.doorSensor && fixtureA === explorer.mainFixture)) {
            window.location = "game.html?level=brendan";
        }
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
backgroundimg.src = "images/seamlessmountain.jpg";
backgroundimg.onload = () => {
    world.background=backgroundimg;
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
            var backgroundrenderpos = cliprectpos / (canvas.height* 2.36686391) /50


            var backgroundrenderposleft = (Math.floor(backgroundrenderpos)) * (canvas.height* 2.36686391)
            var backgroundrenderposright = (Math.ceil(backgroundrenderpos)) * (canvas.height* 2.36686391)
            if((backgroundrenderpos-Math.floor(backgroundrenderpos))<0.5 ){
                var backgroundrenderposleft = ((Math.floor(backgroundrenderpos))*canvas.height* 2.36686391)-(canvas.height* 2.36686391)
                var backgroundrenderposright = (Math.floor(backgroundrenderpos))*(canvas.height* 2.36686391)

            }
            ctx.drawImage(world.background, backgroundrenderposleft+(((pos.x*scale*50)-pos.x*scale)/50), (-canvas.height / 2)+(pos.y*scale)*0.9, canvas.height* 2.36686391, canvas.height)
            ctx.drawImage(world.background, backgroundrenderposright+(((pos.x*scale*50)-pos.x*scale)/50), -canvas.height / 2+(pos.y*scale)*0.9, canvas.height* 2.36686391, canvas.height)
        }

        renderer.renderWorld(cliprect);
    });
