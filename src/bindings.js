import { Vec2, Box } from "./planck-module.js";

const forceMagnitude = 100;

export var forceVector = Vec2(0,0);
export function doKeyDown(e,person) {
    if (e.keyCode === 37) {
        console.log(person.getLinearVelocity().x);
        if (person.getLinearVelocity().x > -10.0) {
            forceVector = Vec2(-forceMagnitude, 0);
        } else {
            forceVector = Vec2(0, 0);
        }
    }
    if (e.keyCode === 38) {
        console.log("up");
        if (person.getLinearVelocity().y > -20.0) {
            forceVector = Vec2(0, -forceMagnitude);
        } else {
            forceVector = Vec2(0, 0);
        }
    }
    if (e.keyCode === 39) {
        console.log("right");
        if (person.getLinearVelocity().x < 10.0) {
            forceVector = Vec2(forceMagnitude, 0);
        } else {
            forceVector = Vec2(0, 0);
        }
    }
    if (e.keyCode === 40) {
        console.log("down");
        if (person.getLinearVelocity().y < 10.0) {
            forceVector = Vec2(0, forceMagnitude );
        } else {
            forceVector = Vec2(0, 0);
        }
    }
    e.preventDefault();
}

export function doKeyUp(e) {
    forceVector = Vec2(0,0);
    e.preventDefault();
}