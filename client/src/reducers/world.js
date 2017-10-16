const worldReducer = (state = { status: 'idle', activeObject: {} }, action) => {
  let newState
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
        status: 'idle'
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

export default worldReducer
