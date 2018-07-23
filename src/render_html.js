import {asteroidSVG, shipSVG, bulletSVG} from './graphics.js';

export const createShipNode = () => {
  let shipContainer = document.createElement('div');
  shipContainer.innerHTML = shipSVG();
  addToGameWindow(shipContainer);
}

export const createRock = (rock) => {
  let rockContainer = document.createElement('div');
  rockContainer.setAttribute("id", rock.id);
  rockContainer.setAttribute("class", "rock");
  rockContainer.innerHTML = asteroidSVG(rock);
  addToGameWindow(rockContainer);
}

export const createBulletNode = (bullet) => {
  let bulletContainer = document.createElement('div');
  bulletContainer.setAttribute("id", bullet.id);
  bulletContainer.setAttribute("class", "bullet");
  addToGameWindow(bulletContainer);
}

export const removeRockNode = (rock) => {
  removeNode(rock.id)
}

export const removeBulletNode = (bullet) => {
  removeNode(bullet.id)
}

const addToGameWindow = (newEl) => {
  let gameScreen = document.getElementById("gameScreen");
  gameScreen.appendChild(newEl);
}

const removeNode = (elId) => {
	let elNode = document.getElementById(elId);
	elNode.parentNode.removeChild(elNode);
}
