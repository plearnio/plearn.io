const mongoose = require('mongoose')

const Map = require('../../models/Map')

const getRandomArbitrary = (min, max) => (Math.random() * (max - min)) + min

const getRandomInt = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min

const subBiome = ['water source', 'rock', 'plain', 'grassy']
const createMap = ({ userIdInput, nameInput }) => {
  return new Promise((resolve, reject) => {
    if (!userIdInput || !nameInput) reject('no userId or user\'s name')
    const dmMapData = {
      userId: userIdInput,
      biome: 'player\'s land',
      name: nameInput,
      size: 3, // [0 - 2]
      tilePerArea: 48,
      mainArea: 1, // index
      area: []
    }
    for (let i = 0; i < dmMapData.size; i += 1) {
      const dummyArea = {
        subBiome: ['water source', 'rock', 'plain', 'grassy'],
        objectsInMap: [{
          // yang na tree
          objectId: mongoose.Types.ObjectId('5ace4759a34d603696bb72f4'),
          x: getRandomInt(0, 47),
          y: 11,
          createTime: Date(),
          itemInSlot: [
            {
              name: 'อุปกรณ์เสริม',
              items: []
            }
          ],
          itemInOutput: [
            {
              name: 'ผลผลิต',
              items: []
            }
          ]
        }],
        animalsInMap: [],
        itemsInMap: []
      }
      dmMapData.area.push(dummyArea)
    }
    Map(dmMapData).save().then((mapData) => {
      resolve(mapData)
    })
  })
}

module.exports = createMap
