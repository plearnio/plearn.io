const PORT_SOCKET = 4444
const io = require('socket.io')();

const Player = require('../utils/classes/Player')
const worldData = require('../config/worldDummy.js')

allClient = {}
allPlayer = {}
worldTime = {
  timeInSec: 0,
  timeInMin: 0
}

const socketServer = () => {

  // io.use((socket, next) => {
  //   const { __token } = socket.handshake.query;
  //   console.log(__token)
  // });


  io.on('connection', (client) => {
    console.log('new connection')
    const clientId = Math.floor(Math.random() * (100))
    allClient[clientId] = client
    allPlayer[clientId] = new Player({ id: clientId })
    client.emit('getPlayerData', {
      thisPlayer: allPlayer[clientId],
      thisWorldData: worldData
    })
    Object.keys(allClient)
    .forEach((index) => {
      console.log(index)
      allClient[index].emit('updateNewPlayer', {
        listPlayer: allPlayer,
        newPlayerId: clientId
      })
    });

    client.on('disconnect', () => {
      console.log('disconnect')
      delete allClient[clientId]
      delete allPlayer[clientId]
      Object.keys(allClient)
      .forEach((index) => {
        console.log(index)
        allClient[index].emit('updateDeletePlayer', {
          listPlayer: allPlayer,
          deletedPlayerId: clientId
        })
      });
    })

    client.on('keyPress', (data) => {
      if (data.inputId === 'left') allPlayer[clientId].pressingLeft = data.state;
      else if (data.inputId === 'right') allPlayer[clientId].pressingRight = data.state;
      else if (data.inputId === 'up') allPlayer[clientId].pressingUp = data.state;
      else if (data.inputId === 'down') allPlayer[clientId].pressingDown = data.state;
    });

    const allActions = {
      inspect: (data) => {
        const checkRange = false
        client.emit('getDataObject', {
          status: 'inspecting',
          timeMillisec: 3500,
          objectData: {
            name: '????',
            description: '??????????????',
            id: data.objectId
          },
          id: data.objectId
        })
        setTimeout(() => {
          client.emit('getDataObject', {
            status: 'complete',
            objectData: {
              name: 'grass',
              description: 'grass grass grass test',
              id: data.objectId
            }
          })
        }, 3500)
      },
      walkTo: (data) => {
        console.log(data)
        allPlayer[clientId].targetPoint = data.targetObject
        allPlayer[clientId].status = 'auto-walk'
        allPlayer[clientId].action = 'interact'
      }
    }
    client.on('pointerUp', (data) => {
      if (data.inputId === 'pointObject') {
        client.emit('getPointingObjectData', {
          objectData: {
            name: '????',
            actions: [
              'walkTo',
              'inspect'
            ],
            id: data.objectId
          }
        })
      } else if (data.inputId === 'clickAction') {
        console.log(data.element)
        allActions[data.element](data)
      }
    });
  });

  setInterval(() => {
    const updatedAllClient = []
    Object.keys(allPlayer)
    .forEach((index) => {
      allPlayer[index].updatePosition()
    });
    const gameTime = {}
    worldTime.timeInSec += 1 / 30
    gameTime.hour = worldTime.timeInMin
    gameTime.min = Math.floor(worldTime.timeInSec / 2)
    if (Math.floor(worldTime.timeInSec) === 120) {
      worldTime.timeInSec = 0
      worldTime.timeInMin += 1
      if (Math.floor(worldTime.timeInMin) === 24) worldTime.timeInMin = 0
    }
    Object.keys(allClient)
    .forEach((index) => {
      allClient[index].emit('updateGameData', {
        playerListNow: allPlayer,
        worldData: {
          worldTime: gameTime
        }
      })
    });
  }, 1000 / 30) // 30 fps

  io.listen(PORT_SOCKET)
  console.log('Socket listening on port ', PORT_SOCKET)

}

module.exports = socketServer
