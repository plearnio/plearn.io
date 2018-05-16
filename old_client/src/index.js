import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import allReducer from './reducers/index'

const store = createStore(allReducer, {
  status: 'idle',
  activeObject: {
    name: 'Nothing'
  }
})

// store.subscribe(() => {
//   console.log(store.getState())
// })

store.dispatch({
  type: 'IDLE'
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
