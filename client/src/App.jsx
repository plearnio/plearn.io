import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap'
import logo from './logo.svg'
import Main from './game_methods/Main'

const NoPaddingCol = styled(Col)`
  padding: 0px;
`
const OverflowWithNoPaddingCol = styled(NoPaddingCol)`
  overflow-x : auto;
`

const PlayGround = styled(Grid)`
  margin-top: 50px;
`

const Sidebar = styled(NoPaddingCol)`
  height: 600px;
  background-color: #222;
`

const AppHeader = styled.div`
  padding: 20px;
  color: white;
  text-align: center;
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'hello react and pixijs'
    }
    this.getData = this.getData.bind(this)
  }

  getData(result) {
    this.setState({
      name: result
    })
  }

  render() {
    return (
      <div className="App">
        <PlayGround>
          <Row className="show-grid">
            <OverflowWithNoPaddingCol xs={12} md={9}>
              <Main passData={this.getData} />
            </OverflowWithNoPaddingCol>
            <Sidebar xs={12} md={3} >
              <AppHeader>
                <img src={logo} className="App-logo" alt="logo" />
                <h2> {this.state.name} </h2>
              </AppHeader>
            </Sidebar>
          </Row>
        </PlayGround>
      </div>
    )
  }
}

export default App
