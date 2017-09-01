import React, { Component } from 'react'

const PIXI = require('pixi.js')
PIXI.utils.sayHello('start pixi')

const app = new PIXI.Application(800, 600)
const styles = {
  Main: {
    color: 'white',
    backgroundColor: '#3f3f46',
    padding: '20px',
    borderRadius: '10px',
  }
}

class Main extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const background = new PIXI.Graphics()
    background.interactive = true
    background.beginFill(0x1099bb)
    background.drawRect(0, 0, app.renderer.width, app.renderer.height)
    app.stage.addChild(background)
    document.getElementById('test').appendChild(app.view)

    const sendResult = (name) => {
      this.props.passData(name)
    }

    const getObject = (pic, x, y, speed, scale) => {
      const Sprite = PIXI.Sprite.fromImage(`http://localhost:4000/getPic/1/${pic}`)
      this.x = 1
      Sprite.scale.set(scale)
      Sprite.x = x
      Sprite.y = y
      Sprite.interactive = true
      Sprite.buttonMode = true
      Sprite.on('pointerdown', () => sendResult(pic))

      app.stage.addChild(Sprite)

      app.ticker.add((delta) => {
        if (Sprite.x > app.renderer.width) Sprite.x = 0 - Sprite.width
        Sprite.x += speed * delta
      })
    }

    const Chung = []
    Chung.push(PIXI.Texture.fromImage(`http://localhost:4000/getAnimate/1/chung/1`))
    Chung.push(PIXI.Texture.fromImage(`http://localhost:4000/getAnimate/1/chung/2`))

    const Lay = []
    Lay.push(PIXI.Texture.fromImage(`http://localhost:4000/getAnimate/1/lay/1`))
    Lay.push(PIXI.Texture.fromImage(`http://localhost:4000/getAnimate/1/lay/2`))

    const getAnimate = (target, x, y, speed, scale, toggle) => {
      const Animate = new PIXI.extras.AnimatedSprite(target)

      Animate.scale.set(scale)
      Animate.x = x
      Animate.y = y
      Animate.interactive = true
      Animate.buttonMode = true
      Animate.on('pointerdown', () => {
        if (toggle === 0) {
          sendResult('chung')
          getAnimate(Lay, Animate.x, Animate.y, speed, scale, 1)
        } else {
          sendResult('lay')
          getAnimate(Chung, Animate.x, Animate.y, speed, scale, 0)
        }
        Animate.parent.removeChild(Animate)
      })
      Animate.gotoAndPlay(10)
      Animate.animationSpeed = 0.1

      app.stage.addChild(Animate)
      app.start()
      app.ticker.add((delta) => {
        if (Animate.x > app.renderer.width) Animate.x = 0 - Animate.width
        Animate.x += speed * delta
      })
    }
    app.stop()
    background.on('pointerdown', (event) => {
      sendResult('test')
      const { x, y } = event.data.global;
      getAnimate(Chung, x, y, Math.random() * 4, Math.random() * 0.5, 0)
    })
    app.start()
    getObject('banana', app.renderer.width / 4, app.renderer.height / 4, 2, 0.2)
    getObject('potato', app.renderer.width / 2, app.renderer.height / 2, 5, 0.3)
  }

  render() {
    const { data } = this.props
    return (
      <div id="test" />
    )
  }
}

export default Main
