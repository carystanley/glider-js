import Const from '../const';
import {clamp} from '../utils/helpers';

export default class Glider {
    constructor () {
        this.lives = 3;
        this.vx = 0;
        this.vy = 0;
        this.gx = 0;
        this.gy = 0;
        this.body = {
            w: 50,
            h: 30,
            x: 0,
           y: 0
        };
        this.dead = false;
    }

    control (direction) {
        this.gx = direction * Const.NormalThrust;
    }

    update () {
        if (this.dead) return;

        var body = this.body;

        this.vx = clamp(this.vx + clamp(this.gx - this.vx, -Const.HImpulse, Const.HImpulse), -Const.NormalThrust, Const.NormalThrust);
        this.vy = clamp(this.vy + clamp(this.gy - this.vy, -Const.VImpulse, Const.VImpulse), -Const.MaxHVel, Const.Gravity);

        body.x += this.vx;
        body.y += this.vy;

        if (body.y > Const.Ground) {
            this.die();
        }

        this.gy = Const.Gravity;
    }

    lift () {
        this.gy = -Const.VImpulse;
    }

    die () {
        var body = this.body;
        if (this.lives > 0) {
            this.lives--;
            body.y = 0;
            body.x = 0;
        } else {
            this.dead = true;
        }
    }

    render (ctx) {
        if (this.dead) return;

        var body = this.body;

        ctx.fillStyle = 'black';
        ctx.fillRect(body.x, Const.Ground-20, body.w, 40);

        ctx.fillStyle = 'white';
        ctx.fillRect(body.x, body.y, body.w, body.h);
        ctx.strokeRect(body.x, body.y, body.w, body.h);
    }
}