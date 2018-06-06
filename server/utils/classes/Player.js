class Player {
  constructor({ id, detail }) {
    this.id = id
    this.detail = detail
    this.x = detail.pos.x
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
      if (this.detail.gameGeneralStatus.energy > 0) {
        this.detail.gameGeneralStatus.energy -= 0.05
        if (this.detail.gameGeneralStatus.energy <= 0) {
          this.detail.gameGeneralStatus.energy = 0
        }
      }
      this.speedX = this.maxSpeed
      this.status = 'move'
      this.side = 'right'
    } else if (this.pressingLeft) {
      if (this.detail.gameGeneralStatus.energy > 0) {
        this.detail.gameGeneralStatus.energy -= 0.05
        if (this.detail.gameGeneralStatus.energy <= 0) {
          this.detail.gameGeneralStatus.energy = 0
        }
      }
      this.speedX = -this.maxSpeed
      this.status = 'move'
      this.side = 'left'
    } else if (this.status === 'auto-walk') {
      if (this.detail.pos.x > this.targetPoint) {
        this.speedX = -this.maxSpeed
        if (this.detail.pos.x + this.speedX < this.targetPoint) {
          this.detail.pos.x = this.targetPoint
          this.status = 'idle'
        }
      } else if (this.detail.pos.x < this.targetPoint) {
        this.speedX = this.maxSpeed
        if (this.detail.pos.x + this.speedX > this.targetPoint) {
          this.detail.pos.x = this.targetPoint
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

    if ((this.detail.pos.x + this.speedX) < 0) this.detail.pos.x += 0
    else this.detail.pos.x += this.speedX

    this.x = this.detail.pos.x
    this.detail.gameGeneralStatus.hunger -= 0.5
    if (this.detail.gameGeneralStatus.hunger <= 0) {
      this.detail.gameGeneralStatus.hunger = 0
      this.detail.gameGeneralStatus.health -= 0.05
      if (this.detail.gameGeneralStatus.health <= 0) {
        this.detail.gameGeneralStatus.health = 100
        this.detail.gameGeneralStatus.energy = 100
        this.detail.gameGeneralStatus.hunger = 100
        this.detail.experience.nowExp = 0
      }
    }
  }
}

module.exports = Player
