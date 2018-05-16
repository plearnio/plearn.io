import showEffect from '../game_methods/showEffect'

const PIXI = require('pixi.js')


class Player {
  constructor(name, pos, speed) {
    const allStatus = [
      {
        name: 'move',
        picName: 'hero-walk',
        frame: 7
      }, {
        name: 'idle',
        picName: 'hero-idle',
        frame: 8
      }, {
        name: 'interact',
        picName: 'hero-idle',
        frame: 8
      }
    ]
    this.animateSet = {}
    for (let i = 0; i < allStatus.length; i += 1) {
      const sprite = PIXI.Sprite.fromImage(
        `http://localhost:4000/game/getPlayer/1/${allStatus[i].picName}/`,
        true
      )
      const setTexture = []
      for (let j = 0; j < allStatus[i].frame; j += 1) {
        const texture = new PIXI.Texture(sprite.texture, new PIXI.Rectangle(16 * j, 0, 16, 14))
        setTexture.push(texture)
      }
      this.animateSet[allStatus[i].name] = setTexture
    }
    console.log(this.animateSet)
    this.name = name
    this.speed = speed
    this.pos = pos
    this.status = 'idle'
    this.textureStatus = 'idle'
    this.toggleStatus = 0
    this.setAnimate(this.animateSet.idle)
  }

  setAnimate(texture) {
    this.animate = new PIXI.extras.AnimatedSprite(texture)
    this.animate.anchor.x = 0.5
    this.animate.anchor.y = 1
    this.animate.scale.set(4, 4)
    this.animate.animationSpeed = 0.2
    this.animate.x = this.pos.x
    this.animate.y = this.pos.y
    this.animate.gotoAndPlay(0)
  }

  checkSide(mousePosition) {
    if (mousePosition.x > this.animate.x) {
      this.animate.scale.set(4, 4)
    } else if (mousePosition.x <= this.animate.x - 1) {
      this.animate.scale.set(-4, 4)
    }
  }

  // use in 2 dimension
  walkToAny(goal) {
    if (this.pos !== goal) {
      const dx = this.pos.x - this.animate.x
      const dy = this.pos.y - this.animate.y
      const angle = Math.atan2(dy, dx)
      const xVelo = Math.cos(angle) * this.speed
      const yVelo = Math.sin(angle) * this.speed
      this.animate.x += xVelo
      this.animate.y += yVelo
    }
  }

  move(setStatus) {
    const dx = parseInt(this.mousePoint.x - this.animate.x, 10)
    if (!(dx > -1.5 && dx < 1.5)) {
      this.status = 'move'
      const angle = Math.atan2(0, dx)
      const xVelo = Math.cos(angle) * this.speed
      this.animate.x += xVelo
    } else {
      this.status = 'idle'
      setStatus('idle')
    }
  }

  setMousePoint(value) {
    this.mousePoint = value
  }

  checkStatus(status, setStatus) {
    if (this.textureStatus !== this.status) {
      this.animate.textures = this.animateSet[this.status]
      this.animate.gotoAndPlay(0)
      this.textureStatus = this.status
    }
    switch (status) {
      case 'move' :
        this.move(setStatus)
        break
      case 'idle' :
        this.interact()
        break
      default :
        this.idle()
        break
    }
    return this.status
  }

  idle() {
    this.animate.x += 0
    this.status = 'idle'
  }

  interact() {
    this.animate.x += 0
    this.status = 'interact'
  }
}

export default Player
