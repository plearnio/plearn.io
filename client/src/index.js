import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import registerServiceWorker from './registerServiceWorker'


ReactDOM.render(
    <App />,
  document.getElementById('root'))
registerServiceWorker()
