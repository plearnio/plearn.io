const express = require('express')
const path = require('path')

const app = express()
const cors = require('cors')

const PORT = 4000

app.use('*', cors({ origin: '*' }))

app.use(express.static(path.join(__dirname, './public')))
app.get('/getPic/:id/:name', (req, res) => {
  if (parseInt(req.params.id, 10) === 1) {
    res.sendFile(path.resolve(`public/images/${req.params.name}.png`))
  } else res.send('Access denied')
})
app.get('/getAnimate/:id/:name/:frame', (req, res) => {
  if (parseInt(req.params.id, 10) === 1) {
    res.sendFile(path.resolve(`public/images/${req.params.name}_${req.params.frame}.png`))
  } else res.send('Access denied')
})
app.get('/getGame/:id/:name/', (req, res) => {
  if (parseInt(req.params.id, 10) === 1) {
    res.sendFile(path.resolve(`public/assets/${req.params.name}.png`))
  } else res.send('Access denied')
})

app.listen(PORT, () => {
  console.log('Example app listening on port 4000!')
})
