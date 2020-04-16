import {px2phy,phy2px} from "./scale.js";
import {Vec2} from "./planck-module.js"

const px_leftwidth=60;
const px_rightwidth=64;
const px_centerwidth=289;
const px_verticaloffset=-80;
const px_platformheight=100;

const px_minwidth = px_leftwidth+px_rightwidth;

const leftimg = new Image();
leftimg.src = "images/grassleft.png";
const centerimg = new Image();
centerimg.src = "images/grasscenter.png";
const rightimg = new Image();
rightimg.src = "images/grassright.png";

function createPlatformLeft( world , x , y , definition ) {
    const platform = world.createBody(Vec2(x,y));
    platform.createFixture(planck.Box(px2phy(px_leftwidth/2),px2phy(px_platformheight/2)), 1.0);
    platform.render = {
        custom: (ctx, pos, size) => {
            if (leftimg.complete) {
                ctx.drawImage(leftimg, pos.x, pos.y + px2phy(px_verticaloffset),
                    px2phy(leftimg.width), px2phy(leftimg.height));
            }
            return true;
        }
    };
}

function createPlatformRight( world , x , y ) {
    const platform = world.createBody(Vec2(x,y));
    platform.createFixture(planck.Box(px2phy(px_rightwidth/2),px2phy(px_platformheight/2)), 1.0);
    platform.render = {
        custom: (ctx, pos, size) => {
            if (rightimg.complete) {
                ctx.drawImage(rightimg, pos.x, pos.y + px2phy(px_verticaloffset),
                    px2phy(rightimg.width), px2phy(rightimg.height));
            }
            return true;
        }
    };
}

function createPlatformCenter( world , x , y ) {
    const platform = world.createBody(Vec2(x,y));
    platform.createFixture(planck.Box(px2phy(px_centerwidth/2),px2phy(px_platformheight/2)), 1.0);
    platform.render = {
        custom: (ctx, pos, size) => {
            if (centerimg.complete) {
                ctx.drawImage(centerimg, pos.x, pos.y + px2phy(px_verticaloffset),
                    px2phy(centerimg.width), px2phy(centerimg.height));
            }
            return true;
        }
    };
}

export function createPlatform(world, position, width) {
    // calculate px width for platform
    var pxwidth = phy2px(width);

    //calculate the number of center pieces
    var numpieces = Math.round( ( pxwidth - px_minwidth ) / px_centerwidth ) ;
    var offset = position.x - (width/2);

    //create the starting piece
    offset += px2phy(px_leftwidth/2);
    createPlatformLeft(world, offset, position.y);
    offset += px2phy(px_leftwidth/2);

    //create the center pieces
    while( numpieces ) {
        offset += px2phy(px_centerwidth/2);
        createPlatformCenter(world, offset, position.y);
        offset += px2phy(px_centerwidth/2);
        numpieces -- ;
    }

    //create the final piece
    offset += px2phy(px_rightwidth/2);
    createPlatformRight(world, offset, position.y);
}
