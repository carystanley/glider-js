
export function overlap(a, b) {
    var al = a.x; var bl = b.x; // left
    var ar = al + a.w; var br = bl + b.w; // right
    var at = a.y; var bt = b.y; // top
    var ab = at + a.h; var bb = bt + b.h; // bottom

    if (ab < bt) return false;
    if (at > bb) return false;
    if (ar < bl) return false;
    if (al > br) return false;

    return true;
};