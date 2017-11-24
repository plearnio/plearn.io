const PIXI = require('pixi.js')

class BuildDummyObject {
  constructor(name, width, height, posX, posY, color) {
    const TILE = 64
    this.Element = new PIXI.Graphics()
    this.name = name;
    const Element = this.Element
    Element.pivot.x = 0;
    Element.pivot.y = TILE;
    Element.interactive = true
    if (name !== 'background') Element.buttonMode = true
    Element.beginFill(color)
    Element.drawRect(posX * TILE, posY * TILE, TILE * width, TILE * height)
  }
}

export default BuildDummyObject
