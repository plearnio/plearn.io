//  Lib lodash
const _ = require('lodash')

//  Global: object in map
const objMapArray = [
  {
    objName: 'grass',
    rarity: 1,
    types:
    [
      { name: 'grass1', rarity: 6, numTile: 1, color: '#09F905' }
    ]
  },
  {
    objName: 'bush',
    rarity: 2,
    types:
    [
      { name: 'bush1', rarity: 6, numTile: 1, color: '#09F905' }
    ]
  },
  {
    objName: 'twig',
    rarity: 3,
    types:
    [
      { name: 'twig1', rarity: 1, numTile: 3, color: '#09F905' },
      { name: 'twig2', rarity: 3, numTile: 1, color: '#1FA20F' },
      { name: 'twig3', rarity: 6, numTile: 1, color: '#1E0ECF' }
    ]
  },
  {
    objName: 'flower',
    rarity: 4,
    types:
    [
      { name: 'flower1', rarity: 1, numTile: 1, color: '#F781F3' },
      { name: 'flower2', rarity: 10, numTile: 1, color: '#F3F781' },
      { name: 'flower3', rarity: 25, numTile: 1, color: '#81F781' },
      { name: 'flower4', rarity: 64, numTile: 1, color: '#2E2EFE' }
    ]
  },
  {
    objName: 'rock',
    rarity: 5,
    types:
    [
      { name: 'rock1', rarity: 2, numTile: 2, color: '#09F905' },
      { name: 'rock2', rarity: 8, numTile: 1, color: '#09F905' }
    ]
  },
  {
    objName: 'tree',
    rarity: 6,
    types:
    [
      { name: 'tree1', rarity: 1, numTile: 3, color: '#09F905' },
      { name: 'tree2', rarity: 3, numTile: 3, color: '#1FA20F' },
      { name: 'tree3', rarity: 6, numTile: 5, color: '#1E0ECF' }
    ]
  }
]

const binarySearchRarity = (sortedRarityArray, objArray) => {
  //  Intial value
  let randomObj = 0
  let tempLength = sortedRarityArray.length / 2
  //  Random 1 number between 1 - maximum of rarity in array
  const numRan = Math.floor(Math.random() * sortedRarityArray[sortedRarityArray.length - 1]) + 1

  //  Random object
  for (let compairedNumIndex = Math.round(tempLength); randomObj === 0;) {
    //  Compair to index-1, index and index+1
    for (let i = compairedNumIndex - 1; i <= compairedNumIndex + 1; i += 1) {
      //  If found return object
      if (sortedRarityArray[i] === numRan) {
        randomObj = objArray[i]
        return randomObj
      }
    }
    // Compair rarity value by Binary search
    tempLength = Math.round(tempLength / 2)
    if (numRan > sortedRarityArray[compairedNumIndex]) {
      if (numRan < sortedRarityArray[compairedNumIndex + 1]) {
        randomObj = objArray[compairedNumIndex + 1]
        return randomObj
      } else {
        compairedNumIndex += tempLength
      }
    } else if (numRan < sortedRarityArray[compairedNumIndex]) {
      if (numRan > sortedRarityArray[compairedNumIndex - 1]) {
        randomObj = objArray[compairedNumIndex]
        return randomObj
      } else if (numRan < sortedRarityArray[0]) {
        randomObj = objArray[0]
        return randomObj
      } else {
        compairedNumIndex -= tempLength
      }
    }
  }
}

const createRaritySortedArray = (objArray) => {
  // Initial value
  const m = -1
  //  Keep rate of rarity from object in map
  const raritySortedArray = []

  //  Get maximum of rarity from obj -> find c
  const maxRarity = _.maxBy(objArray, (obj) => {
    return obj.rarity
  })
  const c = maxRarity.rarity
  //  Define function: Linear equation
  //  Keep y value (from y = mx+c+1) to array
  let countTemp = 0
  for (let i = 0; i < objArray.length; i += 1) {
    countTemp += (m * objArray[i].rarity) + c + 1
    raritySortedArray[i] = countTemp
  }
  return raritySortedArray
}

const createRaritySortedObjTypeArray = (objArray) => {
  const rarityArray = []
  objArray.map((obj) => {
    const rarityObj = {}
    rarityObj.name = obj.objName
    rarityObj.types = createRaritySortedArray(obj.types)
    rarityArray.push(rarityObj)
  })
  return rarityArray
}

const genRandomObj = (numberOfTile) => {
  const ranObjArray = []
  //  Create Rarity Sorted Array for every object   | output: [6,11,15,18,20,21]
  const raritySortedObjArray = createRaritySortedArray(objMapArray)
  //  Create Rarity Sorted Array for type of object | output: [{name: grass, types: [1,2]}, {}, ...]
  const raritySortedObjTypeArray = createRaritySortedObjTypeArray(objMapArray)

  let ranObjType = ''
  //  Random objects from number of total tiles
  for (let currOfTile = 0; currOfTile <= numberOfTile; currOfTile += ranObjType.numTile) {
    //  Generate Randomed Object
    const ranObj = binarySearchRarity(raritySortedObjArray, objMapArray)
    //  Find obj that match to obj 'name' from rarity sorted object type array
    const ranObjWithRarityArray = _.find(raritySortedObjTypeArray, { 'name': ranObj.objName })
    //  Generate Randomed Type Object
    ranObjType = binarySearchRarity(ranObjWithRarityArray.types, ranObj.types)
    //  Add result object into array
    ranObjArray.push(ranObjType)
  }
  return ranObjArray
}

const randomPositionObjOnMap = (randomObjTypeArray, numArea, numTilePerArea) => {
  let currentTile
  let currObj = -1
  const objectMapArray = []

  //  Each Area 1 - 10
  for (let countArea = 0; countArea < numArea; countArea += 1) {
    let objArea = []
    //  Each tile in one area
    for (currentTile = 0; randomObjTypeArray[currObj + 1].numTile + currentTile <= numTilePerArea; currentTile += randomObjTypeArray[currObj].numTile) {
      currObj += 1
      //  add 1 obj
      objArea.push(randomObjTypeArray[currObj])
      //  next obj
    }

    //  If there are spaces, add empty object
    if (currentTile !== numTilePerArea) {
      for (let i = 0; i < numTilePerArea - currentTile; i += 1) {
        objArea.push({})
      }
      //  Shuffle empty space in 1 area
      objArea = _.shuffle(objArea)
    }
    objectMapArray.push(objArea)
  }
  return objectMapArray
}

const generateObj = () => {
  //  initial number of area and tiles per one are
  const numArea = 10 // 10
  const numTilePerArea = 24 // 24
  //  random obj
  const randomObjTypeArray = genRandomObj(numArea * numTilePerArea)
  //  random positio in map
  const objectOnMap = randomPositionObjOnMap(randomObjTypeArray, numArea, numTilePerArea)
  return objectOnMap
}

module.exports = generateObj
