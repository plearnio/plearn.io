const express = require('express')
const path = require('path')
const md5 = require('blueimp-md5')
const cookie = require('cookie')
const mongoose = require('mongoose')

const User = require('../models/User')
const Maps = require('../models/Map')
const SubObject = require('../models/SubObject')
const MainObject = require('../models/MainObject')

const createMap = require('../utils/methods/createMap')

const sandbox = express.Router()
const Userlist = []
const TokenUserList = []

sandbox.use((req, res, next) => {
  console.log('middleware')
  next()
})

sandbox.use(express.static(path.join(__dirname, '../../public')))

sandbox.route('/users')
  .get((req, res, next) => {
    const checkToken = TokenUserList.findIndex(element => element === req.headers.authorization)
    if (checkToken === -1) {
      res.send({ error: 'unauthentcation' })
    } else { next() }
  }, (req, res) => {
    res.send(Userlist)
  })
  .post((req, res) => {
    console.log(req.body)
    if (!req.body.username || !req.body.password || !req.body.name) res.send({ error: 'something missing' })
    else {
      User.findOne({ username: req.body.username }).then((user) => {
        if (user) res.send({ error: 'this name already used in system' })
        else {
          const newUser = {
            gameGeneralStatus: {
              health: 100,
              energy: 100,
              hunger: 100,
            },
            experience: {
              level: 1,
              nowExp: 0,
              maxExp: 100,
            }
          }
          newUser.username = req.body.username
          newUser.password = req.body.password
          newUser.name = req.body.name
          User(newUser).save().then((userData) => {
            createMap({ userIdInput: userData._id, nameInput: 'test land 101' }).then((mapData) => {
              console.log(mapData)
              userData.pos = {
                map: mongoose.Types.ObjectId(mapData._id),
                mapIndex: mapData.mainArea,
                x: 24,
                y: 11
              }
              userData.save().then((userUpdated) => {
                res.send({
                  map: mapData,
                  user: userUpdated
                })
              })
            })
          }).catch((err) => {
            res.send(err)
          })
        }
      })
    }
  })

sandbox.route('/users/:id')
  .get((req, res, next) => {
    console.log(req.headers.authorization, TokenUserList)
    const checkToken = TokenUserList.findIndex(element => element === req.headers.authorization)
    if (checkToken === -1) {
      res.send({ error: 'no permission' })
    } else {
      req.tokenIndex = checkToken
      next()
    }
  }, (req, res) => {
    console.log(`user's token is at ${req.tokenIndex}`)
    res.send(Userlist[req.tokenIndex])
  })

sandbox.route('/userByToken')
  .get((req, res) => {
    console.log('user by token')
    console.log(req.headers.authorization, TokenUserList)
    User.findOne({ _token: req.headers.authorization }).then((userByToken) => {
      if (userByToken) {
        res.send(userByToken)
      } else {
        res.send({ error: 'no permission' })
      }
    }).catch((err) => {
      res.send({ error: 'something wrong' })
    })
    // const checkToken = TokenUserList.findIndex(element => element === req.headers.authorization)
    // if (checkToken === -1) {
    //   res.send({ error: 'no permission' })
    // } else {
    //   req.tokenIndex = checkToken
    //   next()
    // }
  })

sandbox.route('/logout')
  .get((req, res, next) => {
    console.log(req.headers.authorization, TokenUserList)
    User.findOne({ _token: req.headers.authorization }).then((userByToken) => {
      if (userByToken) {
        userByToken._token = null
        userByToken.save().then((userSaved) => {
          next()
        })
      } else {
        res.send({ error: 'no permission' })
      }
    }).catch((err) => {
      res.send({ error: 'something wrong' })
    })
  }, (req, res) => {
    res.send({ status: 'complete' })
  })

sandbox.route('/login')
  .post((req, res) => {
    User.findOne({ username: req.body.username, password: req.body.password }, (err, userLogIn) => {
      if (err) res.send('error')
      if (!userLogIn) res.send('wrong user or password')
      else {
        let indexToken
        let timeOut = 0
        const timeNow = Date.now()
        const tokenKey = userLogIn.username + userLogIn.password + timeNow
        let shuffledTokenKey = md5(tokenKey.split('').sort(() => 0.5 - Math.random()).join(''))
        console.log(shuffledTokenKey)
        const checkDupToken = () => {
          return User.findOne({ _token: shuffledTokenKey }).then((token) => {
            if (!token) {
              userLogIn._token = shuffledTokenKey
              return userLogIn.save().then((userSaved) => {
                return userSaved
              })
            } else {
              console.log('duplicate')
              shuffledTokenKey = md5(tokenKey.split('').sort(() => { return 0.5-Math.random()}).join(''))
              return checkDupToken()
            }
          })
        }
        checkDupToken().then((result) => {
          console.log(result)
          res.send({
            user: result
          })
        })
      }
    })
  })

