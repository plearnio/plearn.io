// import showEffect from '../game_methods/showEffect'

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
      }, {
        name: 'auto-walk',
        picName: 'hero-walk',
        frame: 7
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
}

export default Player
