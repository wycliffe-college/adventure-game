export function createPlatform(world, position, width, imageAddress="./images/platform_brickwall.png") {

    //Make the platform as an object
    const platform = world.createBody(position);

    //Fix the platform to the world with a width and fixed height of 0.25
    platform.createFixture(planck.Box(width, 0.25), 1.0);

    //Load image from address
    const img = new Image();
    img.src = imageAddress;

    //When the image loads, run the function...
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
