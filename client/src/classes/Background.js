const PIXI = require('pixi.js')

class Background {
  constructor(name, url, windowH, windowW, layers) {
    const Element = []
    for (let i = 7; i >= 1; i -= 1) {
      const texture = PIXI.Texture.fromImage(`http://localhost:4000/game/getBackground/1/${url}/${i}`);
      const layerBackground = new PIXI.Sprite(texture)
      layerBackground.interactive = true
      layerBackground.anchor.set(0, 0)
      layerBackground.x = 0
      layerBackground.y = 0
      Element.push(layerBackground)
    }
    this.Element = Element
    this.name = name
    this.layers = layers
    console.log(this.Element)
  }

  parallax(x, factor) {
    for (let i = 0; i < this.layers; i += 1) {
      this.Element[i].x = x / ((this.layers - i) * 5)
      this.Element[i].width = ((1080 / this.Element[i]._texture.baseTexture.realHeight) * this.Element[i]._texture.baseTexture.realWidth) * factor
      this.Element[i].height = (1080) * factor
    }
  }
}

export default Background
