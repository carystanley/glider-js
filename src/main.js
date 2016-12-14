import Stats from 'Stats';

import Const from './const';

import Ball from './entities/ball';
import Shelf from './entities/shelf';
import Vent from './entities/vent';
import Copter from './entities/copter';
import Glider from './entities/glider';

import KeyboardInput from './utils/keyboardInput';
import Keys from './utils/keys';
import * as Rect from './utils/rect';
import {requestAnimFrame} from './utils/timing';
import {loadImage, loadSprites} from './utils/resources';

import SpriteConfig from './config/sprite.json';
import Graphics from './utils/graphics';

window.onload = function() {

function renderTick() {
    glider.renderShadow(mainGraphics);
    Room.entries.forEach(function(entity) {
        entity.render(mainGraphics);
    });
    glider.render(mainGraphics);
}

function render() {
    var width = canvas.width;
    var height = canvas.height;

    backBufferContext.fillStyle="white";
    backBufferContext.fillRect(0, 0, width, height);
    renderTick();
    context.drawImage(backBuffer, 0, 0, width, height);
}

function update(dt) {

    if (KeyboardInput.IsKeyDown(Keys.Left)) {
        glider.control(-1);
    } else if (KeyboardInput.IsKeyDown(Keys.Right)) {
        glider.control(1);
    } else {
        glider.control(0);
    }

    glider.update();
    Room.entries.forEach(function(entity) {
        entity.update();
        if (Rect.overlap(glider.body, entity.body)) {
            entity.onCollide(glider);
        }
    });
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

var mainGraphics = new Graphics(backBufferContext, loadSprites({
    "glider.gif": loadImage('glider.gif')
}, SpriteConfig));

stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
KeyboardInput.Initialize();

var glider = new Glider();
var Room = {
    entries: [
        new Ball({bounce: 2.5, x: 100, y: Const.Ground-30}),
        new Shelf({x: 75, y: 120, w: 150}),
        new Vent({x: 50, h: 200}),
        new Copter({x: 200, dir: -1})
    ]
};

var lastTime = Date.now();
function mainloop(){
    var startTime = Date.now();
    stats.begin();
    update(Math.min((startTime - lastTime) / 1000.0, .1)); // don't want to skip to many frames
    lastTime = startTime;
    render();
    stats.end();
    requestAnimFrame(mainloop);
};

mainloop();

};
