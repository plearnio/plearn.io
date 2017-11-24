import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  Grid,
  Row,
  Col,
  Tabs,
  Tab
} from 'react-bootstrap'
import logo from './logo.svg'
import Main from './components/playground/Main'

import Bag from './components/elements/Bag'
import HandItem from './components/elements/HandItem'
import CraftTable from './components/elements/CraftTable'
import InteractedItem from './components/elements/InteractedObject'

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
  background-color: white;
  overflow: auto;
  border: 1px solid #ddd;
`

const AppHeader = styled.div`
  color: #282828;
  text-align: center;
`

const ShowItem = styled.div`
  /* display: none; Hidden by default */
  padding:10px;
  width: 100%; 
  overflow: auto;
  background-color: white;
  color: #282828;
`
const Menu = styled(Tabs)`
  background-color: #eee;
`
const SubMenu = styled(Tab)`
  background-color: white;
  /* border: 1px solid #ddd; */
  border: none;
`

const ObjectPanel = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #fff;
  min-height: 300px;
  color: #aaa;
  border: 1px solid #eee;
  text-align: left;
`
// interact item

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: 1
    }
    this.handleSelect = this.handleSelect.bind(this)
    // ({ status, activeObject, listItem }) => 
  }

  handleSelect(key) {
    this.setState({ key });
  }

  render() {
    const { status, activeObject, listItem } = this.props
    console.log(activeObject)
    return (
      <div className="App">
        <PlayGround>
          <Row className="show-grid">
            <OverflowWithNoPaddingCol xs={12} md={9}>
              <Main />
            </OverflowWithNoPaddingCol>
            <Sidebar xs={12} md={3} >
              <Menu animation={false} activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
                <SubMenu eventKey={1} title="Main">
                  <ShowItem>
                    <AppHeader>
                      <h3> Interact Object </h3>
                      <ObjectPanel>
                        {
                          activeObject &&
                          <div>
                            {
                            activeObject.name !== 'background' &&
                            <InteractedItem />
                            // <ShowItem>
                            //   <InteractItemPic>
                            //     <ImgItem src={activeObject.picture} className="App-logo" alt="logo" />
                            //   </InteractItemPic>
                            //   <br />
                            //   <Label> Name : <ObjectContent>{activeObject.name}</ObjectContent></Label>
                            //   <Label> Science name : <ObjectContent>{activeObject.name}</ObjectContent></Label>
                            //   <Label> Description : <ObjectContent>{activeObject.name}</ObjectContent></Label>
                            //   <Actions>
                            //     <Button bsSize="large" block>Large Button</Button>
                            //   </Actions>
                            // </ShowItem>
                            }
                          </div>
                        }
                      </ObjectPanel>
                      <HandItem />
                    </AppHeader>
                  </ShowItem>
                </SubMenu>
                <SubMenu eventKey={2} title="Bag">
                  <AppHeader>
                    <ShowItem>
                      <Bag>
                        <h2> Your bag </h2>
                      </Bag>
                      <CraftTable>
                        <h2> Craft table </h2>
                      </CraftTable>
                    </ShowItem>
                  </AppHeader>
                </SubMenu>
              </Menu>
            </Sidebar>
          </Row>
        </PlayGround>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.world.status,
    activeObject: state.world.activeObject,
    listItem: state.item.listItem
  }
}

export default connect(mapStateToProps)(App)
