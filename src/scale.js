export const scale = 30;

export function px2phy( px ) {
    return px/scale ;
}

export function phy2px( phy ) {
    return phy*scale ;
}