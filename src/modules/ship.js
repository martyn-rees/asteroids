import {constrainNumber} from '../helper.js';
import {renderShip} from '../render.js'

export default class Ship {
  constructor(x,y,id) {
    this.maxSpeed = 4.0
    this.friction = 0.005
    this.thrust = 0.1
    this.shipAngle = 0.0
    this.directionAngle = 0.0
    this.shipSpeed = 0
    this.x = x
    this.y = y
    this.shipRotation = 0
    this.shipThrust = false
    this.id = id;
    this.r = 6;
    this.dr = Math.PI / 90
    this.FULLRADIAN = 2 * Math.PI
  }

updateState(thrust, rotateCounterClockwise, rotateClockwise) {
  this.shipThrust = thrust ? true : false;
  if (rotateCounterClockwise){ this.changeShipRotation( -this.dr ); }
  if (rotateClockwise){ this.changeShipRotation( this.dr ); }
}

update (SCREEN_WIDTH, SCREEN_HEIGHT){
  //shipAngle = shipRotation * 15.0 * 0.01745;
  // calculate x,y components of speed, thrust and friction
  let currentSpeedX = this.shipSpeed * Math.sin(this.directionAngle)
  let currentSpeedY = this.shipSpeed * Math.cos(this.directionAngle)
  let frictionX = this.friction * Math.sin(this.directionAngle)
  let frictionY = this.friction * Math.cos(this.directionAngle)
  let thrustX = 0
  let thrustY = 0
  if ( this.shipThrust){
    thrustX = this.thrust * Math.sin(this.shipAngle)
    thrustY = this.thrust * Math.cos(this.shipAngle)
  }

  let dx = currentSpeedX - frictionX + thrustX
  let dy = currentSpeedY - frictionY + thrustY

  // calculate x,y components of speed 
  if ( Math.abs(frictionX) > Math.abs(currentSpeedX) ){
    dx = thrustX
  }

  if ( Math.abs(frictionY) > Math.abs(currentSpeedY) ){
    dy = thrustY
  }

  // shipSpeed
  this.shipSpeed = Math.sqrt( (dx * dx) + (dy * dy) )
  if ( dy == 0) {
    this.directionAngle = Math.atan( dx / 0.01 )
  } else {
    this.directionAngle = Math.atan( dx / dy ) // directionAngle in radians
  }

  if ( dy < 0) {
    // Add PI radians or 180 degrees
    this.directionAngle = this.directionAngle + 3.1415;
  }

  if ( this.shipSpeed > this.maxSpeed ){
    this.shipSpeed = this.maxSpeed
    dx = this.shipSpeed * Math.sin( this.directionAngle )
    dy = this.shipSpeed * Math.cos( this.directionAngle )
  }

  this.x += dx //(shipSpeed*sin(shipAngle))
  this.y -= dy //(shipSpeed*cos(shipAngle))

  //amend x,y values to keep ship on screen
  if (this.x < 0) {
    this.x = SCREEN_WIDTH
  }else if ( this.x > SCREEN_WIDTH) {
    this.x = 0
  }

  if ( this.y < 0 ){
    this.y = SCREEN_HEIGHT
  } else if ( this.y > SCREEN_HEIGHT) {
    this.y = 0
  }
  
}

  changeShipRotation( dRot ){
    this.shipRotation += dRot
    if ( this.shipRotation < 0) {
      this.shipRotation = this.FULLRADIAN
    } else if ( this.shipRotation > this.FULLRADIAN ){
      this.shipRotation = 0
    }
    this.shipAngle = this.shipRotation
  }

  setShipThrust(bool){
    shipThrust = bool
  }

  render() {
    renderShip(this.id, this.x, this.y, this.shipAngle, this.shipThrust)
  }
}
