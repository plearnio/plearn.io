import React, { Component } from 'react'
import { connect } from 'react-redux'

import Player from '../../classes/Player'
import Background from '../../classes/Background'
import BuildRealObject from '../../classes/BuildRealObject'

import checkInteract from '../../game_methods/checkInteract'
import showEffect from '../../game_methods/showEffect'

const PIXI = require('pixi.js')

PIXI.utils.sayHello('start pixi')

const app = new PIXI.Application(768, 640)
const objectContainer = new PIXI.Container()
const backgroundContainer = new PIXI.Container()
const playerContainer = new PIXI.Container()
const landContainer = new PIXI.Container()
const effectContainer = new PIXI.Container()
let objIdNow = 0

class Main extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    app.stage.addChild(backgroundContainer);
    app.stage.addChild(objectContainer);
    app.stage.addChild(effectContainer);
    app.stage.addChild(landContainer);
    app.stage.addChild(playerContainer);
    const {
      status,
      activeObject,
      showObject,
      onWalk,
      onIdle,
      onInteract,
      addItem,
      setAction,
    } = this.props
    const getMousePosition = () => app.renderer.plugins.interaction.mouse.global
    const background = new Background('background', 'hill', app.renderer.height, app.renderer.width, 7)
    // effect have unit in pixel in term of width and height
    let mousePosition = getMousePosition()
    let i = 0
    for (i = 0; i < background.Element.length; i += 1) {
      backgroundContainer.addChild(background.Element[i])
    }
    document.getElementById('test').appendChild(app.view)

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

    const assetsLoaded = () => {
      console.log(this.props)
      const BASE = 9
      const LAND = 10
      const TILE = 64

      const AllObjects = []
      const heroWalk = new Player('hero-walk', { x: 1 * TILE, y: BASE * TILE }, 2)
      // create land
      const Land = []
      for (i = 0; i < 12; i += 1) {
        Land.push(new BuildRealObject(objIdNow, 'land', 1, TILE, i, LAND, 1, 'distland', 0, 1))
        landContainer.addChild(Land[i].Element)
        checkInteract({
          stage: landContainer,
          object: Land[i],
          heroWalk,
          setStore: onWalk,
          status: 'walk',
          showObject
        })
      }
      // add to stage

      // AllObjects.push(new BuildDummyObject('grass', 1, 1, 0, LAND - 1, 0x668866))
      // width in TILE, height in pixels, posx , pos Y, frame image, name url,
      AllObjects.push(new BuildRealObject(objIdNow, 'tree', 1, 120, 3, 9, 6, 'tree', -5, 3, false))
      AllObjects.push(new BuildRealObject(objIdNow, 'grass', 0.5, 27, 5, LAND - 1, 1, 'grass', 0, 1.5, true))
      AllObjects.push(new BuildRealObject(objIdNow, 'grass', 0.5, 27, 11, LAND - 1, 1, 'grass', 0, 1.5, true))
      AllObjects.push(new BuildRealObject(objIdNow, 'grass', 0.5, 27, 2, LAND - 1, 1, 'grass', 0, 1.5, true))
      // Shadows are the lowest
      for (i = 0; i < AllObjects.length; i += 1) {
        objectContainer.addChild(AllObjects[i].Element)
        if (AllObjects[i].Effect) {
          checkInteract({
            stage: objectContainer,
            object: AllObjects[i],
            heroWalk,
            setStore: onWalk,
            status: 'walk',
            showObject
          })
        }
        checkInteract({
          stage: objectContainer,
          object: AllObjects[i],
          heroWalk,
          setStore: onWalk,
          status: 'walk',
          showObject
        })
      }
      checkInteract({
        stage: backgroundContainer,
        object: background,
        heroWalk,
        setStore: onIdle,
        status: 'idle',
        showObject,
        bg: true
      })
      playerContainer.addChild(heroWalk.animate)
      app.ticker.add(() => {
        const { status, activeObject } = this.props
        mousePosition = getMousePosition()
        mousePosition.x = parseInt(mousePosition.x, 10)
        mousePosition.y = parseInt(mousePosition.y, 10)
        heroWalk.checkSide(mousePosition)
        const playerStatus = heroWalk.checkStatus(status, activeObject)
        if (playerStatus === 'interact') {
          console.log('hero interact')
          showEffect({
            stage: effectContainer,
            object: activeObject,
            setAction,
            addItem
          })
          onIdle()
          heroWalk.status = 'idle'
        }
        background.parallax(heroWalk.animate.x)
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
    status: state.world.status,
    activeObject: state.world.activeObject,
    action: state.world.action,
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
    onInteract: () => {
      dispatch({ type: 'INTERACT' })
    },
    setAction: (action) => {
      dispatch({ type: 'SET_ACTION', payload: action })
    },
    showObject: (object) => {
      dispatch({ type: 'SET_OBJECT', payload: object })
    },
    addItem: (object) => {
      dispatch({ type: 'ADD_ITEM', payload: object })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
