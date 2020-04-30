import { Vec2, Box } from "./planck-module.js";

const maxVerticalVelocity = 20;
const maxHorizontalVelocity = 20;

export var desiredHorizontalVelocity = 0.0 ;
export var desiredVerticalVelocity = 0.0 ;
export function doKeyDown(e) {
    if (e.keyCode === 37) { //left
        desiredHorizontalVelocity = Math.max( desiredHorizontalVelocity -= maxHorizontalVelocity , -maxHorizontalVelocity );
    }
    if (e.keyCode === 38) { //up
        desiredVerticalVelocity = Math.max(desiredVerticalVelocity -= maxVerticalVelocity , -maxVerticalVelocity ) ;
    }
    if (e.keyCode === 39) { //right
        desiredHorizontalVelocity = Math.min(desiredHorizontalVelocity += maxHorizontalVelocity , maxHorizontalVelocity ) ;
    }
    if (e.keyCode === 40) { //down
        desiredVerticalVelocity = Math.min(desiredVerticalVelocity += maxVerticalVelocity, maxVerticalVelocity ) ;
    }
    if (e.keyCode === 112) { //F1
        window.location.href="./game.html?level=default" ;
    }
    if (e.keyCode === 113) { //F2
        window.location.href="./game.html?level=brendan" ;
    }
    if (e.keyCode === 114) { //F3
        window.location.href="./game.html?level=josia" ;
    }
    e.preventDefault();
}

export function doKeyUp(e) {
    if (e.keyCode === 37) { //left
        desiredHorizontalVelocity = 0.0 ;
    }
    if (e.keyCode === 38) { //up
        desiredVerticalVelocity = 0.0 ;
    }
    if (e.keyCode === 39) { //right
        desiredHorizontalVelocity = 0.0 ;
    }
    if (e.keyCode === 40) { //down
        desiredVerticalVelocity = 0.0 ;
    }
    e.preventDefault();
}

export function applyImpulse(explorer) {
    var vel = explorer.getLinearVelocity();
    var delta_velocity = Vec2(desiredHorizontalVelocity - vel.x ,0);
    if( desiredVerticalVelocity && explorer.numFootContacts > 0) {
        delta_velocity.y = desiredVerticalVelocity - vel.y;
    }
    var impulse = Vec2( explorer.getMass() * delta_velocity.x , explorer.getMass() * delta_velocity.y ) ;
    if ( impulse.x || impulse.y ) {
        explorer.applyLinearImpulse(impulse, explorer.getWorldCenter(), true);
    }
}