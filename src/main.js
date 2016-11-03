import Stats from 'Stats';

import Ball from './entities/ball';
import KeyboardInput from './utils/keyboardInput';
import Keys from './utils/keys';

window.onload = function() {
var requestAnimFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };

function loadImage(url, options) {
    options = options || {};
    var image = new Image();
    if (options.onload)
        image.on('load', options.onload);
    image.src = url;
    return image;
}

function renderTick(ctx) {
    glider.render(ctx);
    ball.render(ctx);
}

function render() {
    var width = canvas.width;
    var height = canvas.height;

    backBufferContext.fillStyle="white";
    backBufferContext.fillRect(0, 0, width, height);
    renderTick(backBufferContext);
    context.drawImage(backBuffer, 0, 0, width, height);
}

function update() {
    glider.update();
    ball.update();
    if (Rect.overlap(glider.body, ball.body)) {
        glider.die();
    }
}

var canvas = document.getElementById('mainCanvas');
var context = canvas.getContext('2d');
var backBuffer = document.createElement("canvas");
backBuffer.width = canvas.width;
backBuffer.height = canvas.height;
var backBufferContext = backBuffer.getContext("2d");
// var enemy = loadImage('./enemy.gif');
// var pattern = loadImage('./pattern.png');
var stats = new Stats();

stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
KeyboardInput.Initialize();

var glider = new Glider();
var ball = new Ball({bounce: 5, x: 100, y: GROUND-30});

function mainloop(){
    stats.begin();
    update();
    render();
    stats.end();
    requestAnimFrame(mainloop);
};

mainloop();

};

var Rect = {
    overlap: function(a, b) {
        var al = a.x; var bl = b.x; // left
        var ar = al + a.w; var br = bl + b.w; // right
        var at = a.y; var bt = b.y; // top
        var ab = at + a.h; var bb = bt + b.h; // bottom

        if (ab < bt) return false;
        if (at > bb) return false;
        if (ar < bl) return false;
        if (al > br) return false;

        return true;
    } 
};

function clamp(val, min, max) {
    return Math.max(Math.min(val, max), min);
}

var kGravity = 3
var kHImpulse = 2
var kVImpulse = 2
var kNormalThrust = 5
var kMaxHVel = 16
var GROUND = 300;

class Glider {
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

    update () {
        if (this.dead) return;

        var body = this.body;

        if (KeyboardInput.IsKeyDown(Keys.Left)) {
            this.gx = -kNormalThrust;
        } else if (KeyboardInput.IsKeyDown(Keys.Right)) {
            this.gx = kNormalThrust;
        } else {
            this.gx = 0;
        }
        this.gy = kGravity;

        this.vx = clamp(this.vx + clamp(this.gx - this.vx, -kHImpulse, kHImpulse), -kNormalThrust, kNormalThrust);
        this.vy = clamp(this.vy + clamp(this.gy - this.vy, -kVImpulse, kVImpulse), -kMaxHVel, kGravity);

        body.x += this.vx;
        body.y += this.vy;

        if (body.y > GROUND) {
            this.die();
        }
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
        ctx.fillRect(body.x, GROUND-20, body.w, 40);

        ctx.fillStyle = 'white';
        ctx.fillRect(body.x, body.y, body.w, body.h);
        ctx.strokeRect(body.x, body.y, body.w, body.h);
    }
}