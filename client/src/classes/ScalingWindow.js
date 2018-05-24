class ScalingWindow {
  constructor() {
    this.tileSize = 180
    this.baseTileSize = 180
    this.factor = 1
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight
    this.marginLeft = 0
    this.marginTop = 0
    this.bestWidth = 1080
    this.baseFloor = 8
    this.baseObjectFloor = this.baseFloor - 1
  }
  scalingApp(element) {
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight
    if (this.windowWidth / this.windowHeight > 2) {
      this.marginLeft = (this.windowWidth - (2 * this.windowHeight)) / 2
      document.getElementById(element).style.marginLeft = `${this.marginLeft}px`
      document.getElementById(element).style.marginTop = '0px'
      this.windowWidth = this.windowHeight * 2
      this.factor = this.windowHeight / this.bestWidth
      this.tileSize = (this.bestWidth / this.baseFloor) * (this.windowHeight / this.bestWidth)
    } else if (this.windowHeight > this.windowWidth) {
      this.marginTop = (this.windowHeight - this.windowWidth) / 2
      document.getElementById(element).style.marginTop = `${this.marginTop}px`
      document.getElementById(element).style.marginLeft = '0px'
      this.windowHeight = this.windowWidth
      this.factor = this.windowWidth / this.bestWidth
      this.tileSize = (this.bestWidth / this.baseFloor) * (this.windowWidth / this.bestWidth)
    } else {
      this.marginLeft = 0
      this.marginTop = 0
      this.factor = this.windowHeight / this.bestWidth
      this.tileSize = (this.bestWidth / this.baseFloor) * (this.windowHeight / this.bestWidth)
      document.getElementById(element).style.marginTop = '0px'
      document.getElementById(element).style.marginLeft = '0px'
    }
    this.factorTileSize = this.tileSize / this.baseTileSize
  }
}

export default ScalingWindow