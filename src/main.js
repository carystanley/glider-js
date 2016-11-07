import Stats from 'Stats';

import Const from './const';

import Ball from './entities/ball';
import Shelf from './entities/shelf';
import Glider from './entities/glider';

import KeyboardInput from './utils/keyboardInput';
import Keys from './utils/keys';
import * as Rect from './utils/rect';
// import {requestAnimFrame} from './utils/timing';
import {loadImage} from './utils/resources';

var requestAnimFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };

window.onload = function() {

function renderTick(ctx) {
    glider.render(ctx);
    ball.render(ctx);
    shelf.render(ctx);
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
    if (Rect.overlap(glider.body, shelf.body)) {
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
var shelf = new Shelf({x: 75, y: 120, w: 150});

function mainloop(){
    stats.begin();
    update();
    render();
    stats.end();
    requestAnimFrame(mainloop);
};

mainloop();

};
