import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap'
import logo from './logo.svg'
import Main from './components/playground/Main'

import Bag from './components/elements/Bag'
import CraftTable from './components/elements/CraftTable'

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

const AppHeader = styled.div`
  padding: 20px;
  color: white;
  text-align: center;
`
const ImgItem = styled.img`
  height: 64px;
  overflow-x: hidden;
`

const App = ({ status, activeObject, listItem }) => {
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
              </Bag>
              <CraftTable>
                <h2> Craft table </h2>
              </CraftTable>
            </AppHeader>
          </Sidebar>
        </Row>
      </PlayGround>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    status: state.world.status,
    activeObject: state.world.activeObject,
    listItem: state.item.listItem
  }
}

export default connect(mapStateToProps)(App)
