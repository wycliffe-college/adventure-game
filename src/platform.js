export function createPlatform(world, position, width) {
    const platform = world.createBody(position);
    platform.createFixture(planck.Box(width, 0.25), 1.0);

    const img = new Image();
    img.src = "images/explorer.png";
    img.onload = () => {
        platform.render = {
            custom: (ctx, pos, size) => {
                ctx.drawImage(img, pos.x, pos.y, size.width, size.height);
                return true // don't draw bounding box
            }
        }
    };
    return platform;
}
