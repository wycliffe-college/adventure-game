import { Vec2, Box, FixtureDef } from "./planck-module.js";

export function createExplorer(world) {
    const explorer = world.createDynamicBody(Vec2(0.0, -2.0));
    explorer.mainFixture = explorer.createFixture(Box(1, 2), 1.0);

    // draw the explorer on layer 2
    explorer.drawingLayer = 2 ;

    //stop the explorer from rotating, i.e. falling over
    explorer.setFixedRotation(true);

    //add a foot sensor fixture - so we can tell when we are stood on something
    explorer.footSensor = explorer.createFixture({
        shape: Box(0.5, 0.1, Vec2(0, 2), 0.0),
        isSensor: true
    });

    explorer.hook = explorer.createFixture({
        shape: Box(1.2,0.1, Vec2(0 , -2 ), 0),
        isSensor: false,
        friction: false
    })
    explorer.hooksense = explorer.createFixture({
        shape: Box(1.15,0.1, Vec2(0 , -1.95 ), 0),
        isSensor: true
    })
    explorer.wallslide = explorer.createFixture({
        shape: Box(1.02,2, Vec2(0,0),0),
        isSensor: false,
        friction: false
    })

    //remember the number of foot contacts
    explorer.numFootContacts = 0;

    // custom render
    const img = new Image();
    img.src = "images/explorer.png";
    img.onload = () => {
        explorer.render = {
            custom: (fixture, ctx, pos, size) => {
                if (fixture == explorer.footSensor || fixture == explorer.hook || fixture == explorer.hooksense )  {
                    // don't draw the foot sensor
                    return false;
                }

                ctx.drawImage(img, pos.x, pos.y, size.width, size.height);
                return false; // don't draw bounding box
            }
        }
    };
    return explorer;
}
