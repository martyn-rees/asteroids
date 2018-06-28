//import _ from 'lodash';
import Rock from './modules/rock.js';
import {asteroidSVG, shipSVG} from './graphics.js';

var globalID

let screen = {width: 800, height: 400};

let rocks = [];

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

initRocks(100);
createRockNode(rocks);

function step(timestamp) {
  for (let i=0; i<rocks.length; i++) {
    rocks[i].update(screen.width, screen.height);
    rocks[i].render();
  }
  globalID = window.requestAnimationFrame(step);
}

document.getElementById("start").addEventListener("click", function(){
    globalID = requestAnimationFrame(step);
});

document.getElementById("stop").addEventListener("click", function(){
    cancelAnimationFrame(globalID);
});







