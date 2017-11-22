const PIXI = require('pixi.js')

class Background {
  constructor(name, url, windowH, windowW, layers) {
    const Element = []
    for (let i = 7; i >= 1; i -= 1) {
      const texture = PIXI.Texture.fromImage(`http://localhost:4000/getGame/1/${url}/${i}`);
      const layerBackground = new PIXI.Sprite(texture)
      layerBackground.interactive = true
      // center bottom bg
      layerBackground.anchor.set(0, 1)
      layerBackground.x = windowW
      layerBackground.y = windowH
      Element.push(layerBackground)
    }
    this.Element = Element
    this.name = name
    this.layers = layers
  }

  parallax(x) {
    for (let i = 0; i < this.layers; i += 1) {
      this.Element[i].x = (-x * (i / 10))
    }
  }
}

export default Background
