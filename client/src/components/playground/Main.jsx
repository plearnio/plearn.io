import React, { Component } from 'react'
import openSocket from 'socket.io-client'

// assets
import imageStatusBar from '../../assets/status-bar-2.png'
import buttonAction from '../../assets/button-interact.png'

const PIXI = require('pixi.js')
const display = require('pixi-layers')

const socket = openSocket('http://localhost:4444')

PIXI.utils.sayHello('start pixi')

// GLOBAL VARS
const app = new PIXI.Application(window.innerWidth, window.innerHeight)
app.renderer.view.style.position = 'absolute'
app.renderer.view.style.display = 'block'
app.renderer.autoResize = true
app.renderer.backgroundColor = 0xffffff
const cover = new PIXI.Sprite(PIXI.Texture.WHITE);
const background = new PIXI.Sprite(PIXI.Texture.WHITE);
const blurFilter = new PIXI.filters.BlurFilter()
const graphicContainer = new PIXI.Container()
const backgroundContainer = new PIXI.Container()
const otherPlayerContainer = new PIXI.Container()
const mainPlayerContainer = new PIXI.Container()
const frontContainer = new PIXI.Container()

const playerData = {
  thisPlayer: {},
  allPlayer: {}
}

const allObject = []

let layoutContainer

class ScalingWindow {
  constructor() {
    this.tileSize = 90
    this.factor = 1
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight
    this.marginLeft = 0
    this.marginTop = 0
  }
  scalingApp(element) {
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight

    if (this.windowWidth / this.windowHeight > 2) {
      this.marginLeft = (this.windowWidth - (2 * this.windowHeight)) / 2
      document.getElementById(element).style.marginLeft = `${this.marginLeft}px`
      document.getElementById(element).style.marginTop = '0px'
      this.windowWidth = this.windowHeight * 2
      this.factor = this.windowHeight / 1080
      this.tileSize = (1080 / 12) * (this.windowHeight / 1080)
    } else if (this.windowHeight > this.windowWidth) {
      this.marginTop = (this.windowHeight - this.windowWidth) / 2
      document.getElementById(element).style.marginTop = `${this.marginTop}px`
      document.getElementById(element).style.marginLeft = '0px'
      this.windowHeight = this.windowWidth
      this.factor = this.windowWidth / 1080
      this.tileSize = (1080 / 12) * (this.windowWidth / 1080)
    } else {
      this.marginLeft = 0
      this.marginTop = 0
      this.factor = this.windowHeight / 1080
      this.tileSize = (1080 / 12) * (this.windowHeight / 1080)
      document.getElementById(element).style.marginTop = '0px'
      document.getElementById(element).style.marginLeft = '0px'
    }
  }
}

const setScaling = ({ element, x, y, factor, scale }) => {
  element.x = x * factor
  element.y = y * factor
  element.scale.set(scale.x * factor, scale.y * factor)
}

class GameElementData {
  constructor() {
    this.statusBar = PIXI.Sprite.fromImage(imageStatusBar)
    this.timeText = new PIXI.Text('00:00')
    this.initialData()
  }
  initialData() {
    this.timeText.x = 30
    this.timeText.y = 200
    frontContainer.addChild(this.timeText)
    frontContainer.addChild(this.statusBar)
  }
  updateScaling(scaling) {
    setScaling({
      element: this.timeText, x: 30, y: 200, scale: { x: 1, y: 1 }, factor: scaling.factor
    })
    setScaling({
      element: this.statusBar, x: 0, y: 0, scale: { x: 1.5, y: 1.5 }, factor: scaling.factor
    })
  }
  updateElement(worldData) {
    const gameMin = (`0${worldData.worldTime.min}`).slice(-2)
    this.timeText.text = `time ${worldData.worldTime.hour}:${gameMin}`
  }

}

const Scaling = new ScalingWindow()
const GameElement = new GameElementData()

