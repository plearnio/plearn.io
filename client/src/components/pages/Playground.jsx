import React, { Component } from 'react'
import io from 'socket.io-client'
import Cookies from 'js-cookie'
import os from 'os'
import axios from 'axios'

// classes
import ScalingWindow from '../../classes/ScalingWindow'
// assets
import imageStatusBar from '../../assets/status_bar.png'
import buttonAction from '../../assets/button-interact.png'
import hourHand from '../../assets/hour_hand.png'

import Player from '../../classes/Player'
import Background from '../../classes/Background'

const PIXI = require('pixi.js')
const display = require('pixi-layers')

const socket = io('http://localhost:4444', {
  query: {
    _token: Cookies.get('__token')
  }
})


PIXI.utils.sayHello('start pixi')

// GLOBAL VARS
const app = new PIXI.Application(window.innerWidth, window.innerHeight)
app.renderer.view.style.position = 'absolute'
app.renderer.view.style.display = 'block'
app.renderer.autoResize = true
app.renderer.backgroundColor = 0xffffff
const cover = new PIXI.Sprite(PIXI.Texture.WHITE);
// const backgroundClass = new PIXI.Sprite(PIXI.Texture.WHITE);
const biomeBg = 'bg_1'
const background = new Background('background', biomeBg, app.renderer.height, app.renderer.width, 7)
const blurFilter = new PIXI.filters.BlurFilter()
const graphicContainer = new PIXI.Container()
const backgroundContainer = new PIXI.Container()
const otherPlayerContainer = new PIXI.Container()
const mainPlayerContainer = new PIXI.Container()
const objectContainer = new PIXI.Container()
const frontContainer = new PIXI.Container()
const landfrontContainer = new PIXI.Container()

const playerData = {
  thisPlayer: {},
  allPlayer: {}
}

let worldDataSocket = {}

const allObject = []

const globalAreaData = {
  data: {},
  allLand: [],
  graphicLand: []
}

const dataObjLayers = [[], [], []]

let layoutContainer

const setScaling = ({ element, x, y, factor, scale }) => {
  element.x = x * factor
  element.y = y * factor
  element.scale.set(scale.x * factor, scale.y * factor)
}

