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
        ctx.fillStyle = 'blue';
        ctx.globalAlpha = 0.25;
        ctx.fillRect(body.x - 5, body.y, body.w + 10, body.h);
        ctx.globalAlpha = 1;
    }
}