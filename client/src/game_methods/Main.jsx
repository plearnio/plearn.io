import React, { Component } from 'react'
import BuildSprite from '../classes/BuildSprite'

const PIXI = require('pixi.js')


const Sprite = PIXI.Sprite
const Rectangle = PIXI.Rectangle
PIXI.utils.sayHello('start pixi')

const app = new PIXI.Application(800, 600)

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
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
    const assetsLoaded = () => {

      const allFunction = {}
      allFunction.hello = (value) => {
        console.log(value)
      }
      const runFunction = (fnstring, fnparams) => {
        console.log(fnparams)
        if (typeof allFunction[fnstring] === 'function') allFunction[fnstring](fnparams)
      }
      runFunction('hello', 'test')
      const heroWalk = new BuildSprite('hero-walk', 7, { x: 100, y: 0 })
      const heroIdle = new BuildSprite('hero-idle', 8, { x: 400, y: 0 })
      heroWalk.animate.gotoAndPlay(0)
      heroIdle.animate.gotoAndPlay(0)
      heroWalk.animate.x = 100
      heroIdle.animate.x = 400
      app.stage.addChild(heroWalk.animate)
      app.stage.addChild(heroIdle.animate)
      const getMousePosition = () => app.renderer.plugins.interaction.mouse.global
      app.ticker.add(() => {
        const mousePosition = getMousePosition()
        mousePosition.x = parseInt(mousePosition.x, 10)
        mousePosition.y = parseInt(mousePosition.y, 10)
        heroIdle.checkSide(mousePosition)
        heroWalk.checkSide(mousePosition)
        background.on('pointerdown', () => {
          heroIdle.status = 'walk'
          heroIdle.statusArg.x = mousePosition.x
          heroIdle.statusArg.y = mousePosition.y
          heroIdle.statusArg = heroIdle.pos
          heroWalk.statusArg.x = mousePosition.x
          heroWalk.statusArg.y = mousePosition.y
          heroWalk.statusArg = heroWalk.pos
        })
        heroIdle[heroIdle.status]()
        heroWalk[heroWalk.status]()
      })
      app.start()
    }

    app.stop()
    PIXI.loader
    .add('hero', 'http://localhost:4000/getGame/1/hero-idle/')
    .load(assetsLoaded)
  }

  render() {
    return (
      <div id="test" />
    )
  }
}

export default Main
