import {constrainNumber} from '../helper.js'

const BULLET_LIFE = 90
const BULLET_SPEED = 6

export default class Bullet {
  constructor(id, shipX, shipY, shipRotation, shipDx = 0, shipDy = 0, SHIP_GUN_LENGTH = 6) {
    this.id = id
    this.isDead = false
    let bulletAngleRadians = shipRotation
    this.dx = (BULLET_SPEED * Math.sin(bulletAngleRadians))
    this.dy = (BULLET_SPEED * Math.cos(bulletAngleRadians))
    this.x = shipX + (SHIP_GUN_LENGTH * Math.sin(bulletAngleRadians))
    this.y = shipY - (SHIP_GUN_LENGTH * Math.cos(bulletAngleRadians))
    this.frame = 0
    this.r = 2
  }

  update(SCREEN_WIDTH, SCREEN_HEIGHT) {
    this.frame++
    if (this.frame < BULLET_LIFE) {
      let newX = this.x + this.dx
      let newY = this.y - this.dy
      this.x = constrainNumber(newX, 0, SCREEN_WIDTH)
      this.y = constrainNumber(newY, 0, SCREEN_HEIGHT)
    } else {
      this.isDead = true
    }

  }

  render() {
    let el = document.getElementById(this.id)
    el.style.left = this.x + 'px'
    el.style.top = this.y + 'px'
  }
}
