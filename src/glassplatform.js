import {px2phy,phy2px} from "./scale.js";

const px_leftwidth=60;
const px_rightwidth=64;
const px_centerwidth=289;
const px_verticaloffset=-80;
const px_platformheight=100;

const px_minwidth = px_leftwidth+px_rightwidth;

export function createPlatform(world, position, width) {
    // calculate px width for platform
    console.log( "width" , width);
    var pxwidth = phy2px(width);
    console.log( "pxwidth" , pxwidth);
    if( pxwidth < px_minwidth ) {
        // make sure the platform is always at least minimum width
        pxwidth = px_minwidth;
    } else {
        // make sure the platform has an integer number of center pieces
        pxwidth -= px_minwidth;
        pxwidth = Math.round( pxwidth / px_centerwidth ) * px_centerwidth;
        pxwidth += px_minwidth;
    }
    console.log( "final pxwidth" , pxwidth);

    var phywidth = px2phy(pxwidth);
    var phyheight = px2phy(px_platformheight);

    console.log( "final phywidth" , phywidth);

    const platform = world.createBody(position);
    platform.createFixture(planck.Box(phywidth/2,phyheight/2), 1.0);

    const leftimg = new Image();
    leftimg.src = "images/grassleft.png";
    const centerimg = new Image();
    centerimg.src = "images/grasscenter.png";
    const rightimg = new Image();
    rightimg.src = "images/grassright.png";

    platform.render = {
        custom: (ctx, pos, size) => {
            var offset = pos.x ;
            if (leftimg.complete) {
                ctx.drawImage(leftimg, offset, pos.y+px2phy(px_verticaloffset), px2phy(leftimg.width), px2phy(leftimg.height));
            }
            offset += px2phy(px_leftwidth);
            while( offset + px2phy(px_centerwidth+px_rightwidth)< size.width ) {
                if (centerimg.complete) {
                    ctx.drawImage(centerimg, offset, pos.y+px2phy(px_verticaloffset), px2phy(centerimg.width), px2phy(centerimg.height));
                }
                offset += px2phy(px_centerwidth)
            }
            if (rightimg.complete) {
                ctx.drawImage(rightimg, offset, pos.y+px2phy(px_verticaloffset), px2phy(rightimg.width), px2phy(rightimg.height));
            }
            return true; // do draw bounding box
        }
    };
    return platform;
}
