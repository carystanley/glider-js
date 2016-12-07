import Const from '../const';

export default class Ball {
    constructor (config) {
        this.initialX = config.x;
        this.dir = config.dir;
        this.body = {
            w: Const.CopterWidth,
            h: Const.CopterHeight,
            x: this.initialX,
            y: Const.Ceil
        }
    }

    update () {
        var body = this.body;

        body.x += this.dir * Const.CopterHVel;
        body.y += Const.CopterVVel;

        if (body.y > Const.Ground) {
            body.y = Const.Ceil;
            body.x = this.initialX;
        }
    }

    render (ctx) {
        var body = this.body;
        ctx.strokeRect(body.x, body.y, body.w, body.h);
    }

    onCollide (glider) {
        glider.damage();
    }
}
