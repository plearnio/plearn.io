import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  Grid,
  Row,
  Col,
  Tabs,
  Tab,
  Modal,
  Button
} from 'react-bootstrap'
import logo from './logo.svg'
import island from './assets/island.png'
import plearnLogo from './assets/logo.png'
import Main from './components/playground/Main'

import Bag from './components/elements/Bag'
import Quest from './components/elements/Quest'
import HandItem from './components/elements/HandItem'
import CraftTable from './components/elements/CraftTable'
import InteractedItem from './components/elements/InteractedObject'
import timeImg from './assets/time.png'

const NoPaddingCol = styled(Col)`
  padding: 0px;
`
const OverflowWithNoPaddingCol = styled(NoPaddingCol)`
  overflow-x : auto;
`

const PlayGround = styled(Grid)`
  padding: 20px;
  background-color: white;
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

const ImgTime = styled.img`
float:left;
margin-right: 20px;
  width: 60px;
  transform: rotate(${props => props.degree});
`

const ImgCenterRespon = styled.img`
  max-width: 85%;
  margin-top: 90px;
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

const StatusBar = styled.div`
border: 1px solid #ddd;
  /* display: none; Hidden by default */
  padding:10px;
  width: 100%; 
  overflow: auto;
  background-color: white;
  color: #282828;
  height: 130px;
  overflow-y: hidden;
`

const ButtonItem = styled.button`
  background-color: #fff;
  border: 1px solid #bbb;
  padding: 10px;
  &:hover {
    background-color:#ddd;
  }
`
// interact item

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: 1,
      show: false,
      date: new Date()
    }
    this.handleSelect = this.handleSelect.bind(this)
    // ({ status, activeObject, listItem }) => 
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  handleSelect(key) {
    this.setState({ key });
  }

  render() {
    let close = () => this.setState({ show: false });
    const { status, activeObject, listItem, setTime } = this.props
    var d = new Date();
    var n = d.getMinutes();
    setTime(parseInt(n/5*2))
    return (
      <div className="App">
        <Grid fluid>
          <center><ImgCenterRespon src={plearnLogo} width="450" /></center>
        </Grid>
        <Grid fluid>
        <center><ImgCenterRespon src={island} width="1280"/></center>
        </Grid>
        <PlayGround>
          <Row className="show-grid">
            <OverflowWithNoPaddingCol xs={12} md={6}>
              <StatusBar>
                <ImgTime  src={timeImg} degree={((n / 5 * 2 * 15) + 215) + 'deg'} alt="fireSpot" />
                <h3>game time : {parseInt(n/5*2)}:00</h3><br/>
                <h4>local time : {this.state.date.toLocaleTimeString()}.</h4>
              </StatusBar>
            </OverflowWithNoPaddingCol>
            <OverflowWithNoPaddingCol xs={12} md={6}>
              <StatusBar>
                <h4>Health: 100</h4>
                <h4>hunger: 100</h4>
                <h4>Energy: 100</h4>
              </StatusBar>
            </OverflowWithNoPaddingCol>
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
                <SubMenu eventKey={3} title="Quest">
                  <AppHeader>
                    <ShowItem>
                      <Quest/>
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

const mapDispatchToProps = (dispatch) => {
  return {
    setTime: (object) => {
      dispatch({ type: 'SET_TIME', payload: object })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
