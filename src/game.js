//const canvas = document.querySelector('#test');
//const ctx = canvas.getContext('2d');
const Vec2 = planck.Vec2 ;

function createWorld() {
    // initialise the world with gravity towards the bottom of the screen
    var world = new planck.World({
        gravity : Vec2(0, -10)
    });

    // create the ground
    var ground = level1.create(world);

    return world;
}

planck.testbed(function(testbed) {
    testbed.speed = 1.3;
    testbed.hz = 50;

    var world = createWorld();

    // create an explorer
    var person = explorer.create(world);

    //keep the person on the screen
    testbed.step = function() {
        var cp = person.getPosition();
        if (cp.x > testbed.x + 10) {
            testbed.x = cp.x - 10;

        } else if (cp.x < testbed.x - 10) {
            testbed.x = cp.x + 10;
        }
    };

    // rest of your code
    return world; // make sure you return the world
});