export default class Ball {
    constructor (config) {
        this.initialV = -config.bounce;
        this.initialY = config.y;
        this.v = this.initialV;
        this.gravity = 0.1;
        this.body = {
            w: 30,
            h: 30,
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

    render (ctx) {
        var body = this.body;
        ctx.strokeRect(body.x, body.y, body.w, body.h);
    }
}