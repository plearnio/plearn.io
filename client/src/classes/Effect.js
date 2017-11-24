const PIXI = require('pixi.js')

class Effect {
  constructor(name, width, height, url, frame) {
    const effectSprite = PIXI.Sprite.fromImage(
      `http://localhost:4000/getGame/1/effect/${url}/`,
      true
    )
    const setTexture = []
    for (let i = 0; i < frame; i += 1) {
      const texture = new PIXI.Texture(effectSprite.texture, new PIXI.Rectangle(width * i, 0, width, height))
      setTexture.push(texture)
    }
    this.Animate = new PIXI.extras.AnimatedSprite(setTexture)
    this.Animate.anchor.x = 0
    this.Animate.anchor.y = 0
    this.Animate.scale.set(1, 0.5)
    this.Animate.animationSpeed = 0.1
    this.Animate.loop = false;
  }
}

export default Effect
