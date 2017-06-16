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

function render(g) {
    g.clear();

    glider.renderShadow(g);
    Room.entries.forEach(function(entity) {
        entity.render(g);
    });
    glider.render(g);

    g.push();
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
    Room.entries.forEach(function(entity) {
        entity.update();
        if (Rect.overlap(glider.body, entity.body)) {
            entity.onCollide(glider);
        }
    });
}

var stats = new Stats();
var mainGraphics = new Graphics(document.getElementById('mainCanvas'), loadSprites({
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
    stats.begin();
    update();
    render(mainGraphics);
    stats.end();
    requestAnimFrame(mainloop);
};

mainloop();

};
