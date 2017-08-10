/* global Stats */

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

function statsBootstrap() {
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
    return stats;
}

var EntityTypes = {
    ball: Ball,
    shelf: Shelf,
    vent: Vent,
    copter: Copter
}

var Rooms = [{
    entities: [
        {type: 'ball', bounce: 2.5, x: 100, y: Const.Ground-30},
        {type: 'shelf', x: 75, y: 120, w: 150},
        {type: 'vent', x: 50, h: 200},
        {type: 'copter', x: 200, dir: -1},
        {type: 'vent', x: 250, h: 200}
    ]
}];

function loadLevel(id) {
    var room = Rooms[id] || {};
    var entities = room.entities || [];
    return {
        entities: entities.map(function (meta) {
            return new (EntityTypes[meta.type])(meta)
        })
    };
}


window.onload = function() {
    var stats = statsBootstrap();
    var mainGraphics = new Graphics(document.getElementById('mainCanvas'), loadSprites({
        'glider.gif': loadImage('glider.gif')
    }, SpriteConfig));

    KeyboardInput.Initialize();

    var Room = loadLevel(0);
    var glider = new Glider();

    function render(g) {
        g.clear();

        glider.renderShadow(g);
        Room.entities.forEach(function(entity) {
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
        Room.entities.forEach(function(entity) {
            entity.update();
            if (Rect.overlap(glider.body, entity.body)) {
                entity.onCollide(glider);
            }
        });
    }

    function mainloop(){
        stats.begin();
        update();
        render(mainGraphics);
        stats.end();
        requestAnimFrame(mainloop);
    };

    mainloop();
};
