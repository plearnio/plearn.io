import React, { Component } from 'react'
import { connect } from 'react-redux'

import Player from '../classes/Player'
import BuildDummyObject from '../classes/BuildDummyObject'
import BuildRealObject from '../classes/BuildRealObject'

import checkInteract from '../game_methods/checkInteract'

const PIXI = require('pixi.js')

PIXI.utils.sayHello('start pixi')

const app = new PIXI.Application(768, 640)

class Main extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { onInteract, onWalk, onIdle, status} = this.props
    const getMousePosition = () => app.renderer.plugins.interaction.mouse.global
    const background = new BuildDummyObject('background', app.renderer.width, app.renderer.height, 0, 0, 0x1099bb)

    let mousePosition = getMousePosition()
    let i = 0

    app.stage.addChild(background.Element)
    document.getElementById('test').appendChild(app.view)

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

    const assetsLoaded = () => {
      console.log(this.props)
      const BASE = 9
      const LAND = 10
      const TILE = 64

      const AllObjects = []

      // create land
      const Land = []
      for (i = 0; i < 12; i += 1) {
        Land.push(new BuildRealObject('land', 1, TILE, i * TILE, LAND, 1, 'distland', 0, 1))
      }
      // add to stage

      // AllObjects.push(new BuildDummyObject('grass', 1, 1, 0, LAND - 1, 0x668866))
      AllObjects.push(new BuildRealObject('tree', 1, 120, 2 * TILE, 9, 6, 'tree', -5, 3))
      AllObjects.push(new BuildRealObject('grass', 0.5, 27, 1 * TILE, LAND - 1, 1, 'grass', 0, 1.5))
      AllObjects.push(new BuildRealObject('grass', 0.5, 27, 0 * TILE, LAND - 1, 1, 'grass', 0, 1.5))
      AllObjects.push(new BuildRealObject('grass', 0.5, 27, 5 * TILE, LAND - 1, 1, 'grass', 0, 1.5))

      const heroWalk = new Player('hero-walk', { x: 1 * TILE, y: BASE * TILE }, 2)

      for (i = 0; i < AllObjects.length; i += 1) {
        app.stage.addChild(AllObjects[i].Element)
        checkInteract({
          object: AllObjects[i],
          heroWalk,
          setStore: onWalk,
          status: 'walk',
          onInteract
        })
      }

      for (i = 0; i < Land.length; i += 1) {
        app.stage.addChild(Land[i].Element)
        checkInteract({
          object: Land[i],
          heroWalk,
          setStore: onWalk,
          status: 'walk',
          onInteract
        })
      }
      checkInteract({
        object: background,
        heroWalk,
        setStore: onIdle,
        status: 'idle',
        onInteract
      })
      app.stage.addChild(heroWalk.animate)
      app.ticker.add(() => {
        const { status } = this.props
        mousePosition = getMousePosition()
        mousePosition.x = parseInt(mousePosition.x, 10)
        mousePosition.y = parseInt(mousePosition.y, 10)
        heroWalk.checkSide(mousePosition)
        heroWalk.checkStatus(status)
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
      <div>
        <div id="test" />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.status,
    activeObject: state.activeObject
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onWalk: () => {
      dispatch({ type: 'WALK' })
    },
    onIdle: () => {
      dispatch({ type: 'IDLE' })
    },
    onInteract: (object) => {
      dispatch({ type: 'SET_OBJECT', payload: object })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
