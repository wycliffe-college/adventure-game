// handle collisions
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

        // handle the explorer touching things
        if ( fixtureA.getBody().contactHandler !== undefined  && fixtureB.getBody() === world.explorer ) {
            fixtureA.getBody().contactHandler();
        }

        if ( fixtureB.getBody().contactHandler !== undefined  && fixtureA.getBody() === world.explorer ) {
            fixtureB.getBody().contactHandler();
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
