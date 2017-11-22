const PIXI = require('pixi.js')

class BuildRealObject {
  constructor(id, name, width, height, posX, posY, frame, url, extra, scale, canGather) {
    
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
    this.Element.interactive = true
    this.Element.buttonMode = true
    this.Element.animationSpeed = 0.001
    this.Element.x = posX * TILE
    this.Element.y = (posY * TILE) - ((height + extra) * scale)
    this.Element.gotoAndPlay(0)
    this.Element.zIndex = 0
    this.name = name
    this.id = id
    this.canGather = canGather
    this.picture = `http://localhost:4000/getGame/1/${url}/`
  }
}

export default BuildRealObject
