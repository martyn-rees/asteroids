export const constrainNumber = (n, min, max) => {
  let constrainedNumber = n
  if (n < min) {
    constrainedNumber = max + n
  } else if (n > max) {
    constrainedNumber = n - max
  }
  return constrainedNumber
}

export const distanceBetweenPoints = (p1, p2) => {
  let dx = p1.x - p2.x
  let dy = p1.y - p2.y
  return Math.sqrt( (dx * dx) + (dy * dy) )
}

export const doCirclesCollide = (c1, c2) => {
  let minDistance = c1.r + c2.r
  return distanceBetweenCircles(c1, c2) < minDistance ? true : false
}
