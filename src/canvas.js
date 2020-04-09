export function createCanvas() {
    const canvas = document.querySelector('#test');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return canvas;
}

export function createContext( canvas ) {
    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width / 2, canvas.height/2); //finds center of screen
    return ctx;
}

export function getClipRect( context ) {
    //calculate the rect visible of the canvas
    const transform = context.getTransform() ;
    return { x: -transform.e , y :-transform.f , width: context.canvas.width , height: context.canvas.height };
}

export function clearCanvas(context) {
    const cliprect=getClipRect( context );
    context.clearRect( cliprect.x , cliprect.y , cliprect.width , cliprect.height );
}