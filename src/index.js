//import _ from 'lodash';
import Rock from './modules/rock.js';
import Ship from './modules/ship.js';
import Bullet from './modules/bullet.js';
import {asteroidSVG, shipSVG, bulletSVG} from './graphics.js';
import {doCirclesCollide} from './helper.js';

var globalID
let isGamePlaying = false;
var ACTIONS = {
  shipThrust: false,
  shoot: false,
  shipLeft: false,
  shipRight: false
}

let screen = {width: 800, height: 400};

let rocks = [];
let ship;
let bullets = {
  MIN_RELOD_TIME: 10,
  countdownToReload: 0,
  bulletList: {},
  bulletCount: 0
}

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

function createBulletNode (newBullet) {
  let gameScreen = document.getElementById("gameScreen");
  //let bulletHTML = bulletSVG(newBullet)
  let bulletNode = document.createElement('div');
  bulletNode.setAttribute("id", newBullet.id);
  bulletNode.setAttribute("class", "bullet");
  gameScreen.appendChild(bulletNode);
}

function removeBulletNode (newBullet) {
  let bulletNode = document.getElementById(newBullet.id);
  bulletNode.parentNode.removeChild(bulletNode);
}

function step(timestamp) {
  gameLoop()
}

function gameLoop() {
  // test controls for ship
  ship.updateState(ACTIONS.shipThrust, ACTIONS.shipLeft, ACTIONS.shipRight)
  // update ship position
  ship.update(screen.width, screen.height);

  // test if bullet fired
  if (bullets.countdownToReload > 0) {
    bullets.countdownToReload--
  } else {
    // test if SHOOT KEY is pressed
    if (ACTIONS.shoot == true) {
      // create new bullet
      bullets.bulletCount++
      let bulletId = 'bullet'+ bullets.bulletCount
      bullets.bulletList[bulletId] = new Bullet(bulletId, ship.x, ship.y, ship.shipRotation, 0, 0, 12)
      createBulletNode(bullets.bulletList[bulletId])
      // reset time to fire next bullet
      bullets.countdownToReload = bullets.MIN_RELOD_TIME
    }
  }

  // remove dead bullets
  for (var bullet in bullets.bulletList) {
    if (bullets.bulletList[bullet].isDead) {
      // remove bullet from screen
      removeBulletNode(bullets.bulletList[bullet])
      // remove bullet from list
      delete bullets.bulletList[bullet]
    }
  }

  for (let i=0; i<rocks.length; i++) {
    rocks[i].update(screen.width, screen.height);
    if (doCirclesCollide(rocks[i], ship)) {
      rocks[i].remove()
    }
  }

  renderScreen()
  globalID = window.requestAnimationFrame(step);
}

function renderScreen() {
  var gameScreen = document.getElementById("gameScreen"); 
  ship.render()
  for (let i = 0; i < rocks.length; i++) {
    rocks[i].render();
  }
  for (var bullet in bullets.bulletList) {
    bullets.bulletList[bullet].update(screen.width, screen.height);
    bullets.bulletList[bullet].render()
  }

}

function keyEvent(ev, isKeyDown){
  var keyCode = ev == null ? window.ev.keyCode : ev.keyCode
  if (keyCode == 37){ ACTIONS.shipLeft=isKeyDown; }
  if (keyCode == 39){ ACTIONS.shipRight=isKeyDown; }
  if (keyCode == 38){ ACTIONS.shipThrust=isKeyDown; }
  if (keyCode == 83){ ACTIONS.shoot=isKeyDown; }
}

function startGame() {
  resizeGameScreenSize()
  initShip()
  startLevel(1)
  addEvents()
}

function startLevel(level) {
  initRocks(30)
  createRockNode(rocks)
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
  startGame()
}

init()
