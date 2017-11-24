//  Lib lodash
const _ = require('lodash')

//  Global: object in map

const objInMapArray = [
  {
    name: 'grass',
    rarity: 1,
    types:
    [
      {
        "id":0,
        "name":"grass1",
        "sciName": "Echinochloa muricata",
        "description":"A low, green plant that grows naturally over a lot of the earth's surface, having groups of very thin leaves that grow close together in large numbers",
        "rarity": 1,
        "width": 32,
        "height":27,
        "pos":1,
        "url":"grass1",
        "extra":0,
        "scale":2,
        "actions":[
          {
          "name":"move",
          "item":[]
          },
          {
            "name":"gather",
            "item":[
              {
                "id":0,
                "name":"grass1",
                "width": 32,
                "height":27,
                "pos":1,
                "url":"grass1",
                "extra":0,
                "scale":2
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'bush',
    rarity: 2,
    types:
    [
      {
        "id":0,
        "name":"bush1",
        "sciName": "Atriplex canescens ",
        "description":"A plant with many small branches growing either directly from the ground or from a hard stem, giving the plant a rounded shape",
        "rarity": 1,
        "width":454,
        "height":567,
        "pos":1,
        "url":"bush1",
        "extra":0,
        "scale":0.14096916299,
        "actions":[
          {
          "name":"move",
          "item":[]
          }
        ]
      }
    ]
  },
  {
    name: 'twig',
    rarity: 3,
    types:
    [
      {
        "id":0,
        "name":"Sacred fig twig",
        "sciName": "Ficus religiosa",
        "description":"A twig of Sacred fig",
        "rarity": 1,
        "width": 1024,
        "height":1528,
        "pos":1,
        "url":"twig1",
        "extra":0,
        "scale":0.0625,
        "actions":[
          {
          "name":"move",
          "item":[]
          },
          {
            "name":"gather",
            "item":[
              {
                "id":0,
                "name":"twig1",
                "width": 197,
                "height":254,
                "pos":1,
                "url":"twig1",
                "extra":0,
                "scale":0.32487309644
              }
            ]
          }
        ]
      },
      {
        "id":0,
        "name":"Apple tree twig",
        "sciName": "Malus pumila",
        "description":"A twig of apple tree",
        "rarity": 3,
        "width": 1024,
        "height":2806,
        "pos":1,
        "url":"twig2",
        "extra":0,
        "scale":0.0625,
        "actions":[
          {
          "name":"move",
          "item":[]
          },
          {
            "name":"gather",
            "item":[
              {
                "id":0,
                "name":"twig2",
                "width": 430,
                "height":396,
                "pos":1,
                "url":"twig2",
                "extra":0,
                "scale":0.14883721
              }
            ]
          }
        ]
      },{
        "id":0,
        "name":"Pine twig",
        "sciName": "Pinus",
        "description":"A twig of pine",
        "rarity": 6,
        "width": 1479,
        "height":2000,
        "pos":1,
        "url":"twig3",
        "extra":0,
        "scale":0.0432724814,
        "actions":[
          {
          "name":"move",
          "item":[]
          },
          {
            "name":"gather",
            "item":[
              {
                "id":0,
                "name":"twig3",
                "width": 636,
                "height":890,
                "pos":1,
                "url":"twig3",
                "extra":0,
                "scale":0.10062893081
              }
            ]
          }
        ]
      }]
  },
  {
    name: 'flower',
    rarity: 4,
    types:
    [
      {
        "id":0,
        "name":"Indian shot",
        "sciName": "Canna indica",
        "description":"Canna indica is a perennial growing to between 0.5 m and 2.5 m, depending on the variety. It is hardy to zone 10 and is frost tender. ",
        "rarity": 1,
        "width": 1024,
        "height":1024,
        "pos":1,
        "url":"flower1",
        "extra":0,
        "scale":0.0625,
        "actions":[
          {
          "name":"move",
          "item":[]
          },
          {
            "name":"gather",
            "item":[
              {
                "id":0,
                "name":"flower1",
                "width": 1024,
                "height":1024,
                "pos":1,
                "url":"flower1",
                "extra":0,
                "scale":0.0625
              }
            ]
          }
        ]
      },
      {
        "id":0,
        "name":"Saint John's wort ",
        "sciName": "Hypericum perforatum",
        "description":"Hypericum perforatum is native to parts of Europe and Asia[6] but has spread to temperate regions worldwide as a cosmopolitan invasive weed.",
        "rarity": 10,
        "width": 1024,
        "height":1024,
        "pos":1,
        "url":"flower2",
        "extra":0,
        "scale":0.0625,
        "actions":[
          {
          "name":"move",
          "item":[]
          },
          {
            "name":"gather",
            "item":[
              {
                "id":0,
                "name":"flower2",
                "width": 1024,
                "height":1024,
                "pos":1,
                "url":"flower2",
                "extra":0,
                "scale":0.0625
              }
            ]
          }
        ]
      },
      {
        "id":0,
        "name":"Prickly rose",
        "sciName": "Rosa acicularis",
        "description":"Rosa acicularis, also known as the prickly wild rose, the prickly rose, the bristly rose, the wild rose and the Arctic rose, is a species of wild rose with a Holarctic distribution in northern regions of Asia,[2] Europe,[3] and North America.",
        "rarity": 25,
        "width": 336,
        "height":455,
        "pos":1,
        "url":"flower3",
        "extra":0,
        "scale":0.19047619047,
        "actions":[
          {
          "name":"move",
          "item":[]
          },
          {
            "name":"gather",
            "item":[
              {
                "id":0,
                "name":"flower3",
                "width": 336,
                "height":455,
                "pos":1,
                "url":"flower3",
                "extra":0,
                "scale":0.19047619047
              }
            ]
          }
        ]
      },
      {
        "id":0,
        "name":"Titan arum",
        "sciName": "Amorphophallus titanum",
        "description":"titan arum, is a flowering plant with the largest unbranched inflorescence in the world. ",
        "rarity": 64,
        "width": 1800,
        "height":1384,
        "pos":1,
        "url":"flower4",
        "extra":0,
        "scale":0.03555555555,
        "actions":[
          {
          "name":"move",
          "item":[]
          },
          {
            "name":"gather",
            "item":[
              {
                "id":0,
                "name":"flower4",
                "width": 1800,
                "height":1384,
                "pos":1,
                "url":"flower4",
                "extra":0,
                "scale":0.03555555555
              }
            ]
          }
        ]
      }]
  },
  {
    name: 'rock',
    rarity: 5,
    types:
    [
      {
        "id":0,
        "name":"rock",
        "sciName": "-",
        "description":"common rock",
        "rarity": 2,
        "width": 256,
        "height":196,
        "pos":1,
        "url":"rock1",
        "extra":0,
        "scale":0.25,
        "actions":[
          {
          "name":"move",
          "item":[]
          },
          {
            "name":"gather",
            "item":[
              {
                "id":0,
                "name":"rock1",
                "width": 256,
                "height":196,
                "pos":1,
                "url":"rock1",
                "extra":0,
                "scale":0.25
              }
            ]
          }
        ]
      },
      {
        "id":0,
        "name":"Igneous",
        "sciName": "-",
        "description":"Igneous rock or magmatic rock, is one of the three main rock types, the others being sedimentary and metamorphic. ",
        "rarity": 8,
        "width": 164,
        "height":164,
        "pos":1,
        "url":"rock2",
        "extra":0,
        "scale":0.39024390243,
        "actions":[
          {
          "name":"move",
          "item":[]
          }
        ]
      }]
  },
  {
    name: 'tree',
    rarity: 6,
    types:
    [
      {
        "id":0,
        "name":"Sacred fig",
        "sciName": "Ficus religiosa",
        "description":"Sacred fig is a species of fig native to the Indian subcontinent,[2] and Indochina.[3] It belongs to the Moraceae, the fig or mulberry family. It is also known as the bodhi tree,[4] pippala tree, peepul tree,[2] peepal tree or ashwattha tree (in India and Nepal).",
        "rarity": 1,
        "width":64,
        "height":120,
        "pos":1,
        "url":"tree1",
        "extra":0,
        "scale":1,
        "actions":[
          {
          "name":"move",
          "item":[]
          }
        ]
      },
      {
        "id":0,
        "name":"Apple Tree",
        "sciName": "Malus pumila",
        "description":"The apple tree (Malus pumila, commonly and erroneously called Malus domestica) is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple. ",
        "rarity": 3,
        "width":454,
        "height":567,
        "pos":1,
        "url":"tree2",
        "extra":0,
        "scale":0.14096916299,
        "actions":[
          {
          "name":"move",
          "item":[]
          }
        ]
      },
      {
        "id":0,
        "name":"Pine",
        "sciName": "Pinus",
        "description":"An evergreen tree (= one that never loses its leaves) that grows in cooler areas of the world:",
        "rarity": 6,
        "width":454,
        "height":567,
        "pos":1,
        "url":"tree3",
        "extra":0,
        "scale":0.14096916299,
        "actions":[
          {
          "name":"move",
          "item":[]
          }
        ]
      }]
  }
]

const genObjFromBinarySearchRarity = (sortedRarityArray, objArray) => {
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
    rarityObj.name = obj.name
    rarityObj.types = createRaritySortedArray(obj.types)
    rarityArray.push(rarityObj)
  })
  return rarityArray
}

const calculateNumTile = (objArray) => {
  const pixelPerTile = 64
  for (let i = 0; i < objArray.length; i += 1) {

    for (let j = 0; j < objArray[i].types.length; j += 1) {
      console.log('j: '+j)
      console.log('objArray[i].types.length: '+objArray[i].types.length)
      console.log(objArray[i].types[j].width * objArray[i].types[j].scale)
      const numbOfTile = Math.ceil((objArray[i].types[j].width * objArray[i].types[j].scale) / pixelPerTile)
      objArray[i].types[j].numTile = numbOfTile
    }
  }
  return objArray
}
const genRandomObj = (numberOfTile) => {
  const ranObjArray = []
  //  Calculate and add property of numtile for every object
  //let objMapArray = objInMapArray
  const objMapArray = calculateNumTile(objInMapArray)
  console.log(objMapArray)
  //  Create Rarity Sorted Array for every object   | output: [6,11,15,18,20,21]
  const raritySortedObjArray = createRaritySortedArray(objMapArray)
  //  Create Rarity Sorted Array for type of object | output: [{name: grass, types: [1,2]}, {}, ...]
  const raritySortedObjTypeArray = createRaritySortedObjTypeArray(objMapArray)

  let ranObjType = ''
  //  Random objects from number of total tiles
  for (let currOfTile = 0; currOfTile <= numberOfTile; currOfTile += ranObjType.numTile) {
    //  Generate Randomed Object
    const ranObj = genObjFromBinarySearchRarity(raritySortedObjArray, objMapArray)
    //  Find obj that match to obj 'name' from rarity sorted object type array
    const ranObjWithRarityArray = _.find(raritySortedObjTypeArray, { 'name': ranObj.name })
    //  Generate Randomed Type Object
    ranObjType = genObjFromBinarySearchRarity(ranObjWithRarityArray.types, ranObj.types)
    //  Add result object into array
    ranObjArray.push(ranObjType)
  }
  return ranObjArray
}

const randomPositionObjOnMap = (randomObjTypeArray, numArea, numTilePerArea, maxTilePerArea) => {
  let currentTile
  let currObj = -1
  const objectMapArray = []

  //  Each Area 1 - 10
  for (let countArea = 0; countArea < numArea; countArea += 1) {
    let objArea = []
    //  Each tile in one area
    for (currentTile = 0; randomObjTypeArray[currObj + 1].numTile + currentTile <= numTilePerArea; currentTile += randomObjTypeArray[currObj].numTile) {
      currObj += 1
      //  add 1 ob
      const dummy = Object.assign({}, randomObjTypeArray[currObj]);
      objArea.push(dummy)
      //  next obj
    }

    //  If there are spaces, add empty object
    if (currentTile <= maxTilePerArea) {
      for (let i = 0; i < maxTilePerArea - currentTile; i += 1) {
        //objArea.push({})
        objArea.push({ name: 'emptyObj', numTile: 1 })
      }
      //  Shuffle empty space in 1 area
      objArea = _.shuffle(objArea)
    }

    let newObjArea = []
    //  Add position x to each object
    let indexTile = 0
    for (let obj = 0; obj < objArea.length; obj += 1) {
      objArea[obj].pos = indexTile
      newObjArea.push(objArea[obj])
      indexTile += objArea[obj].numTile
    }

    // Remove empty emptyObj
    newObjArea = _.pullAllBy(newObjArea, [{ 'name': 'emptyObj'}], 'name');

    //  add obj to array
    objectMapArray.push(newObjArea)
  }
  return objectMapArray
}

const generateObj = () => {
  //  initial number of area and tiles per one are
  const numArea = 1 // 10
  const numTilePerArea = 6 // 24
  const maxTilePerArea = 12
  //  random obj
  const randomObjTypeArray = genRandomObj(numArea * numTilePerArea)
  //  random positio in map
  const objectOnMap = randomPositionObjOnMap(randomObjTypeArray, numArea, numTilePerArea, maxTilePerArea)
  //{"name":"tree3","rarity":6,"numTile":5,"color":"#1E0ECF","pos":0}
  return objectOnMap
}

module.exports = generateObj