class GameElementData {
  constructor() {
    this.statusBar = PIXI.Sprite.fromImage(imageStatusBar)
    this.hourHand = PIXI.Sprite.fromImage(hourHand)
    this.timeText = new PIXI.Text('00:00')
    this.health = new PIXI.Text('health: 100')
    this.energy = new PIXI.Text('energy: 100')
    this.hunger = new PIXI.Text('hunger: 100')
    this.initialData()
  }
  initialData() {
    this.timeText.x = 30
    this.timeText.y = 200
    const healthBar = new PIXI.Graphics();
    healthBar.beginFill(0xd2715e);
    healthBar.lineStyle(0);
    healthBar.drawCircle(0, 0, 22);
    healthBar.endFill();
    const healthBar_texture = app.renderer.generateTexture(healthBar);
    this.healthBar = new PIXI.Sprite(healthBar_texture);
    this.healthBar.x = 91;
    this.healthBar.y = 178;
    this.healthBar.anchor.set(0.5, 0.5)
    const energyBar = new PIXI.Graphics();
    energyBar.beginFill(0xdbea21);
    energyBar.lineStyle(0);
    energyBar.drawCircle(0, 0, 18);
    energyBar.endFill();
    const energyBar_texture = app.renderer.generateTexture(energyBar);
    this.energyBar = new PIXI.Sprite(energyBar_texture);
    this.energyBar.x = 138;
    this.energyBar.y = 178;
    this.energyBar.anchor.set(0.5, 0.5)
    const hungerBar = new PIXI.Graphics();
    hungerBar.beginFill(0x377661);
    hungerBar.lineStyle(0);
    hungerBar.drawCircle(0, 0, 18);
    hungerBar.endFill();
    const hungerBar_texture = app.renderer.generateTexture(hungerBar);
    this.hungerBar = new PIXI.Sprite(hungerBar_texture);
    this.hungerBar.x = 184;
    this.hungerBar.y = 175;
    this.hungerBar.anchor.set(0.5, 0.5)
    const expBar = new PIXI.Graphics();
    expBar.beginFill(0x4a4c59);
    expBar.lineStyle(0)
    expBar.drawRect(0, 0, 54, 12)
    expBar.endFill()
    const expBar_texture = app.renderer.generateTexture(expBar)
    this.expBar = new PIXI.Sprite(expBar_texture)
    this.expBar.x = 135
    this.expBar.y = 83
    frontContainer.addChild(this.healthBar)
    frontContainer.addChild(this.energyBar)
    frontContainer.addChild(this.hungerBar)
    frontContainer.addChild(this.expBar)
    frontContainer.addChild(this.statusBar)
    frontContainer.addChild(this.hourHand)
    this.statusBar.y = 50
    this.statusBar.x = 10
    this.hourHand.anchor.set(0.5, 0.5)
    this.hourHand.y = 116
    this.hourHand.x = 93
  }
  updateScaling(scaling, nowPlayerData) {
    setScaling({
      element: this.timeText, x: 30, y: 50, scale: { x: 1, y: 1 }, factor: scaling.factor
    })
    setScaling({
      element: this.health, x: 30, y: 100, scale: { x: 1, y: 1 }, factor: scaling.factor
    })
    setScaling({
      element: this.energy, x: 30, y: 140, scale: { x: 1, y: 1 }, factor: scaling.factor
    })
    setScaling({
      element: this.hunger, x: 30, y: 180, scale: { x: 1, y: 1 }, factor: scaling.factor
    })
    if (scaling.marginTop < 50) {
      this.statusBar.y = 60
    } else {
      this.statusBar.y = 0
    }
    this.hungerBar.scale.set((nowPlayerData.detail.gameGeneralStatus.hunger / 100))
    this.energyBar.scale.set((nowPlayerData.detail.gameGeneralStatus.energy / 100))
    this.healthBar.scale.set((nowPlayerData.detail.gameGeneralStatus.health / 100))
    this.expBar.scale.x = nowPlayerData.detail.experience.nowExp / nowPlayerData.detail.experience.maxExp
  }

  updateElement(worldData) {
    this.hourHand.rotation = (worldData.worldTime.hour * 15) * 0.0174533
  }

}

const Scaling = new ScalingWindow()
const GameElement = new GameElementData()

class ListDataObject {
  constructor() {
    this.objectData = {}
    this.target = null
  }
  listAction() {
    // console.log(this.objectData)
    app.stage.removeChild(layoutContainer)
    layoutContainer = new PIXI.Container()
    if (!(Object.keys(this.objectData).length === 0)) {
      app.stage.addChild(layoutContainer)
      dataObjLayers.forEach((layerData) => {
        if (layerData[this.objectData.id]) {
          if (this.target) this.target.sprite.alpha = 1
          this.target = layerData[this.objectData.id]
          this.target.sprite.alpha = 0.5
      // allObject[this.objectData.id].alpha = 0.5
          this.objectData.actions.forEach((element, index) => {
            const action = PIXI.Sprite.fromImage(buttonAction)
            const textAction = new PIXI.Text(element, { fontFamily: 'Arial', fontSize: 35, align: 'center' })
            textAction.anchor.x = 0.5
            action.buttonMode = true
            action.interactive = true
            action.on('pointerup', () => {
              socket.emit('pointerUp', { inputId: 'clickAction', element, objectId: this.target.objectId, targetObject: this.target.sprite.x / Scaling.factor })
            })
            layoutContainer.addChild(action)
            layoutContainer.addChild(textAction)
          })
        } else {
          console.log('no object')
        }
      })
    }
  }
  updateScaling() {
    if (this.target) {
      layoutContainer.children.forEach((childElement, index) => {
        if (index % 2 === 0) {
          childElement.height = 60 * Scaling.factor
          childElement.width = 300 * Scaling.factor
          childElement.x = (this.target.sprite.x + graphicContainer.x)
          childElement.y = ((this.target.sprite.y + this.target.sprite.height / 1.3) - ((70 * ((index / 2) + 1)) * Scaling.factor))
        } else {
          console.log(childElement)
          childElement.height = childElement._texture.baseTexture.realHeight * Scaling.factor
          childElement.width = childElement._texture.baseTexture.realWidth * Scaling.factor
          childElement.x = (this.target.sprite.x + graphicContainer.x) + (150 * Scaling.factor)
          childElement.y = ((this.target.sprite.y + this.target.sprite.height / 1.3) - (((70 * ((index / 2))) + 20) * Scaling.factor))
        }
      })
    }
  }
}

