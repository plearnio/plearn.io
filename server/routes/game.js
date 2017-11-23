const path = require('path')
const express = require('express')

const game = express.Router()

game.use(express.static(path.join(__dirname, '../../public')))
game.get('/getPic/:id/:name', (req, res) => {
  if (parseInt(req.params.id, 10) === 1) {
    res.sendFile(path.resolve(`../public/images/${req.params.name}.png`))
  } else res.send('Access denied')
})
game.get('/getAnimate/:id/:name/:frame', (req, res) => {
  if (parseInt(req.params.id, 10) === 1) {
    res.sendFile(path.resolve(`../public/images/${req.params.name}_${req.params.frame}.png`))
  } else res.send('Access denied')
})
game.get('/getItem/:id/:name/', (req, res) => {
  if (parseInt(req.params.id, 10) === 1) {
    res.sendFile(path.resolve(`../public/assets/items/${req.params.name}.png`))
  } else res.send('Access denied')
})
game.get('/getObject/:id/:name/', (req, res) => {
  if (parseInt(req.params.id, 10) === 1) {
    res.sendFile(path.resolve(`./public/assets/objects/${req.params.name}.png`))
  } else res.send('Access denied')
})

module.exports = game
