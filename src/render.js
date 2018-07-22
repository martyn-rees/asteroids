const renderType = 'css'

const render = (id, x, y, rotation) => {
  let el = document.getElementById(id)
  el.style.left = x + 'px'
  el.style.top = y + 'px'
  if (rotation) {
    el.style.transform = `rotate(${rotation}deg)`;
  }
}

export const renderShip = (id, x, y, shipAngle, shipThrust) => {
  let degrees = shipAngle * 180 / Math.PI
  let thrustNode = document.getElementById("thrust")
  if (shipThrust) {
    thrustNode.style.display = 'block'
  } else {
    thrustNode.style.display = 'none'
  }
  render(id, x, y, degrees)
}

export const renderBullet = (id, x, y) => {
 render(id, x, y)
}

export const renderRock = (id, x, y, rotation) => {
  render(id, x, y, rotation)
}
