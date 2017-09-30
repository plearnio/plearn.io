const PIXI = require('pixi.js')

class BuildSprite {
  constructor(name, frame, pos) {
    const sprite = PIXI.Sprite.fromImage(`http://localhost:4000/getGame/1/${name}/`, true)
    const heroTexture = []
    let i = 0
    for (i = 0; i < frame; i += 1) {
      const texture = new PIXI.Texture(sprite.texture, new PIXI.Rectangle(16 * i, 0, 16, 14))
      heroTexture.push(texture)
    }
    this.speed = 1
    this.animate = new PIXI.extras.AnimatedSprite(heroTexture)
    this.animate.anchor.x = 0.5
    this.animate.scale.set(8, 8)
    this.animate.animationSpeed = 0.2
    this.pos = pos
    this.statusArg = pos
    this.status = 'walk'
    this[this.status](this.statusArg)
  }

  checkSide(mousePosition) {
    if (mousePosition.x > this.animate.x) {
      this.animate.scale.set(8, 8)
    } else if (mousePosition.x <= this.animate.x - 1) {
      this.animate.scale.set(-8, 8)
    }
  }

  walk(goal) {
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
}

export default BuildSprite
