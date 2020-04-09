//Created a file for maing dynamic objects, boxes.

export function createBox(world, position, width, height, density=1, imageAddress="./images/Crest_White.png") {

    //Make the platform as an object
    const box = world.createBody(position);

    //Fix the platform to the world with a width and fixed height of 0.25
    box.createFixture(planck.Box(width, height),density);

    //Load image from address
    const img = new Image();
    img.src = imageAddress;

    //When the image loads, run the function...
    img.onload = () => {
        box.render = {
            custom: (ctx, pos, size) => {
                ctx.drawImage(img, pos.x, pos.y, size.width, size.height);
                return true // don't draw bounding box
            }
        }
    };
    return box;
}
