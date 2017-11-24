const PIXI = require('pixi.js')

class Item {
  constructor(id, name, width, height, frame, url, scale) {
    
    const sprite = PIXI.Sprite.fromImage(
      `http://localhost:4000/getGame/1/${url}/`,
      true
    )
    const TILE = 64
    const setTexture = []
    for (let i = 0; i < frame; i += 1) {
      const texture = new PIXI.Texture(sprite.texture, new PIXI.Rectangle(width * 64 * i, 0, width * 64, height))
      setTexture.push(texture)
    }
    this.Element = new PIXI.extras.AnimatedSprite(setTexture)
    this.Element.anchor.x = 0
    this.Element.anchor.y = 0
    this.Element.scale.set(scale, scale)
    this.Element.animationSpeed = 0.001
    this.name = name
    this.id = id
    this.picture = `http://localhost:4000/getGame/1/${url}/`
  }
}

export default Item
