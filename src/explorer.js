import { Vec2, Box, FixtureDef } from "./planck-module.js";

export function createExplorer(world) {
    const explorer = world.createDynamicBody(Vec2(0.0, -2.0));
    explorer.createFixture(Box(1, 2), 1.0);

    //stop the explorer from rotating, i.e. falling over
    explorer.setFixedRotation(true);

    //add foot sensor fixture
    explorer.footSensor = explorer.createFixture({
        shape: Box(0.5, 0.1, Vec2(0, 2), 0.0),
        isSensor: true,
    });

    //remember the number of foot contacts
    explorer.numFootContacts = 0;

    const img = new Image();
    img.src = "images/explorer.png";
    img.onload = () => {
        explorer.render = {
            custom: (ctx, pos, size) => {
                ctx.drawImage(img, pos.x, pos.y, size.width, size.height);
                return true // don't draw bounding box
            }
        }
    };
    return explorer;
}
