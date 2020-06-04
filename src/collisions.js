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
        if (fixtureA === world.explorer.hooksense || fixtureB === world.explorer.hooksense ) {
            world.explorer.numFootContacts += 1;
        }

        // detect when we reach the door
        if( world.door != undefined ) {
            if ( (fixtureA === world.door.doorSensor && fixtureB.getBody() === world.explorer ) ||
                 (fixtureB === world.door.doorSensor && fixtureA.getBody() === world.explorer) )  {
                window.location = "game.html?level=brendan";
            }
            if ( (fixtureA === world.door.doorSensor && fixtureB === world.explorer.hook) ||
                (fixtureB === world.door.doorSensor && fixtureA === world.explorer.hook) ||
                (fixtureA === world.door.doorSensor && fixtureB === world.explorer.wallslide) ||
                (fixtureB === world.door.doorSensor && fixtureA === world.explorer.wallslide))  {
                window.location = "game.html?level=brendan";
            }
        }

        // detect if we touch lava
        if( ( fixtureA === world.explorer.mainFixture && fixtureB.getBody().platform_type === "lava" ) ||
            ( fixtureB === world.explorer.mainFixture && fixtureA.getBody().platform_type === "lava" ) ||
            ( fixtureA === world.explorer.wallslide && fixtureB.getBody().platform_type === "lava" ) ||
            ( fixtureB === world.explorer.wallslide && fixtureA.getBody().platform_type === "lava" )
        ) {
            location.reload() ;
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
        if (fixtureA === world.explorer.hooksense || fixtureB === world.explorer.hooksense ) {
            world.explorer.numFootContacts -= 1;
        }
    });
}
