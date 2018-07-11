//import _ from 'lodash';
import Rock from './modules/rock.js';
import Ship from './modules/ship.js';
import {asteroidSVG, shipSVG} from './graphics.js';
import {doCirclesCollide} from './helper.js';

var globalID
let isGamePlaying = false;
var keysDown = {
  up: false,
  down: false,
  left: false,
  right: false
}

let screen = {width: 800, height: 400};

let rocks = [];
let ship;

function createRockNode (rocks) {
  let gameHTML = '';
  for (let i=0; i<rocks.length; i++){
    gameHTML += asteroidSVG(rocks[i])
  }
  gameHTML += shipSVG()
  var gameScreen = document.getElementById("gameScreen"); 
  gameScreen.innerHTML = gameHTML;
}

function initRocks(count) {
  for (let i = 0; i < count; i++){
    let x = Math.random() * screen.width;
    let y = Math.random() * screen.height;
    let speed = 1 + Math.random() * 2;
    let r = 20 + Math.random() * 30
    rocks[i] = new Rock(x,y,r,speed, `rock${i}`);
  }
}

function initShip() {
 ship = new Ship(screen.width/2, screen.height/2, "ship")
}

function resizeGameScreenSize() {
  let gameScreen = document.getElementById("gameScreen")
  screen.width = gameScreen.offsetWidth;
  screen.height = gameScreen.offsetHeight;
}


function step(timestamp) {
  gameLoop()
}

function gameLoop() {
  //let currentKeys = { }//...keysDown}
  //console.log(keysDown, currentKeys)

  ship.updateState(keysDown)
  ship.update(screen.width, screen.height);

  for (let i=0; i<rocks.length; i++) {
    rocks[i].update(screen.width, screen.height);
    if (doCirclesCollide(rocks[i], ship)) {
      console.log('boom: ', i)
      rocks[i].r = 10
    }

    rocks[i].render();
  }

  ship.render()
  globalID = window.requestAnimationFrame(step);
}

function keyEvent(ev, isKeyDown){
  var keyCode = ev == null ? window.ev.keyCode : ev.keyCode

  if (keyCode == 37){ keysDown.left=isKeyDown; }
  if (keyCode == 39){ keysDown.right=isKeyDown; }
  if (keyCode == 38){ keysDown.up=isKeyDown; }
  if (keyCode == 40){ keysDown.down=isKeyDown; }
}


function addEvents() {
  window.addEventListener('resize', function(event){
    resizeGameScreenSize();
  });

  window.addEventListener('keydown', function(ev){
    keyEvent(ev, true);
  });

  window.addEventListener('keyup', function(ev){
    keyEvent(ev, false);
  });

  document.getElementById("start").addEventListener("click", function(){
    cancelAnimationFrame(globalID);
    globalID = requestAnimationFrame(step);
  });

  document.getElementById("stop").addEventListener("click", function(){
    isGamePlaying = false;
    cancelAnimationFrame(globalID);
  });
}

function init() {
  resizeGameScreenSize();
  initRocks(30);
  initShip();
  createRockNode(rocks);
  addEvents();
}

init()
