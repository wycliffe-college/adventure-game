import {scale} from "./scale.js";

export function renderBackground(world, cliprect, canvas, ctx, pos) {
    if (world.background) {
        var cliprectpos = cliprect.x + (cliprect.width / 2)
        var ratio = world.background.width / world.background.height
        var backgroundrenderpos = cliprectpos / (canvas.height * ratio) / 50


        var backgroundrenderposleft = (Math.floor(backgroundrenderpos)) * (canvas.height * ratio)
        var backgroundrenderposright = (Math.ceil(backgroundrenderpos)) * (canvas.height * ratio)
        if ((backgroundrenderpos - Math.floor(backgroundrenderpos)) < 0.5) {
            var backgroundrenderposleft = ((Math.floor(backgroundrenderpos)) * canvas.height * ratio) - (canvas.height * ratio)
            var backgroundrenderposright = (Math.floor(backgroundrenderpos)) * (canvas.height * ratio)

        }
        ctx.drawImage(world.background, backgroundrenderposleft + (((pos.x * scale * 50) - pos.x * scale) / 50), (-canvas.height / 2) + (pos.y * scale) * 0.9, canvas.height * ratio, canvas.height)
        ctx.drawImage(world.background, backgroundrenderposright + (((pos.x * scale * 50) - pos.x * scale) / 50), -canvas.height / 2 + (pos.y * scale) * 0.9, canvas.height * ratio, canvas.height)
    }
    if (world.foreground) {
        var cliprectpos = cliprect.x + (cliprect.width / 1.2)
        var ratio = world.foreground.width / world.foreground.height
        var foregroundrenderpos = cliprectpos / (canvas.height * ratio / 1.2) / 10
        var renderleft = foregroundrenderpos - 1

        var backgroundrenderposmid = Math.floor(foregroundrenderpos) * (canvas.height * ratio / 1.2)
        var backgroundrenderposleft = (Math.floor(renderleft)) * (canvas.height * ratio / 1.2)
        var backgroundrenderposright = Math.ceil(foregroundrenderpos) * (canvas.height * ratio / 1.2)

        ctx.drawImage(world.foreground, backgroundrenderposleft + (((pos.x * scale * 5) - pos.x * scale) / 5), -canvas.height / 2 + (((pos.y * scale * 5) - pos.y * scale) / 5) + (canvas.height / 4), canvas.height * ratio / 1.2, canvas.height / 1.2)
        ctx.drawImage(world.foreground, backgroundrenderposright + (((pos.x * scale * 5) - pos.x * scale) / 5), -canvas.height / 2 + (((pos.y * scale * 5) - pos.y * scale) / 5) + (canvas.height / 4), canvas.height * ratio / 1.2, canvas.height / 1.2)
        ctx.drawImage(world.foreground, backgroundrenderposmid + (((pos.x * scale * 5) - pos.x * scale) / 5), -canvas.height / 2 + (((pos.y * scale * 5) - pos.y * scale) / 5) + (canvas.height / 4), canvas.height * ratio / 1.2, canvas.height / 1.2)
    }
}