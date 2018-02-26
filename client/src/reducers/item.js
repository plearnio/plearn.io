import Item from '../classes/Item'
import BuildRealObject from '../classes/BuildRealObject'

const item = (
  state = {
    listItem: [],
    craftItem: [],
    objIdNow: 0,
    outputCraftItem: null,
    holdItem: null
  }, action) => {
  const craftItem = () => {
    console.log(state.listItem)
    state.listItem.sort(function(a, b){
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    })
    console.log(state.listItem)
  
    if (state.craftItem.length > 0) {
      const outputItem = new BuildRealObject(
        0,
        'teepee',
        504,
        482,
        0, // posX
        9, // posY
        1,
        'teepee',
        0,
        0.5,
        [
          {
            name: 'sleep',
            item: []
          }
        ],
        '-',
        'cone-shaped tent, traditionally made of animal skins upon wooden poles.'
      )
      const d = new Date();
      const timeMillisec = d.getTime()
      const buildTimeSec = 10; // in second unit
      // const outputItem = new Item(0, 'grass', 0.5, 27, 1, 'grass1', 1.5)
      outputItem.buildTimeSec = buildTimeSec
      outputItem.startTime = timeMillisec
      outputItem.nowTime = timeMillisec
      outputItem.endTime = timeMillisec + (buildTimeSec * 1000)
      outputItem.status = 'crafting'
      return outputItem
    }
    return null
  }

  const setTimeItem = () => {
    if (state.outputCraftItem) {
      const d = new Date();
      const timeMillisec = d.getTime()
      state.outputCraftItem.nowTime = timeMillisec
      return state.outputCraftItem
    }
    return null
  }
  let newState = state
  let outputItem
  switch (action.type) {
    case 'ADD_ITEM' :
      newState = {
        ...state,
        listItem: [...state.listItem, action.payload]
      }
      break
    case 'ADD_CRAFT_ITEM' :
      newState = {
        ...state,
        craftItem: [...state.craftItem, action.payload]
      }
      break
    case 'SET_OBJECT_ID' :
      newState = {
        ...state,
        objIdNow: state.objIdNow += 1
      }
      break
    case 'START_CRAFT_ITEM' :
      outputItem = craftItem(action.payload)
      if (outputItem) {
        newState = {
          ...state,
          outputCraftItem: outputItem
        }
      } else {
        newState = { ...state }
      }
      break
    case 'CRAFTING_ITEM' :
      outputItem = setTimeItem()
      if (outputItem) {
        newState = {
          ...state,
          outputCraftItem: outputItem
        }
      } else {
        newState = { ...state }
      }
      break
    case 'CLEAR_CRAFTED_ITEM' :
      newState = {
        ...state,
        outputCraftItem: null
      }
      break
    case 'ADD_HOLD_ITEM' :
      newState = {
        ...state,
        holdItem: action.payload
      }
      break
    default: break
  }
  return newState
}

export default item
