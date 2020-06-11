import { CanvasRenderer as Renderer } from './renderer-canvas.js';
import { Runner } from './renderer-run.js';
import { createExplorer } from "./explorer.js";
import { Vec2, Box } from "./planck-module.js";
import { doKeyDown , doKeyUp , applyImpulse , desiredVerticalVelocity, desiredHorizontalVelocity } from './movement.js';
import { createCanvas, createContext, getClipRect, clearCanvas} from "./canvas.js";
import {scale} from "./scale.js"
import { setupCollisionHandling } from "./collisions.js";

//Import available levels
import { createLevel as defaultLevel } from './levels/default_level.js';
import { createLevel as brendanLevel } from './levels/brendans-level.js';
import { createLevel as ParkerLevel } from './levels/Parker_level.js';
import { createLevel as josiaLevel } from './levels/Josias-orginal-level.js';
import { createLevel as jamesLevel } from './levels/james_level.js';
var levels = { "default" : defaultLevel , "brendan" :brendanLevel , "james" :jamesLevel };

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

    world.explorer = createExplorer(world);

    // setup collision handling
    setupCollisionHandling(world);

    //creating background
    const backgroundimg = new Image();
    backgroundimg.src = "images/seamlessmountain.jpg";
    backgroundimg.onload = () => {
        world.background=backgroundimg;
    };
    const foregroundimg = new Image();
    foregroundimg.src = "images/foreground.png";
    foregroundimg.onload = () => {
        world.foreground=foregroundimg;
    };

    return world;
}

function setupKeyBindings() {
    // setup key bindings
    document.onkeydown = doKeyDown;
    document.onkeyup = doKeyUp;
}

function createGraphicsRendererRunner(world) {
    var graphics = new Object();
    // create the canvas and graphics context
    graphics.canvas = createCanvas();
    graphics.ctx = createContext(graphics.canvas);

    // create graphics a renderer
    graphics.renderer = new Renderer(world, graphics.ctx, {
        scale: scale,
    });

    graphics.renderer.clear = (canvas, ctx) => {};

    // create the graphics main loop (runner)
    graphics.runner = new Runner(world, {
        speed: 1,
        fps: 60,
    });

    graphics.initialtrans = graphics.ctx.getTransform();
    return graphics ;
}

function renderCore( graphics, world ){
    const ctx = graphics.ctx ;
    const canvas = graphics.canvas ;

    // Move the explorer
    applyImpulse(world.explorer);

    //get the current clip rect
    var cliprect = getClipRect(ctx);

    // clear the canvas
    clearCanvas(ctx);

    // draw the background
    var pos = world.explorer.getPosition();
    ctx.setTransform(graphics.initialtrans.a,graphics.initialtrans.b,graphics.initialtrans.c,graphics.initialtrans.d,
        graphics.initialtrans.e-(pos.x*scale), graphics.initialtrans.f-(pos.y*scale));
    //console.log( ctx.getTransform());

    if(world.background) {
        var cliprectpos = cliprect.x+(cliprect.width / 2)
        var ratio = world.background.width / world.background.height
        var backgroundrenderpos = cliprectpos / (canvas.height* ratio) /50


        var backgroundrenderposleft = (Math.floor(backgroundrenderpos)) * (canvas.height* ratio)
        var backgroundrenderposright = (Math.ceil(backgroundrenderpos)) * (canvas.height*ratio)
        if((backgroundrenderpos-Math.floor(backgroundrenderpos))<0.5 ){
            var backgroundrenderposleft = ((Math.floor(backgroundrenderpos))*canvas.height* ratio)-(canvas.height*ratio)
            var backgroundrenderposright = (Math.floor(backgroundrenderpos))*(canvas.height* ratio)

        }
        ctx.drawImage(world.background, backgroundrenderposleft+(((pos.x*scale*50)-pos.x*scale)/50), (-canvas.height / 2)+(pos.y*scale)*0.9, canvas.height* ratio, canvas.height)
        ctx.drawImage(world.background, backgroundrenderposright+(((pos.x*scale*50)-pos.x*scale)/50), -canvas.height / 2+(pos.y*scale)*0.9, canvas.height* ratio, canvas.height)
    }
    if(world.foreground) {
        var cliprectpos = cliprect.x+(cliprect.width / 1.2)
        var ratio = world.foreground.width / world.foreground.height
        var foregroundrenderpos = cliprectpos / (canvas.height* ratio/1.2)/10
        var renderleft = foregroundrenderpos-1

        var backgroundrenderposmid =   Math.floor(foregroundrenderpos)* (canvas.height* ratio/1.2)
        var backgroundrenderposleft = (Math.floor(renderleft)) *(canvas.height* ratio/1.2)
        var backgroundrenderposright = Math.ceil(foregroundrenderpos)*(canvas.height* ratio/1.2)

        ctx.drawImage(world.foreground, backgroundrenderposleft+(((pos.x*scale*5)-pos.x*scale)/5), -canvas.height / 2+(((pos.y*scale*5)-pos.y*scale)/5) +(canvas.height/4), canvas.height* ratio/1.2, canvas.height/1.2)
        ctx.drawImage(world.foreground, backgroundrenderposright+(((pos.x*scale*5)-pos.x*scale)/5),-canvas.height / 2+(((pos.y*scale*5)-pos.y*scale)/5) +(canvas.height/4), canvas.height* ratio/1.2 , canvas.height/1.2)
        ctx.drawImage(world.foreground, backgroundrenderposmid+(((pos.x*scale*5)-pos.x*scale)/5), -canvas.height / 2+(((pos.y*scale*5)-pos.y*scale)/5)+(canvas.height/4) ,canvas.height* ratio/1.2, canvas.height/1.2)
    }
    graphics.renderer.renderWorld(cliprect)
}

// create the world
var params = parseHtmlParameters();
var world = createWorld( params );
var graphics = createGraphicsRendererRunner(world);
setupKeyBindings() ;

// start the runner
graphics.runner.renderer( function() { renderCore( graphics , world ); } )
graphics.runner.start( );

