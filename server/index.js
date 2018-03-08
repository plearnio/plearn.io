const express = require('express')

const app = express()
const cors = require('cors')

const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')

const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

const io = require('socket.io')();

const configDB = require('./config/database.js')
const random = require('./random')

const PORT = 4000
const PORT_SOCKET = 4444

mongoose.connect(configDB.url)

require('./config/passport')(passport)

const game = require('./routes/game')

app.use('*', cors({ origin: '*' }))

app.use('/authen', cors({ origin: 'http://localhost:3000' }))
app.use('/game', cors({ origin: 'http://localhost:3000' }))

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/game', game)

app.set('view engine', 'ejs')

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./routes/authen.js')(app, passport)

app.get('/generateWorld/:id/', (req, res) => {
  if (parseInt(req.params.id, 10) === 1) {
    const numRandom = (random())
    res.json(numRandom)
  } else res.send('Access denied')
})

app.listen(PORT, () => {
  console.log('Example app listening on port ', PORT)
})

// socket

class Player {
  constructor({ id }) {
    this.id = id
    this.x = Math.floor(Math.random() * (300))
    this.pressingRight = false
    this.pressingLeft = false
    this.pressingUp = false
    this.pressingDown = false
    this.maxSpeed = 10
    this.speedX = 0
  }

  updatePosition() {
    if (this.pressingRight) this.speedX = this.maxSpeed
    else if (this.pressingLeft) this.speedX = -this.maxSpeed
    else this.speedX = 0
    if ((this.x + this.speedX) < 0) this.x += 0
    else this.x += this.speedX
  }

}
allClient = {}
allPlayer = {}
worldTime = {
  timeInSec: 0,
  timeInMin: 0
}
io.on('connection', (client) => {
  console.log('new connection')
  const clientId = Math.floor(Math.random() * (100))
  allClient[clientId] = client
  allPlayer[clientId] = new Player({ id: clientId })
  client.emit('getPlayerData',{
    thisPlayer: allPlayer[clientId]
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
