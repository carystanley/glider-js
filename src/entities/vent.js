import Const from '../const';

export default class Vent {
    constructor (config) {
        this.body = {
            w: 1,
            h: config.h,
            x: config.x,
            y: Const.Ground - config.h
        }
    }

    update () {}

    render (ctx) {
        var body = this.body;
        ctx.strokeRect(body.x, body.y, body.w, body.h);
    }
}