//  Lib lodash
let _ = require('lodash')

//  Global: object in map
const objMap = [
  {
    objName: 'grass',
    rarity: 1,
    types:
    [
      { name: 'grass1', rarity: 6, numTile: 1 }
    ]
  },
  {
    objName: 'bush',
    rarity: 2,
    types:
    [
     { name: 'bush1', rarity: 6, numTile: 1 }
    ]
  },
  {
    objName: 'twig',
    rarity: 3,
    types:
    [
      { name: 'twig1', rarity: 1, numTile: 3 ,},
      { name: 'twig2', rarity: 3, numTile: 1 },
      { name: 'twig3', rarity: 6, numTile: 1 }
    ]
  },
  {
    objName: 'flower',
    rarity: 4,
    types:
    [
      { name: 'flower1', rarity: 1, numTile: 1 },
      { name: 'flower2', rarity: 10, numTile: 1 },
      { name: 'flower3', rarity: 25, numTile: 1 },
      { name: 'flower4', rarity: 64, numTile: 1 }
    ]
  },
  {
    objName: 'rock',
    rarity: 5,
    types:
    [
     { name: 'rock1', rarity: 2, numTile: 2 },
     { name: 'rock2', rarity: 8, numTile: 0.25 }
    ]
  },
  {
    objName: 'tree',
    rarity: 6,
    types:
    [
      { name: 'tree1', rarity: 1, numTile: 3 },
      { name: 'tree2', rarity: 3, numTile: 3 },
      { name: 'tree3', rarity: 6, numTile: 5 }
    ]
  }
]

const genRandomObj = (objMapArray, numberOfObject) => {
  // Initial value
  const m = -1
  const objRanArray = []
  const numRangeRandomObj = []
  //  Get maximum of rarity from obj
  const maxRarity = _.maxBy(objMapArray, (obj) => {
    return obj.rarity
  })
  const c = maxRarity.rarity

  //  Keep y value (from y = mx+c+1) to array
  for (let i = 0; i < objMapArray.length; i += 1) {
    numRangeRandomObj[i] = (m * objMapArray[i].rarity) + c + 1
  }
  console.log('Range: ' + numRangeRandomObj)

  //  Find summation of rarity from obj
  const sumRarity = _.sumBy(numRangeRandomObj)
  //  Random 200 objects3
  for (let i = 0; i < numberOfObject; i += 1) {
    //  Initial current rarity
    let currentRarity = 0
    //  Random 1 number
    const numRan = Math.floor(Math.random() * sumRarity) + 1
    //  Generate Type Object
    for (let j = 0; j < objMapArray.length; j += 1) {
      currentRarity += numRangeRandomObj[j]
      if (currentRarity >= numRan) {
        //  If randomed number more than current rarity -> add obj to array
        objRanArray[i] = objMapArray[j].objName
        break
      }
    }
  }
  return objRanArray
}

const genRandomTypeObj = (randomObjArray, numberOfObject) => {
  console.log(randomObjArray)
  console.log('numberOfObject: '+numberOfObject)

  //  1. Find each type and sum => Format { bust:3 , twig:4 }
  const sortedWithCountObj = _.countBy(randomObjArray)
  //  Convert  { bust:3 , twig:4 } => [bust,3], [twig,4]
  const objArray = _.toPairs(sortedWithCountObj)
  console.log('objArray: '+objArray.length)
  
  //  2. random all / keep prop + count tile together
  const objRanArray = []
  // for in array of sorted / count
  for (let i = 0; i < objArray.length; i += 1) {
    //  for in array of objMap
    for (let j = 0; j < objMap.length; j += 1) {
      // If obj from sorted array match to obj Map
      if (objArray[i][0] === objMap[j].objName) {
        console.log(objArray[i])

        //  find maximum of rarity from obj
        const maxRarity = _.maxBy(objMap[j].types, (obj) => {
          return obj.rarity
        })
        const c = maxRarity.rarity
        const m = -1
        //  Keep y value (from y = mx+c+1) to array
        const numRangeRandomObj = []
        for (let n = 0; n < objMap[j].types.length; n += 1) {
          numRangeRandomObj[n] = (m * objMap[j].types[n].rarity) + c + 1
        }

        //  Find total summation of rarity
        const sumRarity = _.sumBy(numRangeRandomObj)
        // For each obj 
        for (let k = 0; k < objArray[i][1]; k += 1) {
          //  Initial current rarity
          let currentRarity = 0
          //  Random 1 number
          const numRan = Math.floor(Math.random() * sumRarity) + 1
          //  Generate Type Object
          for (let l = 0; l < objMap[j].types.length; l += 1) {
            currentRarity += numRangeRandomObj[l]
            //  If randomed number more than current rarity -> add obj to array
            if (currentRarity >= numRan) {
              objRanArray.push(objMap[j].types[l])
              break
            }
          }
        }
      }
    }
  }
  return objRanArray
}

const generateObj = () => {
  //  initial number of area and tiles per one are
  //  const numArea = 10
  //  const numTilePerArea = 24
  const objMapArray = objMap
  const numberOfObject = 100
  //  random obj
  const randomObjArray = genRandomObj(objMapArray, numberOfObject)
  //  random obj type
  const randomObjTypeArray = genRandomTypeObj(randomObjArray, numberOfObject)
  return randomObjTypeArray
}

module.exports = generateObj
