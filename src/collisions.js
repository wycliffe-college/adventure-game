// handle collisions
import {gotObtainable} from "./objects/obtainable.js";

export function setupCollisionHandling(world ) {
    world.on('begin-contact', function(contact) {
        var fixtureA = contact.getFixtureA();
        var fixtureB = contact.getFixtureB();

        // count floor contacts
        if (fixtureA === world.explorer.footSensor || fixtureB === world.explorer.footSensor ) {
            world.explorer.numFootContacts += 1;
        }
        if( world.door != undefined ) {
            if ((fixtureA === world.door.doorSensor && fixtureB === world.explorer.mainFixture) ||
                (fixtureB === world.door.doorSensor && fixtureA === world.explorer.mainFixture)) {
                window.location = "game.html?level=brendan";
            }
        }
        if( world.obtainable != undefined ) { //I.e. if there is an object like this in the world.
            console.log("program knows that an obtainable exists");
            if ((fixtureA === world.obtainable.obSensor && fixtureB === world.explorer.mainFixture) ||
                (fixtureB === world.obtainable.obSensor && fixtureA === world.explorer.mainFixture)) {
                console.log("Program has sensed contact, running the function");
                gotObtainable(world, true); //Tells the game that the obtainable has been collected.
            }
        }
    });

    world.on('end-contact', function(contact) {
        var fixtureA = contact.getFixtureA();
        var fixtureB = contact.getFixtureB();

        // count floor contacts
        if (fixtureA === world.explorer.footSensor || fixtureB === world.explorer.footSensor ) {
            world.explorer.numFootContacts -= 1;
        }
    });
}
