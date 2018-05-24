const PIXI = require('pixi.js')

class Background {
  constructor(name, url, windowH, windowW, layers) {
    const Element = []
    const allWidth = (180 * 96)
    let nowWidth = 0
    let counter = 0
    console.log('start_test')
    while (nowWidth < allWidth && (counter < 10)) {
      let layerBackground
      for (let i = layers; i >= 1; i -= 1) {
        const texture = PIXI.Texture.fromImage(`http://localhost:4000/game/getBackground/1/${url}_${i}`);
        layerBackground = new PIXI.Sprite(texture)
        layerBackground.interactive = true
        layerBackground.anchor.set(0, 0)
        layerBackground.x = nowWidth
        layerBackground.y = 0
        Element.push(layerBackground)
      }
      nowWidth += 180 * 24
      console.log(nowWidth)
      counter += 1
    }
    this.Element = Element
    this.name = name
    this.layers = layers
    console.log(this.Element)
  }

  parallax(x, factor) {
    let num_temp = 0
    for (let j = 0; j < 4; j += 1) {
      for (let i = 0; i < this.layers; i += 1) {
        this.Element[num_temp].x = (x / ((this.layers - i) * 3)) + ((((1080 / this.Element[num_temp]._texture.baseTexture.realHeight) * this.Element[num_temp]._texture.baseTexture.realWidth) * factor) * j)
        this.Element[num_temp].width = ((1080 / this.Element[num_temp]._texture.baseTexture.realHeight) * this.Element[num_temp]._texture.baseTexture.realWidth) * factor
        this.Element[num_temp].height = (1080) * factor
        num_temp += 1
      }
    }
  }
}

export default Background
