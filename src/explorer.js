import { Vec2, Box } from "./planck-module.js";

export function createExplorer(world) {
    const explorer = world.createDynamicBody(Vec2(0.0, -2.0));
    explorer.createFixture(planck.Box(0.89, 1.20), 1.0);

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