const PointerObject = new ListDataObject()

// INITIAL
const initialData = () => {
  cover.width = Scaling.windowWidth
  cover.height = Scaling.windowHeight
  cover.tint = 0xffffff
  cover.visible = false
  cover.alpha = 0.8
  console.log(background.Element)
  background.Element.forEach((element) => {
    backgroundContainer.addChild(element)
    element.on('pointerup', () => {
      if (PointerObject.target) {
        PointerObject.target.sprite.alpha = 1
        PointerObject.target = null
      }
      app.stage.removeChild(layoutContainer)
    })
  })

  blurFilter.blur = 20
  app.renderer.view.style.position = 'absolute'
  app.renderer.view.style.display = 'block'
  app.renderer.autoResize = true
  app.renderer.backgroundColor = 0xffffff
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
  graphicContainer.addChild(backgroundContainer)
  graphicContainer.addChild(objectContainer)
  graphicContainer.addChild(landfrontContainer)
  app.stage.addChild(graphicContainer)
  app.stage.addChild(otherPlayerContainer)
  app.stage.addChild(mainPlayerContainer)
  app.stage.addChild(frontContainer)
  app.stage.addChild(cover)
  app.stage.filters = []

  if (Scaling.windowWidth / Scaling.windowHeight > 2) {
    Scaling.marginLeft = (Scaling.windowWidth - (2 * Scaling.windowHeight)) / 2
    Scaling.windowWidth = Scaling.windowHeight * 2
    Scaling.factor = Scaling.windowHeight / 1080
    Scaling.tileSize = (1080 / 10) * (Scaling.windowHeight / 1080)
  } else if (Scaling.windowHeight > Scaling.windowWidth) {
    Scaling.marginTop = (Scaling.windowHeight - Scaling.windowWidth) / 2
    Scaling.windowHeight = Scaling.windowWidth
    Scaling.factor = Scaling.windowWidth / 1080
    Scaling.tileSize = (1080 / 10) * (Scaling.windowWidth / 1080)
  } else {
    Scaling.factor = Scaling.windowHeight / 1080
    Scaling.tileSize = (1080 / 10) * (Scaling.windowHeight / 1080)
  }
}

const getMousePosition = () => app.renderer.plugins.interaction.mouse.global

const updateNewPlayer = (playerList) => {
  Object.keys(playerList)
  .forEach((index) => {
    if (!playerData.allPlayer[index]) {
      playerData.allPlayer[index] = playerList[index]
      playerData.allPlayer[index].player = new Player('hero-walk', { x: 1 * Scaling.tileSize, y: 1 * Scaling.tileSize }, 2)
      playerData.allPlayer[index].sprite = playerData.allPlayer[index].player.animate
      playerData.allPlayer[index].sprite.height = Scaling.tileSize * 1
      playerData.allPlayer[index].sprite.width = Scaling.tileSize * 1
      playerData.allPlayer[index].sprite.y = Scaling.tileSize * (11 - 1)
      playerData.allPlayer[index].sprite.anchor.x = 0.5
      if (index === playerData.thisPlayer.id) {
        playerData.allPlayer[index].sprite.x = (Scaling.windowWidth / 2)
        mainPlayerContainer.addChild(playerData.allPlayer[index].sprite)
      } else {
        playerData.allPlayer[index].sprite.x = playerList[index].x * Scaling.factor
        otherPlayerContainer.addChild(playerData.allPlayer[index].sprite)
      }
    }
  })
}

