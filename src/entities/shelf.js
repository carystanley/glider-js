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

    render (ctx) {
        var body = this.body;
        ctx.strokeRect(body.x, body.y, body.w, body.h);
    }
}