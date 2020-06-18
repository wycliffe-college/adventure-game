import {CanvasRenderer as Renderer} from './renderer-canvas.js';
import {Runner} from './renderer-run.js';
import {createExplorer} from "./explorer.js";
import {Vec2} from "./planck-module.js";
import {applyImpulse, doKeyDown, doKeyUp} from './movement.js';
import {clearCanvas, createCanvas, createContext, getClipRect} from "./canvas.js";
import {scale} from "./scale.js"
import {setupCollisionHandling} from "./collisions.js";
//Import available levels
import {createLevel as defaultLevel} from './levels/default_level.js';
import {createLevel as brendanLevel} from './levels/brendans-level.js';
import {createLevel as jamesLevel} from './levels/james_level.js';
import {renderBackground} from "./background.js";

var levels = { "default" : defaultLevel , "brendan" :brendanLevel , "james" :jamesLevel };
var levelorder = ["default" , "brendan" , "james"];
var world = 0;
var graphics = 0;

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

function nextLevel() {
    // find the next level
    var nextlevel = levelorder[0];
    for( var index = 0 ; index < levelorder.length ; ++ index )
    {
        if( world.level === levelorder[index]) {
            if( index < levelorder.length-1 ) {
                nextlevel = levelorder[index+1];
            }
            break;
        }
    }

    world.nextLevelHandler = undefined ; // stop multiple entries
    graphics.runner.stop();
    graphics = 0 ;
    world = 0 ;
    launchLevel( nextlevel );
}

function restartLevel() {
    var nextlevel = world.level;
    world.nextLevelHandler = undefined ; // stop multiple entries
    graphics.runner.stop();
    graphics = 0 ;
    world = 0 ;
    launchLevel( nextlevel );
}

function createWorld(level) {
    // initialise the world with gravity towards the bottom of the screen
    var world = new planck.World({
        gravity : Vec2(0, 40)
    });

    // create the ground
    world.door = levels[level](world);

    // create the explorer
    world.explorer = createExplorer(world);

    //setup end of level handler
    world.nextLevelHandler = nextLevel;
    world.restartLevelHandler = restartLevel;

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

    // draw the background
    renderBackground(world, cliprect, canvas, ctx, pos);

    // draw physics engine objects
    graphics.renderer.renderWorld(cliprect)
}

function launchLevel( levelname ) {
    // create the world
    world = createWorld( levelname );
    graphics = createGraphicsRendererRunner(world);
    setupKeyBindings() ;

    // start the runner
    graphics.runner.renderer( function() { renderCore( graphics , world ); } )
    graphics.runner.start( );
}

var params = parseHtmlParameters();
launchLevel( params.level );


