const world = (
  state = {
    status: 'idle',
    time: new Date(),
    activeObject: null,
    action: null,
    placeObject: null
  }, action) => {
  let newState = state
  switch (action.type) {
    case 'WALK' :
      newState = {
        ...state,
        status: 'move'
      }
      break
    case 'IDLE' :
      newState = {
        ...state,
        status: 'idle',
      }
      break
    case 'INTERACT' :
      newState = {
        ...state,
        status: 'interact'
      }
      break
    case 'SET_PLAYER_STATUS' :
      newState = {
        ...state,
        playerStatus: action.payload
      }
      break
    case 'SET_STATUS' :
      newState = {
        ...state,
        status: action.payload
      }
      break
    case 'SET_TIME' :
      newState = {
        ...state,
        time: action.payload
      }
      break
    case 'SET_ACTION' :
      newState = {
        ...state,
        action: action.payload
      }
      break
    case 'SET_OBJECT' :
      newState = {
        ...state,
        activeObject: action.payload
      }
      break
    case 'SET_PLAYER' :
      newState = {
        ...state,
        player: action.payload
      }
      break
    case 'PLACE_OBJECT' :
      newState = {
        ...state,
        placeObject: action.payload
      }
      break
    default: break
  }
  return newState
}

export default world
