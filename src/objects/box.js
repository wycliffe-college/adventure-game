//Created a file for making dynamic boxes.

/*
TODO:
- Make definition compatible with the boxes e.g. have texture images for level-specific
boxes.
- Density in definition
*/

export function createBox(world, position, width, height, density=1, imageAddress="./images/Crest_White.png") {

    //Make the platform as an object
    const box = world.createDynamicBody(position);

    //Fix the platform to the world with a width and fixed height of 0.25
    box.createFixture(planck.Box(width, height),density);

    //Load image from address
    const img = new Image();
    img.src = imageAddress;

    //When the image loads, run the function...
    img.onload = () => {
        box.render = {
            custom: (fixture, ctx, pos, size) => {
                ctx.drawImage(img, pos.x, pos.y, size.width, size.height);
                return true; // don't draw bounding box
            }
        }
    };
    return box;
}
