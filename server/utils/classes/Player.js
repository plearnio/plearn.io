class Player {
  constructor({ id }) {
    this.id = id
    this.x = Math.floor(Math.random() * (300))
    this.pressingRight = false
    this.pressingLeft = false
    this.pressingUp = false
    this.pressingDown = false
    this.maxSpeed = 10
    this.speedX = 0
    this.targetPoint = this.x
    this.status = 'idle'
    this.action = 'nothing'
    this.side = 'right'
    this.rangeInteract = 20
  }

  updatePosition() {
    if (this.pressingRight) {
      this.speedX = this.maxSpeed
      this.status = 'move'
      this.side = 'right'
    } else if (this.pressingLeft) {
      this.speedX = -this.maxSpeed
      this.status = 'move'
      this.side = 'left'
    } else if (this.status === 'auto-walk') {
      if (this.x > this.targetPoint) {
        this.speedX = -this.maxSpeed
        if (this.x + this.speedX < this.targetPoint) {
          this.x = this.targetPoint
          this.status = 'idle'
        }
      } else if (this.x < this.targetPoint) {
        this.speedX = this.maxSpeed
        if (this.x + this.speedX > this.targetPoint) {
          this.x = this.targetPoint
          this.status = 'idle'
        }
      } else {
        this.speedX = 0
        this.status = 'idle'
      }
    } else {
      this.speedX = 0
      this.status = 'idle'
    }

    if ((this.x + this.speedX) < 0) this.x += 0
    else this.x += this.speedX
  }
}

module.exports = Player
