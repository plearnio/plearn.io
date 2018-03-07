import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  Grid,
  Row,
  Col,
  Tabs,
  Tab,
} from 'react-bootstrap'

import Main from './components/playground/Main'

const NoPaddingCol = styled(Col)`
  padding: 0px;
`
const OverflowWithNoPaddingCol = styled(NoPaddingCol)`
  overflow-x : auto;
`

const PlayGround = styled(Grid)`
  width: 100%;
  height: 100%;
  padding: 0px;
  background-color: black;
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: 1,
      show: false,
      date: new Date()
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(key) {
    this.setState({ key });
  }

  render() {
    return (
      <PlayGround>
        <Main />
      </PlayGround>
    )
  }
}

export default App
