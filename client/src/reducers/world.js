const worldReducer = (state = { status: 'idle', activeObject: {}, listItem: [], action: 'idle' }, action) => {
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
    case 'ADD_ITEM' :
      newState = {
        ...state,
        listItem: [...state.listItem, action.payload]
      }
      break
    default: break
  }
  return newState
}

export default worldReducer
