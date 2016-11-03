import Stats from 'Stats';

import Const from './const';

import Ball from './entities/ball';
import Glider from './entities/glider';

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

    if (KeyboardInput.IsKeyDown(Keys.Left)) {
        glider.control(-1);
    } else if (KeyboardInput.IsKeyDown(Keys.Right)) {
        glider.control(1);
    } else {
        glider.control(0);
    }

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
var ball = new Ball({bounce: 5, x: 100, y: Const.Ground-30});

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


