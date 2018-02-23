import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Player from '../../classes/Player'
import Background from '../../classes/Background'
import BuildRealObject from '../../classes/BuildRealObject'

import checkInteract from '../../game_methods/checkInteract'
import showEffect from '../../game_methods/showEffect'


const PIXI = require('pixi.js')
const display = require('pixi-layers')

console.log(PIXI.display)
PIXI.utils.sayHello('start pixi')

const app = new PIXI.Application(64 * 48, 640)
app.stage = new PIXI.display.Stage();
const objectContainer = new PIXI.Container()
const backgroundContainer = new PIXI.Container()
const landContainer = new PIXI.Container()
const effectContainer = new PIXI.Container()
const notPlayerContainer = new PIXI.Container()
const playerContainer = new PIXI.Container()
const lighting = new PIXI.display.Layer();
let objIdNow = 0

class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const dataWorld = axios.get('http://localhost:4000/generateWorld/1')
    if (app.renderer instanceof PIXI.CanvasRenderer) {
      console.log('canvas')
    } else {
      console.log('webGL')
    }
    notPlayerContainer.addChild(backgroundContainer);
    notPlayerContainer.addChild(objectContainer);
    notPlayerContainer.addChild(effectContainer);
    notPlayerContainer.addChild(landContainer);
    app.stage.addChild(notPlayerContainer)
    app.stage.addChild(playerContainer);
    console.log(lighting)
    lighting.on('display', function (element) {
        element.blendMode = PIXI.BLEND_MODES.ADD
    });
    lighting.filters = [new PIXI.filters.VoidFilter()];
    lighting.filters[0].blendMode = PIXI.BLEND_MODES.MULTIPLY;

    lighting.filterArea = app.screen;
    // lighting.filterArea = new PIXI.Rectangle(100, 100, 600, 400); //<-- try uncomment it

    app.stage.addChild(lighting);

    var ambient = new PIXI.Graphics();
    // ambient.beginFill(0xffffff, 1.0);
    // ambient.drawRect(0, 0, 64 * 24, 640);
    // ambient.endFill();
    lighting.addChild(ambient); //<-- try comment it
    var d = new Date();
    var n = d.getMinutes();
    var timeGame = n / 5 * 2
    if(timeGame >= 6 && timeGame <= 17) ambient.beginFill(0xffffff, 1);
    else if(timeGame >= 4 && timeGame < 6) ambient.beginFill(0x884444, 1);
    else if(timeGame > 17 && timeGame <= 19) ambient.beginFill(0x444488, 1);
    else ambient.beginFill(0x101010, 1);
    ambient.drawRect(0, 0, 64 * 48, 640);
    ambient.endFill();
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
    const background = new Background('background', 'forest', app.renderer.height, app.renderer.width, 7)
    // effect have unit in pixel in term of width and height
    let mousePosition = getMousePosition()
    let i = 0
    for (i = 0; i < background.Element.length; i += 1) {
      backgroundContainer.addChild(background.Element[i])
    }
    document.getElementById('test').appendChild(app.view)

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

    let r = 0
    let g = 0
    let b = 0

    const changeBg = (lastR, lastG, lastB, speedColor) => {
      if(r > lastR) {
        r -= speedColor
        if(r <= lastR) r = lastR
      } else if (r < lastR){
        r += speedColor
        if(r >= lastR) r = lastR
      }
  
      if(g > lastG) {
        g -= speedColor
        if(g <= lastG) g = lastG
      } else if (g < lastG){
        g += speedColor
        if(g >= lastG) g = lastG
      }
  
      if(b > lastB) {
        b -= speedColor
        if(b <= lastB) b = lastB
      } else if (b < lastB){
        b += speedColor
        if(b >= lastB) b = lastB
      }
        // if ((r << 16) + (g << 8) + (b) > 0xFFFFFF) app.renderer.backgroundColor = 0xFFFFFF
        // else app.renderer.backgroundColor = (r << 16) + (g << 8) + (b)
      // app.renderer.backgroundColor = (r << 16) + (g << 8) + (b)
      ambient.beginFill((r << 16) + (g << 8) + (b), 1.0);
      ambient.drawRect(0, 0, 64 * 24, 640);
      ambient.endFill();
      // app.renderer.backgroundColor = (r << 16) + (g << 8) + (b)
     
    }

    const assetsLoaded = () => {
      const BASE = 9
      const LAND = 10
      const TILE = 64
      const MAX_TILE = 48

      const AllObjects = []
      const heroWalk = new Player('hero-walk', { x: 1 * TILE, y: BASE * TILE }, 2)
      var lightbulb = new PIXI.Graphics();
      var rr = 0xff;
      var rg = 0xff;
      var rb = 0xff;
      lightbulb.beginFill(0xffffff, 1.0);
      if(timeGame < 4 || timeGame >= 20) lightbulb.drawCircle(0, 0, 25);
      else lightbulb.drawCircle(0, 0, 50);
      lightbulb.endFill();
      lightbulb.parentLayer = lighting;
      var blurFilter1 = new PIXI.filters.BlurFilter();
      blurFilter1.blur = 50
      lightbulb.filters = [blurFilter1];
      heroWalk.animate.addChild(lightbulb);
      // create land
      const Land = []

      for (i = 0; i < MAX_TILE; i += 1) {
        Land.push(new BuildRealObject(objIdNow, 'land', TILE, TILE, i, LAND, 1, 'distland', 0, 1, [{
          name: 'move',
          item: []
        }]))
        landContainer.addChild(Land[i].Element)
        checkInteract({
          stage: landContainer,
          object: Land[i],
          heroWalk,
          setStore: onWalk,
          setAction,
          showObject
        })
      }

      // width in TILE, height in pixels, posx , pos Y, frame image, name url,
      dataWorld.then((response) => {
        this.setState({
          loading: false
        })
        const allObj = response.data[0]
        for (i = 0; i < allObj.length; i += 1) {
          const newObj = new BuildRealObject(
            allObj[i].id,
            allObj[i].name,
            allObj[i].width,
            allObj[i].height,
            allObj[i].pos, // posX
            LAND - 1, // posY
            1,
            allObj[i].url,
            allObj[i].extra,
            allObj[i].scale,
            allObj[i].actions,
            allObj[i].sciName,
            allObj[i].description
          )
          objectContainer.addChild(newObj.Element)
          checkInteract({
            stage: objectContainer,
            object: newObj,
            heroWalk,
            setStore: onWalk,
            setAction,
            showObject
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

      checkInteract({
        stage: backgroundContainer,
        object: background,
        heroWalk,
        setStore: onIdle,
        setAction,
        showObject,
        bg: true
      })
      playerContainer.addChild(heroWalk.animate)
      app.ticker.add(() => {
        const { status, activeObject, setStatus, action, placeObject, placeObjectToG, time } = this.props
        mousePosition = getMousePosition()
        mousePosition.x = parseInt(mousePosition.x, 10)
        mousePosition.y = parseInt(mousePosition.y, 10)
        heroWalk.checkSide(mousePosition)
        const playerStatus = heroWalk.checkStatus(status, setStatus)
        if (action === 'gather') {
          if (Math.abs(heroWalk.animate.x - activeObject.Element.x) <= TILE) {
            showEffect({
              stage: effectContainer,
              object: activeObject,
              setAction,
              addItem,
              showObject
            })
            setAction(null)
            onIdle()
            heroWalk.status = 'idle'
          }
        }
        if (placeObject) {
          const newObj = new BuildRealObject(
            placeObject.id,
            placeObject.name,
            placeObject.width,
            placeObject.height,
            parseInt(heroWalk.animate.x / TILE, 10), // posX
            LAND - 1, // posY
            1,
            placeObject.url,
            placeObject.extra,
            placeObject.scale,
            placeObject.actions,
            placeObject.sciName,
            placeObject.description
          )
          objectContainer.addChild(newObj.Element)
          checkInteract({
            stage: objectContainer,
            object: newObj,
            heroWalk,
            setStore: onWalk,
            setAction,
            showObject
          })
          placeObjectToG(null)
        }

        background.parallax(heroWalk.animate.x)
      })

      // app.start()
    }

    // app.stop()
    PIXI.loader
    .add('hero', 'http://localhost:4000/getGame/1/hero-idle/')
    .load(assetsLoaded)
  }

  render() {
    return (
      <div>
        { this.state.loading && 'loading' } <div id="test" />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    time: state.world.time,
    status: state.world.status,
    activeObject: state.world.activeObject,
    action: state.world.action,
    placeObject: state.world.placeObject
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
    setStatus: (status) => {
      dispatch({ type: 'SET_STATUS', payload: status })
    },
    showObject: (object) => {
      dispatch({ type: 'SET_OBJECT', payload: object })
    },
    addItem: (object) => {
      dispatch({ type: 'ADD_ITEM', payload: object })
    },
    placeObjectToG: (object) => {
      dispatch({ type: 'PLACE_OBJECT', payload: object })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
