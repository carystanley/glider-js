import Const from '../const';

export default class Ball {
    constructor (config) {
        this.initialV = -config.bounce;
        this.initialY = config.y;
        this.v = this.initialV;
        this.gravity = Const.BallGravity;
        this.body = {
            w: Const.BallWidth,
            h: Const.BallHeight,
            x: config.x,
            y: this.initialY
        }
    }

    update () {
        var body = this.body;

        body.y += this.v;
        this.v += this.gravity;

        if (body.y > this.initialY) {
            body.y = this.initialY;
            this.v = this.initialV;
        }
    }

    render (g) {
        var body = this.body;
        g.ctx.strokeRect(body.x, body.y, body.w, body.h);
    }

    onCollide (glider) {
        glider.damage();
    }
}
