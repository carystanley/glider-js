import Const from '../const';
import { animate } from '../utils/sprite';

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
        this.count = 0;
    }

    update () {
        var body = this.body;

        body.x += this.dir * Const.CopterHVel;
        body.y += Const.CopterVVel;

        if (body.y > Const.Ground) {
            body.y = Const.Ceil;
            body.x = this.initialX;
        }
        this.count++;
    }

    render (g) {
        var body = this.body;
        g.drawSprite(body.x, body.y, 'copter' + animate(this.count, 4, 8));
    }

    onCollide (glider) {
        glider.damage();
    }
}
