import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Home from './Home'
import registerServiceWorker from './registerServiceWorker'


ReactDOM.render(
    <Home />,
  document.getElementById('root'))
registerServiceWorker()
