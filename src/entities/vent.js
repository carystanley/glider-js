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

    render (g) {
        var body = this.body;
        g.drawSprite(body.x, body.y + body.h, 'vent');
        g.ctx.fillStyle = 'blue';
        g.ctx.globalAlpha = 0.25;
        g.ctx.fillRect(body.x - 5, body.y, body.w + 10, body.h);
        g.ctx.globalAlpha = 1;
    }

    onCollide (glider) {
        glider.lift();
    }
}
