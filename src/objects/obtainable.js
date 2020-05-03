//Coin code, by Brendan

//Will mostly stay constant and not level-specific so no need to tie values to definitions.

import {px2phy} from "../scale.js";
import {Vec2} from "../planck-module.js";

export function createObtainable(world, position, width=1.5, height=1.5, density=1000000, imageAddress="./images/coin.gif") {

    //Make the platform as an object
    const obtainable = world.createDynamicBody(position);

    //Fix this to the world
    obtainable.createFixture(planck.Box(width, height),density);

    // add a sensor
    obtainable.obSensor = obtainable.createFixture({shape: planck.Box(px2phy(height/2),px2phy(width/2), Vec2(0,0) ),
        isSensor: true,
    });
    console.log("Object and sensor made succesfully");




    //Load image from address
    const img = new Image();
    img.src = imageAddress;

    //When the image loads, run the function...
    img.onload = () => {
        obtainable.render = {
            custom: (fixture, ctx, pos, size) => {
                if (fixture == obtainable.obSensor ) {
                    return true; //true to draw sensor, false=not.
                }
                ctx.drawImage(img, pos.x, pos.y, size.width, size.height);
                return false // don't draw bounding box
            }
        }
    };

    return obtainable;
}


//Function to run when the object has been hit.
export function gotObtainable(world, sense){
    console.log("Player has collected an object!!!!!!!");
    return sense;
}