const updateDeletePlayer = (playerList) => {
  Object.keys(playerData.allPlayer)
  .forEach((index) => {
    if (!playerList[index]) {
      otherPlayerContainer.removeChild(playerData.allPlayer[index].sprite)
      delete playerData.allPlayer[index]
    }
  })
}

const listenEventFromUser = () => {
  let resizing
  const doneResizing = () => {
    cover.visible = false
    app.stage.filters = []
  }
  window.addEventListener('resize', () => {
    clearTimeout(resizing)
    cover.visible = true
    app.stage.filters = [blurFilter]
    resizing = setTimeout(doneResizing, 500)
  })
  document.onkeydown = (event) => {
    if (event.keyCode === 68) socket.emit('keyPress', { inputId: 'right', state: true })
    else if (event.keyCode === 83) socket.emit('keyPress', { inputId: 'down', state: true })
    else if (event.keyCode === 65) socket.emit('keyPress', { inputId: 'left', state: true })
    else if (event.keyCode === 87) socket.emit('keyPress', { inputId: 'up', state: true })
  }

  document.onkeyup = (event) => {
    if (event.keyCode === 68) socket.emit('keyPress', { inputId: 'right', state: false })
    else if (event.keyCode === 83) socket.emit('keyPress', { inputId: 'down', state: false })
    else if (event.keyCode === 65) socket.emit('keyPress', { inputId: 'left', state: false })
    else if (event.keyCode === 87) socket.emit('keyPress', { inputId: 'up', state: false })
  }
}

const socketEvent = () => {
  socket.on('getPlayerData', (data) => {
    if (Object.keys(playerData.thisPlayer).length !== 0) {
      mainPlayerContainer.removeChild(playerData.allPlayer[playerData.thisPlayer.id].sprite)
    }
    playerData.thisPlayer = data.thisPlayer
    // playerData.player = new Player('hero-walk', { x: 1 * TILE, y: BASE * TILE }, 2)
    playerData.player = new Player('hero-walk', { x: 1 * Scaling.tileSize, y: 1 * Scaling.tileSize }, 2)
  })

  socket.on('getPointingObjectData', (data) => {
    // clear old pointing item
    if (allObject[PointerObject.objectData.id]) allObject[PointerObject.objectData.id].alpha = 1
    PointerObject.objectData = data.objectData
    PointerObject.listAction()
  })

  socket.on('updateNewPlayer', (data) => {
    mainPlayerContainer.removeChild(playerData.thisPlayer.sprite)
    console.log(`welcome player ${data.newPlayerId} !`)
    updateDeletePlayer(data.listPlayer)
    updateNewPlayer(data.listPlayer)
  })

  socket.on('updateDeletePlayer', (data) => {
    // playerData.allPlayer = data
    console.log(`delete player ${data.deletedPlayerId} !`)
    updateDeletePlayer(data.listPlayer)
  })

  socket.on('updateGameData', (data) => { // 30 fps
    updateNewPlayer(data.playerListNow)
    Object.keys(data.playerListNow)
    .forEach((index) => {
      playerData.allPlayer[index].sprite.height = Scaling.tileSize * 1
      playerData.allPlayer[index].sprite.width = Scaling.tileSize * 1
      playerData.allPlayer[index].sprite.y = Scaling.tileSize * Scaling.baseObjectFloor
      if (data.playerListNow[index].side === 'left') playerData.allPlayer[index].sprite.scale.x = -5.5 * Scaling.factor
      else playerData.allPlayer[index].sprite.scale.x = 5.5 * Scaling.factor
      if (playerData.allPlayer[index].textureStatus !== data.playerListNow[index].status) {
        playerData.allPlayer[index].sprite.textures = playerData.player.animateSet[data.playerListNow[index].status]
        playerData.allPlayer[index].sprite.gotoAndPlay(0)
        playerData.allPlayer[index].textureStatus = data.playerListNow[index].status
      }
      if (index === playerData.thisPlayer.id) {
        Object.assign(playerData.thisPlayer, data.playerListNow[index])
        playerData.allPlayer[index].sprite.x = ((window.innerWidth) / 2) - Scaling.marginLeft
        if (-(data.playerListNow[index].x * Scaling.factor) + playerData.allPlayer[index].sprite.x > 0) {
          graphicContainer.x = 0
          otherPlayerContainer.x = 0
          playerData.allPlayer[index].sprite.x = data.playerListNow[index].x * Scaling.factor
        } else {
          otherPlayerContainer.x = -(data.playerListNow[index].x * Scaling.factor) + playerData.allPlayer[index].sprite.x
          graphicContainer.x = -(data.playerListNow[index].x * Scaling.factor) + playerData.allPlayer[index].sprite.x
        }
      } else {
        playerData.allPlayer[index].sprite.x = data.playerListNow[index].x * Scaling.factor
      }
      background.parallax(graphicContainer.x, Scaling.factor)
    })
    updateDeletePlayer(data.playerListNow)
    GameElement.updateElement(data.worldData)
  })

  socket.on('updateDataArea', (objectsInArea) => { // 500 ms
    // add and update
    if (objectsInArea) {
      for (let i = 0; i < objectsInArea.length; i += 1) {
        let found = false
        let layer = objectsInArea[i].objectDetail[0].layer - 1
        Object.keys(dataObjLayers[layer])
        .forEach((index) => {
          if ( index === objectsInArea[i]._id) {
            console.log('found, update')
            found = true
            Object.assign(dataObjLayers[layer][index], objectsInArea[i])
          }
        })
      }
    }
  })
}

