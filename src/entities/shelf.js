export default class Shelf {
    constructor (config) {
        this.body = {
            w: config.w,
            h: 7,
            x: config.x,
            y: config.y
        }
    }

    update () {}

    render (g) {
        var body = this.body;
        g.ctx.strokeRect(body.x, body.y, body.w, body.h);
    }

    onCollide (glider) {
        glider.damage();
    }
}
