const PORT_SOCKET = 4444
const io = require('socket.io')();

const Player = require('../utils/classes/Player')
const worldData = require('../config/worldDummy.js')
const mongoose = require('mongoose')

const User = require('../models/User')
const Map = require('../models/Map')
const ObjectsInArea = require('../models/ObjectsInArea')
const AreaInMap = require('../models/AreaInMap')
const SubObject = require('../models/SubObject')

allClient = {}
allPlayer = {}
worldTime = {
  timeInSec: 0,
  timeInMin: 0
}

const socketServer = () => {

  io.use((socket, next) => {
    User.findOne({ _token: socket.handshake.query._token }).then((userData) => {
      if (userData) {
        socket.handshake.query.userData = userData
        next()
      } else {
        next(new Error('Authentication error'))
      }
    })
  });


  io.on('connection', (client) => {
    const userData = client.handshake.query.userData
    console.log('new connection')
    console.log(client.handshake.query)
    allClient[userData._id] = client
    allPlayer[userData._id] = new Player({ id: userData._id, detail: userData })
    client.emit('getPlayerData', {
      thisPlayer: allPlayer[userData._id],
      thisWorldData: worldData
    })
    Object.keys(allClient)
    .forEach((index) => {
      console.log(index)
      allClient[index].emit('updateNewPlayer', {
        listPlayer: allPlayer,
        newPlayerId: userData._id
      })
    });
    
    client.on('disconnect', () => {
      console.log('disconnect')
      delete allClient[userData._id]
      delete allPlayer[userData._id]
      Object.keys(allClient)
      .forEach((index) => {
        console.log(index)
        allClient[index].emit('updateDeletePlayer', {
          listPlayer: allPlayer,
          deletedPlayerId: userData._id
        })
      })
    })

    client.on('keyPress', (data) => {
      if (data.inputId === 'left') allPlayer[userData._id].pressingLeft = data.state
      else if (data.inputId === 'right') allPlayer[userData._id].pressingRight = data.state
      else if (data.inputId === 'up') allPlayer[userData._id].pressingUp = data.state
      else if (data.inputId === 'down') allPlayer[userData._id].pressingDown = data.state
    })

    const allActions = {
      inspect: (data) => {
        console.log(data)
        User.findById(mongoose.Types.ObjectId(userData._id)).then((userDocs) => {
          console.log(data.objectId)
          SubObject.findOne({ id: data.objectId }).then((subObjectDocs) => {
            console.log(subObjectDocs)
            const checkRange = false
            client.emit('getDataObject', {
              status: 'inspecting',
              objectData: {
                name: '????'
              },
              timeMillisec: 3500,
              id: data.objectId
            })
            setTimeout(() => {
              client.emit('getDataObject', {
                status: 'complete',
                objectData: subObjectDocs
              })
              userDocs.inspectedObject.push(subObjectDocs.id)
              userDocs.experience.nowExp += 10
              if (userDocs.experience.nowExp > userDocs.experience.maxExp) {
                userDocs.experience.nowExp -= userDocs.experience.maxExp
                userDocs.experience.level += 1
                userDocs.experience.maxExp *= 1.5
              }
              console.log(userDocs)
              userDocs.save().then((docs) => {
                allPlayer[userData._id].detail = docs
              })
            }, 3500)
          })
        })
      },
      walkTo: (data) => {
        console.log(data)
        allPlayer[userData._id].targetPoint = data.targetObject
        allPlayer[userData._id].status = 'auto-walk'
        allPlayer[userData._id].action = 'interact'
      }
    }
    client.on('pointerUp', (data) => {
      const inspectedObject = allPlayer[userData._id].detail.inspectedObject
      // console.log(inspectedObject)
      if (data.inputId === 'pointObject') {
        const objectIdFound = inspectedObject.find((element) => {
          return data.objectId.toString() === element.toString()
        });
        console.log(data.objectId.toString(), inspectedObject)
        if (objectIdFound) {
          SubObject.findOne({ id: objectIdFound }).then((subObjectDocs) => {
            if (subObjectDocs) {
              console.log(data.objectTarget)
              client.emit('getPointingObjectData', {
                objectData: {
                  name: subObjectDocs.name,
                  actions: [
                    'inspect'
                  ],
                  id: data.objectTarget
                }
              })
              client.emit('getDataObject', {
                status: 'ตรวจสอบเรียบร้อยแล้ว',
                objectData: subObjectDocs,
                id: data.objectId
              })
            } 
            console.log('found')
          })
        } else {
          console.log('not found')
          client.emit('getPointingObjectData', {
            objectData: {
              name: '????',
              actions: [
                'inspect'
              ],
              id: data.objectTarget
            }
          })
          client.emit('getDataObject', {
            status: 'ไม่รู้รายละเอียดของสิ่งนี้ ...',
            timeMillisec: 3500,
            objectData: {
              name: '????',
              description: '??????????????',
              id: data.objectId
            },
            id: data.objectId
          })
        }
      } else if (data.inputId === 'clickAction') {
        console.log(data.element)
        allActions[data.element](data)
      }
    })
  })

  setInterval(() => {
    const updatedAllClient = []
    Object.keys(allPlayer)
    .forEach((index) => {
      User.findById(mongoose.Types.ObjectId(index), (err, user) => {
        if (err) return handleError(err);
        if (allPlayer[index]) {
          user = allPlayer[index].detail
          user.save((errUpdated) => {
            if (err) return handleError(err);
            if (allPlayer[index]) allPlayer[index].updatePosition()
          });
        }
      });
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
    })
  }, 1000 / 30) // 30 fps


  setInterval(() => {
    Object.keys(allClient)
    .forEach((index) => {
      User.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(index)} },
        {
          $lookup: {
            from: 'area_in_map',
            localField: 'pos.mapArea',
            foreignField: '_id',
            as: 'areaDetail'
          }
        }
      ]).then((userData) => {
        ObjectsInArea.aggregate([
          // mapId: mongoose.Types.ObjectId(userData[0].areaDetail[0].mapId)
          { $match: { mapId: mongoose.Types.ObjectId(userData[0].areaDetail[0].mapId) } },
          {
            $lookup: {
              from: 'subobjects',
              localField: 'objectId',
              foreignField: 'id',
              as: 'objectDetail'
            }
          }
        ]).then((objectsData) => {
          objectsData.forEach((objectData) => {
            if (objectData.timeNowToNextPhaseMilli) objectData.timeNowToNextPhaseMilli -= 2000
            if (objectData.timeNowToNextPhaseMilli !== null && objectData.timeNowToNextPhaseMilli <= 0) {
              objectData.timeNowToNextPhaseMilli = 0
              SubObject.findOne({ id: objectData.objectId }).then((subObjectData) => {
                if (subObjectData.nextPhase) {
                  objectData.objectId = subObjectData.nextPhase
                  if (subObjectData.slotInput < objectData.itemInSlot.length) {
                    objectData.splice(subObjectData.slotInput)
                  }
                  if (subObjectData.slotOutput < objectData.itemInOutput.length) {
                    objectData.splice(subObjectData.slotOutput)
                  }
                  objectData.timeNowToNextPhaseMilli = subObjectData.timeToNextPhaseMilli
                  ObjectsInArea.findByIdAndUpdate(mongoose.Types.ObjectId(objectData._id), { $set: objectData }).exec()
                }
              })
            } else {
              ObjectsInArea.findByIdAndUpdate(mongoose.Types.ObjectId(objectData._id), { $set: objectData }).exec()
            }
          })
          const result = objectsData.filter(objectData => {
            return objectData.areaId.toString() === userData[0].pos.mapArea.toString()
          });
          allClient[index].emit('updateDataArea', result)
        }).catch((err) => {
          if (err) {
            console.log(err)
            return err
          }
        })
      })
    })
  }, 2000)

  io.listen(PORT_SOCKET)
  console.log('Socket listening on port ', PORT_SOCKET)

}

module.exports = socketServer