class ListDataObject {
  constructor() {
    this.objectData = {}
  }
  listAction() {
    console.log(this.objectData)
    app.stage.removeChild(layoutContainer)
    layoutContainer = new PIXI.Container()
    if (!(Object.keys(this.objectData).length === 0)) {
      app.stage.addChild(layoutContainer)
      allObject[this.objectData.id].alpha = 0.5
      this.objectData.actions.forEach((element, index) => {
        const action = PIXI.Sprite.fromImage(buttonAction)
        layoutContainer.addChild(action)
      })
    } else {
      console.log('no object')
    }
  }
  updateScaling() {
    layoutContainer.children.forEach((childElement, index) => {
      childElement.height = 60 * Scaling.factor
      childElement.width = 300 * Scaling.factor
      childElement.x = (allObject[this.objectData.id].x + graphicContainer.x)
      childElement.y = (allObject[this.objectData.id].y - ((70 * (index + 1)) * Scaling.factor))
    })
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

  background.width = Scaling.windowWidth
  background.height = Scaling.windowHeight
  background.tint = 0xeffadf
  background.interactive = true

  blurFilter.blur = 20
  app.renderer.view.style.position = 'absolute'
  app.renderer.view.style.display = 'block'
  app.renderer.autoResize = true
  app.renderer.backgroundColor = 0xffffff
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
  background.on('pointerup', () => {
    if (Object.keys(PointerObject.objectData).length !== 0) allObject[PointerObject.objectData.id].alpha = 1
    PointerObject.objectData = {}
    app.stage.removeChild(layoutContainer)
  })
  backgroundContainer.addChild(background)
  graphicContainer.addChild(backgroundContainer)
  graphicContainer.addChild(otherPlayerContainer)
  app.stage.addChild(graphicContainer)
  app.stage.addChild(mainPlayerContainer)
  app.stage.addChild(frontContainer)
  app.stage.addChild(cover)
  app.stage.filters = []

  if (Scaling.windowWidth / Scaling.windowHeight > 2) {
    Scaling.marginLeft = (Scaling.windowWidth - (2 * Scaling.windowHeight)) / 2
    Scaling.windowWidth = Scaling.windowHeight * 2
    Scaling.factor = Scaling.windowHeight / 1080
    Scaling.tileSize = (1080 / 12) * (Scaling.windowHeight / 1080)
  } else if (Scaling.windowHeight > Scaling.windowWidth) {
    Scaling.marginTop = (Scaling.windowHeight - Scaling.windowWidth) / 2
    Scaling.windowHeight = Scaling.windowWidth
    Scaling.factor = Scaling.windowWidth / 1080
    Scaling.tileSize = (1080 / 12) * (Scaling.windowWidth / 1080)
  } else {
    Scaling.factor = Scaling.windowHeight / 1080
    Scaling.tileSize = (1080 / 12) * (Scaling.windowHeight / 1080)
  }
}

const getMousePosition = () => app.renderer.plugins.interaction.mouse.global
const updateNewPlayer = (playerList) => {
  Object.keys(playerList)
  .forEach((index) => {
    if (!playerData.allPlayer[index]) {
      playerData.allPlayer[index] = playerList[index]
      playerData.allPlayer[index].sprite = PIXI.Sprite.fromImage('http://localhost:4000/game/getObject/1/tree1')
      playerData.allPlayer[index].sprite.height = Scaling.tileSize * 1
      playerData.allPlayer[index].sprite.width = Scaling.tileSize * 1
      playerData.allPlayer[index].sprite.y = Scaling.tileSize * (11 - 1)
      playerData.allPlayer[index].sprite.anchor.x = 0.5
      if (parseInt(index, 10) === playerData.thisPlayer.id) {
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
  window.onresize = () => {
    clearTimeout(resizing)
    cover.visible = true
    app.stage.filters = [blurFilter]
    resizing = setTimeout(doneResizing, 500)
  }
  document.onkeydown = (event) => {
    if (event.keyCode === 68) {
      socket.emit('keyPress', { 
        inputId: 'right', state: true
      })
    }
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
  })

  socket.on('getPointingObjectData', (data) => {
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

  socket.on('updateGameData', (data) => {
    updateNewPlayer(data.playerListNow)
    Object.keys(data.playerListNow)
    .forEach((index) => {
      playerData.allPlayer[index].sprite.height = Scaling.tileSize * 2
      playerData.allPlayer[index].sprite.width = Scaling.tileSize * 1
      playerData.allPlayer[index].sprite.y = Scaling.tileSize * (11 - 2)
      if (parseInt(index, 10) === playerData.thisPlayer.id) {
        playerData.thisPlayer = data.playerListNow[index]
        playerData.allPlayer[index].sprite.x = ((window.innerWidth) / 2) - Scaling.marginLeft
        graphicContainer.x =
        -(data.playerListNow[index].x * Scaling.factor)
        + playerData.allPlayer[index].sprite.x
      } else playerData.allPlayer[index].sprite.x = data.playerListNow[index].x * Scaling.factor
    })
    updateDeletePlayer(data.playerListNow)
    GameElement.updateElement(data.worldData)
  })
}

initialData()
listenEventFromUser()
socketEvent()

class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      timestamp: 'no timestamp yet'
    }
    socket.emit('getplayerData.AllPlayer', `My name is ${Math.random()}`)
  }

  componentDidMount() {
    // document.body.appendChild(app.renderer.view)
    document.getElementById('mainCanvas').appendChild(app.renderer.view)

    const assetsLoaded = () => {
      for (let i = 0; i < 12; i += 1) {
        allObject.push(PIXI.Sprite.fromImage('http://localhost:4000/game/getObject/1/grass1'))
        allObject[i].interactive = true
        allObject[i].buttonMode = true
        graphicContainer.addChild(allObject[i])
        allObject[i].on('pointerup', (event) => {
          socket.emit('pointerUp', { inputId: 'pointObject', objectId: i })
        })
        allObject[i].on('pointerover', () => {
          allObject[i].alpha = 0.5
        })
        allObject[i].on('pointerout', () => {
          if ((Object.keys(PointerObject.objectData).length === 0) || (PointerObject.objectData.id !== i)) allObject[i].alpha = 1
        })
      }
      const allLand = []
      for (let i = 0; i < 48; i += 1) {
        allLand.push(PIXI.Sprite.fromImage('http://localhost:4000/game/getObject/1/distland'))
        allLand[i].interactive = true
        allLand[i].buttonMode = true
        graphicContainer.addChild(allLand[i])
        allLand[i].on('pointerup', () => {
          console.log(allLand[i].x)
        })
      }

      // loop
      const mousePosition = getMousePosition()
      app.ticker.add((alpha) => {
        const start = performance.now()
        Scaling.scalingApp('mainCanvas')

        for (let i = 0; i < 12; i += 1) {
          allObject[i].y = Scaling.tileSize * i
          allObject[i].height = Scaling.tileSize
          allObject[i].width = Scaling.tileSize
        }
        for (let i = 0; i < 48; i += 1) {
          allLand[i].y = Scaling.tileSize * 11
          allLand[i].x = Scaling.tileSize * i
          allLand[i].height = Scaling.tileSize
          allLand[i].width = Scaling.tileSize
        }

        app.renderer.resize(Scaling.windowWidth, Scaling.windowHeight);
        GameElement.updateScaling(Scaling)
        if ((Object.keys(PointerObject.objectData).length !== 0)) PointerObject.updateScaling(Scaling)
        background.width = Scaling.windowWidth
        background.height = Scaling.windowHeight
        cover.width = Scaling.windowWidth
        cover.height = Scaling.windowHeight
        const end = performance.now()
        // console.log(`time calculate = ${end - start}` millisecond)
      })
    }

    assetsLoaded()
  }

  render() {
    return (
      <div>
        <div id="mainCanvas" />
      </div>
    )
  }
}

export default Main
