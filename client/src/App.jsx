import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap'
import logo from './logo.svg'
import Main from './components/Main'

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
  height: 640px;
  background-color: #222;
  overflow: auto;
`

const Bag = styled(Grid)`
  padding: 10px;
  border: 1px solid #ddd;
  width: 100%;
  height: 500px;
  overflow: auto;
`

const AppHeader = styled.div`
  padding: 20px;
  color: white;
  text-align: center;
`
const ImgItem = styled.img`
  width:200px;
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'hello react and pixijs',
    }
  }

  render() {
    const { status, activeObject, listItem } = this.props
    const bag = listItem.map(object => <h4>{object.name}</h4>)
    console.log(activeObject)
    return (
      <div className="App">
        <PlayGround>
          <Row className="show-grid">
            <OverflowWithNoPaddingCol xs={12} md={9}>
              <Main />
            </OverflowWithNoPaddingCol>
            <Sidebar xs={12} md={3} >
              <AppHeader>
                <ImgItem src={activeObject.picture || logo} className="App-logo" alt="logo" />
                <h2> You click : {activeObject.name || 'Nothing'}</h2>
                <Bag>
                  <h2> Your bag </h2>
                  {bag}
                </Bag>
              </AppHeader>
            </Sidebar>
          </Row>
        </PlayGround>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.status,
    activeObject: state.activeObject,
    listItem: state.listItem
  }
}
export default connect(mapStateToProps)(App)
