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

const configDB = require('./config/database.js')

const PORT = 4000

mongoose.connect(configDB.url)

require('./config/passport')(passport)

const game = require('./routes/game')

app.use('*', cors({ origin: '*' }))

app.use('/authen', cors({ origin: 'http://localhost:4000' }))
app.use('/game', cors({ origin: 'http://localhost:4000' }))

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

app.listen(PORT, () => {
  console.log('Example app listening on port 4000!')
})
