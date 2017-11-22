const world = (
  state = {
    status: 'idle',
    activeObject: {},
    action: 'idle',
  }, action) => {
  let newState = state
  switch (action.type) {
    case 'WALK' :
      newState = {
        ...state,
        status: 'walk'
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
    default: break
  }
  return newState
}

export default world