sandbox.route('/userdata/:user')
  .get((req, res) => {
    User.findOne({ _id: mongoose.Types.ObjectId(req.params.user) }).then((userData) => {
      if (!userData) res.send({ error: 'not found' })
      else {
        Maps.findOne({ userId: userData._id }).then((mapData) => {
          if (!mapData) res.send({ error: 'not found' })
          else {
            mapData.userId = userData
            res.send(mapData)
          }
        }).catch((err) => {
          res.send(err)
        })
      }
    })
  })

sandbox.route('/getPic/:name')
  .get((req, res) => {
    res.sendFile(path.resolve(`./public/objects/${req.params.name}.jpg`))
})

sandbox.route('/createMap/:user')
  .post((req, res) => {
    let maxNumOfMap = 5
    const allObjects = []
    const newObjectinMap = []
    const resultMap = []
    const array = []
    const shuffle = (a) => {
      let j
      let x
      let i
      for (i = a.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
    }
    SubObject.find({}, (err, subObjects) => {
      subObjects.forEach((subObject, index) => {
        console.log(subObject.rarity)
        for( let i = 0; i < subObject.rarity; i += 1) {
          allObjects.push(subObject)
        }
      })
      newObjectinMap.push(subObjects[0])
      newObjectinMap[0].default = 'yangNa'
      let sizeObject = 0
      console.log(sizeObject + 'asdasdasdasdasdsaad')
      for( let i = 0; i < maxNumOfMap; i += 1) {
        const indexObj = Math.floor(Math.random() * ((allObjects.length - 1)))
        newObjectinMap.push(allObjects[indexObj])
        sizeObject += allObjects[indexObj].width // width
        console.log(allObjects[indexObj]+`qweqiweu`)
      }
      for( let i = sizeObject; i < 48; i += 1) {
        newObjectinMap.push('empty')
        console.log(newObjectinMap)
      } // tile
      // shuffle
      console.log(newObjectinMap)
      shuffle(newObjectinMap)
      for(let i=0; i<newObjectinMap.length; i+=1)
      {
        if(newObjectinMap[i] !== 'empty') {
                  const dummySlotItem = []
                  const dummySlotOutput = []
                  newObjectinMap[i].slotItem.forEach((sl) => {
                    dummySlotItem.push({
                      name: sl.name,
                      items: []
                    })
                  })
                  newObjectinMap[i].outputSlot.forEach((sl) => {
                    dummySlotOutput.push({
                      name: sl.name,
                      items: []
                    })
                  })
                  if (newObjectinMap[i].default === 'yangNa') {
                    resultMap.push({
                      objectId: newObjectinMap[i]._id,
                      x: i,
                      y: 0,
                      itemInSlot: [{
                        name: 'อุปกรณ์เสริม',
                        items: []
                      }],
                      itemInOuput: [{
                        name: 'ผลผลิต',
                        items: [{}]
                      }]
                    })
                  } else {
                    resultMap.push({
                      objectId: newObjectinMap[i]._id,
                      x: i,
                      y: 0,
                      itemInSlot: dummySlotItem,
                      itemInOuput: dummySlotOutput
                    })
                  }
                }
      }
      const mapData = {
        biome: 'Tropical Forest',
        userId: req.params.user,
        width: 2,
        height:0,
        tilePerArea: 48,
        mainArea: 0,
        area: [{
          subBiome: 'Plain Land',
          objectsInMap: resultMap,
          animalsInMap: [],
          itemsInMap: []
        }]
      }
      const createNewMap = Maps(mapData)
      createNewMap.save((err,docs) => {
        if (err) res.send('error')
        else res.send(docs)
      })
    })
    
  })

sandbox.route('/map')
    .get((req, res) => {
      Maps.find({}, (err, docs) => {
        res.send(docs)
      })
    })
    .post((req, res) => {
      const newMap = Maps(req.body)
      newMap.save((err, docs) => {
        if (err) res.send('insert error')
        else res.send(docs)
      })
    })

sandbox.route('/subob')
  .get((req, res) => {
    SubObject.find({}, (err, docs) => {
      res.send(docs)
    })
  })
  .post((req, res) => {
    const newSubObject = SubObject(req.body)
    newSubObject.save((err, docs) => {
      if (err) res.send('insert error')
      else res.send(docs)
    })
  })

sandbox.route('/mainob')
  .get((req, res) => {
    MainObject.find({}, (err, docs) => {
      res.send(docs)
    })
  })
  .post((req, res) => {
    const newMainObject = MainObject(req.body)
    newMainObject.save((err, docs) => {
      if (err) res.send('insert error')
      else res.send(docs)
    })
  })

module.exports = sandbox