initialData()
listenEventFromUser()
socketEvent()

const TestDiv = (
  <div style={{ width: '500px', height: '500px', backgroundColor: 'red'}}>ASDASDASDASDASDASDASDAS</div>
)

class Playground extends Component {

  constructor(props) {
    super(props)
    this.state = {
      login: false,
      loading: true,
      timestamp: 'no timestamp yet'
    }
    socket.emit('getplayerData.AllPlayer', `My name is ${Math.random()}`)
  }

  componentDidMount() {
    // document.body.appendChild(app.renderer.view)
    if (this.props.userData) {
      document.getElementById('mainCanvas').appendChild(app.renderer.view)
    }
    socket.on('getDataObject', (data) => {
      const { showObjectData } = this.props
      showObjectData(data)
    })

    const assetsLoaded = () => {
      // for (let i = 0; i < 10; i += 1) {
      //   allObject.push(PIXI.Sprite.fromImage('http://localhost:4000/game/getObject/1/grass1'))
      //   allObject[i].interactive = true
      //   allObject[i].buttonMode = true
      //   const x = allObject[i].x
      //   graphicContainer.addChild(allObject[i])
      //   allObject[i].on('pointerup', (event) => {
      //     socket.emit('pointerUp', { inputId: 'pointObject', objectId: i, objectTargetX: x })
      //   })
      //   allObject[i].on('pointerover', () => {
      //     allObject[i].alpha = 0.5
      //   })
      //   allObject[i].on('pointerout', () => {
      //     if ((PointerObject.target === null || (PointerObject.objectData.id !== i)) allObject[i].alpha = 1
      //   })
      // }
      // // const allLand = []
      // const graphicLand = []
      // const graphicObj_layer_1 = []
      // const graphicObj_layer_2 = []

      // let dataLandTest = null
      console.log('asdassadasdasd')
      if (Object.keys(playerData.thisPlayer).length !== 0) {
        axios({
        method: 'GET',
        url: 'http://localhost:4000/getMapData',
        headers: {
          Authorization: Cookies.get('__token'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
      }).then((data) => {
        console.log('in axio get map data')
        console.log(data)
        let pos = 0
        const objectsInArea = data.data.worldData.dataObjects
        const areaData = data.data.worldData.dataArea[0]
        console.log('get world data first')
        console.log(data.data)
        // dataLandTest = data.data.lands[0]
        objectsInArea.forEach((el) => {
          console.log('check elemnet in map')
          console.log(el)
          dataObjLayers[el.objectDetail[0].layer - 1][el._id] = el
        })
        globalAreaData.data = areaData
        areaData.coverLand.forEach((areaCoverLand, index) => {
          globalAreaData.graphicLand[index] = areaCoverLand
          globalAreaData.graphicLand[index].sprite = PIXI.Sprite.fromImage(`http://localhost:4000/game/getLand/1/${areaCoverLand.name}`)
          globalAreaData.graphicLand[index].sprite.x = areaCoverLand.x
          landfrontContainer.addChild(globalAreaData.graphicLand[index].sprite)
          console.log(globalAreaData.graphicLand[index].sprite)
          globalAreaData.graphicLand[index].y = Scaling.tileSize * (Scaling.baseFloor - 2)
          globalAreaData.graphicLand[index].x = Scaling.tileSize * areaCoverLand.x
          globalAreaData.graphicLand[index].height = Scaling.tileSize * 2
          globalAreaData.graphicLand[index].width = Scaling.tileSize * areaCoverLand.numTile
         })
         console.log()
        // for (let i = 0; i < 48; i += 1) {
      //   allLand.push(PIXI.Sprite.fromImage('http://localhost:4000/game/getObject/1/distland'))
      //   allLand[i].interactive = true
      //   allLand[i].buttonMode = true
      //   graphicContainer.addChild(allLand[i])
      //   allLand[i].on('pointerup', () => {
      //     console.log(allLand[i].x)
      //   })
      // }

          dataObjLayers.reverse()
          dataObjLayers.map((layerData) => {
          Object.keys(layerData)
          .forEach((i) => {
            layerData[i].sprite = PIXI.Sprite.fromImage(`http://localhost:4000/game/getObject/1/${layerData[i].objectDetail[0].id}`)
            layerData[i].sprite.anchor.x = 0.5
            layerData[i].sprite.interactive = true
            layerData[i].sprite.buttonMode = true
            objectContainer.addChild(layerData[i].sprite)
            // layerData[i].sprite.on('pointerup', () => {
            //   console.log(layerData[i].sprite.x)
            // })
            layerData[i].sprite.on('pointerup', (event) => {
              socket.emit('pointerUp', { inputId: 'pointObject', objectId: layerData[i].objectDetail[0].id, objectTargetX: layerData[i].x, objectTarget: i })
            })
            layerData[i].sprite.on('pointerover', () => {
              layerData[i].sprite.alpha = 0.5
            })
            layerData[i].sprite.on('pointerout', () => {
              if ((PointerObject.target === null) || (PointerObject.target._id !== i)) layerData[i].sprite.alpha = 1
            })
            console.log(layerData[i].x)
            layerData[i].sprite.y = (Scaling.tileSize * Scaling.baseObjectFloor) - (Scaling.factorTileSize * layerData[i].sprite._texture.baseTexture.height)
            layerData[i].sprite.x = Scaling.tileSize * (layerData[i].x + (layerData[i].objectDetail[0].tileWidth / 2))
            layerData[i].sprite.height = Scaling.factorTileSize * layerData[i].sprite._texture.baseTexture.height
            layerData[i].sprite.width = Scaling.factorTileSize * layerData[i].sprite._texture.baseTexture.width
          return layerData
          })
        })
        dataObjLayers.reverse()
        console.log(dataObjLayers)
      })
    }
      // for (let i = 0; i < 48; i += 1) {
      //   allLand.push(PIXI.Sprite.fromImage('http://localhost:4000/game/getObject/1/distland'))
      //   allLand[i].interactive = true
      //   allLand[i].buttonMode = true
      //   graphicContainer.addChild(allLand[i])
      //   allLand[i].on('pointerup', () => {
      //     console.log(allLand[i].x)
      //   })
      // }

      // loop
      const mousePosition = getMousePosition()
      app.ticker.add((alpha) => {
        const start = performance.now()
        if (document.getElementById('mainCanvas')) Scaling.scalingApp('mainCanvas')

        // for (let i = 0; i < 10; i += 1) {
        //   allObject[i].y = Scaling.tileSize * 8
        //   allObject[i].x = Scaling.tileSize * i
        //   allObject[i].height = Scaling.tileSize
        //   allObject[i].width = Scaling.tileSize
        // }
        let pos = 0
        if (globalAreaData.graphicLand.length > 0) {
          // for (let i = 0; i < 48; i += 1) {
          //   allLand[i].y = Scaling.tileSize * Scaling.baseObjectFloor
          //   allLand[i].x = Scaling.tileSize * i
          //   allLand[i].height = Scaling.tileSize
          //   allLand[i].width = Scaling.tileSize
          // }
          // for (let i = 0; i < dataLandTest.length; i += 1) {
          //   graphicLand[i].y = Scaling.tileSize * (Scaling.baseFloor - 2)
          //   graphicLand[i].x = Scaling.tileSize * pos
          //   graphicLand[i].height = Scaling.tileSize * 2
          //   graphicLand[i].width = Scaling.tileSize * dataLandTest[i].numTile
          //   pos += dataLandTest[i].numTile
          // }
          for (let i = 0; i < globalAreaData.graphicLand.length; i += 1) {
            globalAreaData.graphicLand[i].sprite.y = Scaling.tileSize * (Scaling.baseFloor - 2)
            globalAreaData.graphicLand[i].sprite.x = Scaling.tileSize * pos
            globalAreaData.graphicLand[i].sprite.height = Scaling.tileSize * 2
            globalAreaData.graphicLand[i].sprite.width = Scaling.tileSize * globalAreaData.graphicLand[i].numTile
            pos += globalAreaData.graphicLand[i].numTile
          }
          pos = 0
          // for (let i = 0; i < dataObjTest_layer_2.length; i += 1) {
          //   graphicObj_layer_2[i].y = (Scaling.tileSize * Scaling.baseObjectFloor) - (Scaling.factorTileSize * graphicObj_layer_2[i]._texture.baseTexture.height)
          //   graphicObj_layer_2[i].x = Scaling.tileSize * (dataObjTest_layer_2[i].x + (dataObjTest_layer_2[i].numTile / 2))
          //   graphicObj_layer_2[i].height = Scaling.factorTileSize * graphicObj_layer_2[i]._texture.baseTexture.height
          //   graphicObj_layer_2[i].width = Scaling.factorTileSize * graphicObj_layer_2[i]._texture.baseTexture.width
          // }
        // }
        }
        app.renderer.resize(Scaling.windowWidth, Scaling.windowHeight);
        if (Object.keys(playerData.thisPlayer).length !== 0) {
          GameElement.updateScaling(Scaling, playerData.thisPlayer)
          dataObjLayers.map((layerData) => {
            Object.keys(layerData)
            .forEach((i) => {
              const newTexture = PIXI.Texture.fromImage(`http://localhost:4000/game/getObject/1/${layerData[i].objectDetail[0].id}`)
              layerData[i].sprite.texture = newTexture
              layerData[i].sprite.y = (Scaling.tileSize * Scaling.baseObjectFloor) - (Scaling.factorTileSize * layerData[i].sprite._texture.baseTexture.height)
              layerData[i].sprite.x = Scaling.tileSize * (layerData[i].x + (layerData[i].objectDetail[0].tileWidth / 2))
              layerData[i].sprite.height = Scaling.factorTileSize * layerData[i].sprite._texture.baseTexture.height
              layerData[i].sprite.width = Scaling.factorTileSize * layerData[i].sprite._texture.baseTexture.width
            })
            return layerData
          })
        } else {
          
        }
        if ((Object.keys(PointerObject.objectData).length !== 0)) PointerObject.updateScaling(Scaling)
        background.width = 90 * 48 * Scaling.factor
        background.height = Scaling.windowHeight
        cover.width = Scaling.windowWidth
        cover.height = Scaling.windowHeight
        const end = performance.now()
      })
    }

    assetsLoaded()
  }

  render() {
    console.log('render zone')
    console.log(this.props.userData)
    return (
      this.props.userData &&
      <div>
        <div id="mainCanvas" />
      </div>
    )
  }
}

export default Playground
