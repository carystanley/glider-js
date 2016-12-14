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
            w: Const.GliderWidth,
            h: Const.GliderHeight,
            x: 0,
            y: 0
        };
        this.damaged = false;
        this.dead = false;
    }

    control (direction) {
        this.gx = direction * Const.NormalThrust;
    }

    update () {
        if (this.dead) return;

        var body = this.body;

        if (this.damaged) {
            this.vy = Const.Gravity;
            this.vx = 0;
        } else {
            this.vx = clamp(this.vx + Const.OldFPS/Const.FPS * clamp(this.gx - this.vx, -Const.HImpulse, Const.HImpulse), -Const.NormalThrust, Const.NormalThrust);
            this.vy = clamp(this.vy + Const.OldFPS/Const.FPS * clamp(this.gy - this.vy, -Const.VImpulse, Const.VImpulse), -Const.MaxHVel, Const.Gravity);
        }

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

    damage() {
        this.damaged = true;
    }

    reset () {
        var body = this.body;
        this.damaged = false;
        body.y = 0;
        body.x = 0;
    }

    die () {
        if (this.lives > 0) {
            this.lives--;
            this.reset();
        } else {
            this.dead = true;
        }
    }

    render (g) {
        if (this.dead) return;

        var body = this.body;
        if (this.damaged) {
            g.ctx.fillStyle = 'red';
        } else {
            g.ctx.fillStyle = 'white';
        }
        // ctx.fillRect(body.x, body.y, body.w, body.h);
        // ctx.strokeRect(body.x, body.y, body.w, body.h);
        g.drawSprite(body.x, body.y, (this.gx < 0) ? 'gliderBack' : 'glider');
    }

    renderShadow (g) {
        if (this.dead) return;

        var body = this.body;
        // ctx.fillStyle = 'black';
        // ctx.fillRect(body.x, Const.Ground-20, body.w, 40);
        g.drawSprite(body.x, Const.Ground, 'gliderShadow');
    }
}
