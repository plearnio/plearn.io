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

const configDB = require('./config/database.js').mongo
const random = require('./random')

console.log(random())
const PORT = 4000

// mongoose.connect(configDB.url)
mongoose.connect(`mongodb://${configDB.host}:${configDB.port}/${configDB.database}`, (err) => {
  if (err) console.log(err)
  else console.log('connect success')
})

require('./config/passport')(passport)

const game = require('./routes/game')
const sandbox = require('./routes/sandbox')

app.use('*', cors({ origin: '*' }))

// app.use('/authen', cors({ origin: 'http://localhost:3000' }))
// app.use('/game', cors({ origin: 'http://localhost:3000' }))

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/game', game)
app.use('/sandbox', sandbox)

app.set('view engine', 'ejs')

app.use(session({
  secret: 'plearn.io@123!!321@oi',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.get('/generateWorld/:id/', (req, res) => {
  if (parseInt(req.params.id, 10) === 1) {
    const worldRandom = (random())
    res.json(worldRandom)
  } else res.send('Access denied')
})

app.get('/randomtest', (req, res) => {
  const worldRandom = (random())
  res.json(worldRandom)
})

require('./routes/authen.js')(app, passport)

app.listen(PORT, () => {
  console.log('Example app listening on port ', PORT)
})

// socket
const socketServer = require('./routes/socket')

socketServer()
