//import _ from 'lodash';
import Rock from './modules/rock.js';
import Ship from './modules/ship.js';
import Bullet from './modules/bullet.js';
import GameScreen from './modules/gamescreen.js';
import {createRock, removeRockNode, createShipNode, createBulletNode, removeBulletNode} from './render_html.js'
import {doCirclesCollide} from './helper.js';

var globalID
let isGamePlaying = false;
var ACTIONS = {
  shipThrust: false,
  shoot: false,
  shipLeft: false,
  shipRight: false
}

let screen = new GameScreen('gameScreen', 800, 400)
let rocks = {
  type: {
    LARGE: {minRadius: 25, maxRadius: 30, minSpeed: 1, maxSpeed: 2},
    MEDIUM: {minRadius: 15, maxRadius: 20, minSpeed: 1.5, maxSpeed: 2.5},
    SMALL: {minRadius: 8, maxRadius: 10, minSpeed: 2, maxSpeed: 3}
  },
  rockCount: 0,
  totalCreated: 0,
  rockList: {}
}
let ship;
let bullets = {
  MIN_RELOD_TIME: 10,
  countdownToReload: 0,
  bulletList: {},
  bulletCount: 0
}

function initRocks(count) {
  let size = 'LARGE'
  let rockProps = rocks.type[size]
  for (let i = 0; i < count; i++){
    initRock(size)
  }
}

function initRock(size, initialX, initialY) {
  let rockProps = rocks.type[size]
  let id = 'rocks' + rocks.totalCreated++
  console.log('id', id)
  let x = initialX || Math.random() * screen.width
  let y = initialY || Math.random() * screen.height
  let speed = rockProps.minSpeed + Math.random() * rockProps.maxSpeed
  let r = rockProps.minRadius + Math.random() * rockProps.maxRadius
  rocks.rockList[id] = new Rock(x, y, r, speed, id, size)
  createRock(rocks.rockList[id])
}

const initRenderRocks = (rocks) => {
  for (var rock in rocks.rockList) {
    createRock(rocks.rockList[rock])
  }
}

function initShip() {
 ship = new Ship(screen.width / 2, screen.height / 2, "ship")
}

function resizeGameScreenSize() {
  let gameScreen = document.getElementById(screen.id)
  screen.width = gameScreen.offsetWidth;
  screen.height = gameScreen.offsetHeight;
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
      bullets.bulletList[bulletId] = new Bullet(bulletId, ship.x, ship.y, ship.shipRotation, ship.dx, ship.dy, 6)
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

  for (var rock in rocks.rockList) {
    rocks.rockList[rock].update(screen.width, screen.height);
    if (doCirclesCollide(rocks.rockList[rock], ship)) {
      //rocks[i].remove()

      removeRockNode(rocks.rockList[rock])
      delete rocks.rockList[rock]
    }
  }

  let destroyedRockSizes = []
  // test rocks to bullets
  for (var rock in rocks.rockList) {
    let haveCollision = false
    for (var bullet in bullets.bulletList) {
      if (!haveCollision) {
        if (doCirclesCollide(rocks.rockList[rock], bullets.bulletList[bullet])) {
          if (rocks.rockList[rock].size == 'LARGE') {
            initRock('MEDIUM', rocks.rockList[rock].x, rocks.rockList[rock].y)
            initRock('MEDIUM', rocks.rockList[rock].x, rocks.rockList[rock].y)
          } else if (rocks.rockList[rock].size == 'MEDIUM') {
            initRock('SMALL', rocks.rockList[rock].x, rocks.rockList[rock].y)
            initRock('SMALL', rocks.rockList[rock].x, rocks.rockList[rock].y)
            initRock('SMALL', rocks.rockList[rock].x, rocks.rockList[rock].y)
          }
          //console.log('boom', rocks.rockList[rock].id, rocks.rockList[rock].size)
          destroyedRockSizes.push(rocks.rockList[rock].size)
          console.log(destroyedRockSizes)
          removeRockNode(rocks.rockList[rock])
          delete rocks.rockList[rock]
          removeBulletNode(bullets.bulletList[bullet])
          delete bullets.bulletList[bullet]
          haveCollision = true
        }
      }
    }
  }


  renderScreen()

  /*if (destroyedRockSizes.length > 0) {
    console.log('destroyedRockSizes', destroyedRockSizes)
    // createNewRocks
    for (const size of destroyedRockSizes) {
      console.log('blow ' + size)
      if (size == 'LARGE') {initRock('MEDIUM')}
      if (size == 'MEDIUM') {initRock('SMALL')}
    }
  }*/
  globalID = window.requestAnimationFrame(step);
}

// render ship, rocks, bullet
function renderScreen() {
  ship.render()
  for (var rock in rocks.rockList) {
    rocks.rockList[rock].render()
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
  initRocks(4)
  //initRenderRocks(rocks)
  createShipNode()
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
