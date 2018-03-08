import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import {
  Grid,
  Row,
  Col,
  Tabs,
  Tab,
} from 'react-bootstrap'

import Main from './components/playground/Main'

//classes
import ScalingWindow from './classes/ScalingWindow'

const Scaling = new ScalingWindow()
Scaling.scalingApp('main')
console.log(Scaling.factor)

const MenuButton = styled.button`
  position: absolute;
  left: 0px;
  outline: none;
`

const HideMenuButton = styled(MenuButton)`
  top: 0px;
  border-top-left-radius: 2vw;
  border-bottom-left-radius: 2vw;
  width: 5vw;
  min-width: 40px;
  height: 5vh;
  padding: 1vh;
  text-align: center;
  font-size: 1vh;
`

const MainMenuButton = styled(MenuButton)`
  top: 5vh;
  border-top-left-radius: 2vw;
  border-bottom-left-radius: 2vw;
  width: 5vw;
  min-width: 40px;
  height: 10vh;
  padding: 1vh;
  text-align: center;
  font-size: 2vh;
  ${props => props.menuSelected && css`
    border-right-style: none;
  `};
`

const BagMenuButton = styled(MenuButton)`
  top: 15vh;
  border-top-left-radius: 2vw;
  border-bottom-left-radius: 2vw;
  width: 5vw;
  min-width: 40px;
  height: 10vh;
  padding: 1vh;
  text-align: center;
  font-size: 2vh;
  ${props => props.menuSelected && css`
    border-right-style: none;
  `};
`
const MenuPanel = styled.div`
  border-top-left-radius: 2vw;
  border-bottom-left-radius: 2vw;
  right: 0;
  font-size: 1.2em;
  max-width: 90%;
  /* background-color: white; */
  position:fixed;
  height: 100%;
  width: 5vw;
  padding-left: ${props => props.wdWidth ? '5vw' : '40px'} ;
  min-width: 40px;
  overflow: hidden;
  z-index: 20;
  -webkit-transition: ease-in 0.5s; /* For Safari 3.1 to 6.0 */
  transition: height width ease-in .5s;
  
  ${props => props.show && css`
    width: 500px;
  `};

  ${props => props.hideAll && css`
    width: 5vw;
    height: 5vh;
  `};
`

const MenuData = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
`

const NoPaddingCol = styled(Col)`
  padding: 0px;
`

const PlayGround = styled(Grid)`
  width: 100%;
  height: 100%;
  padding: 0px;
  background-color: black;
  overflow: hidden;
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: 1,
      showMenu: false,
      hideAll: false,
      menuSelect: [false, false],
      windowWidthLong: window.innerWidth > 700,
      date: new Date(),
      focusObject: {
        data: {},
        status: 'no object'
      }
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleMenu = this.handleMenu.bind(this)
    this.selectMenu = this.selectMenu.bind(this)
    this.resizeMenu = this.resizeMenu.bind(this)
    this.setMainMenu = this.setMainMenu.bind(this)
  }

  handleSelect(key) {
    this.setState({ key });
  }

  selectMenu(key) {
    if (this.state.menuSelect[key] === true) {
      this.setState({
        showMenu: !this.state.showMenu
      })
    } else {
      const clearMenu = [false, false]
      clearMenu[key] = true
      console.log(this.state.showMenu)
      if (this.state.showMenu) {
        this.setState({
          menuSelect: clearMenu
        })
      } else {
        this.setState({
          menuSelect: clearMenu,
          showMenu: !this.state.showMenu
        })
      }
    }
  }

  handleMenu() {
    this.setState({
      hideAll: !this.state.hideAll
    })
  }

  setMainMenu(data) {
    console.log(data)
    if (data.status === 'inspecting') {
      console.log( 'wait : ' + data.timeMillisec / 1000 + 'seconds')
      this.setState({
        focusObject: data
      })
      console.log(this.state.focusObject)
      if (this.state.menuSelect[0] === true) {
        this.setState({
          menuSelect: [true, false]
        })
      } else {
        this.selectMenu(0)
      }
    }
    else if (data.status === 'complete') {
      console.log('complete !') 
      console.log(data)
      this.setState({
        focusObject: data
      })
    }
  }

  resizeMenu() {
    this.setState({
      windowWidthLong: window.innerWidth > 700
    })
  }

  render() {
    window.onresize = () => {
      this.resizeMenu()
    }
    return (
      <PlayGround>
        <MenuPanel
          wdWidth={this.state.windowWidthLong}
          show={this.state.showMenu}
          hideAll={this.state.hideAll}
          factor={Scaling.factor}
        >
          <HideMenuButton onClick={() => this.handleMenu()}>
            Hide
          </HideMenuButton>
          <MainMenuButton menuSelected={this.state.menuSelect[0]} onClick={() => this.selectMenu(0)}>
            Main
          </MainMenuButton>
          <BagMenuButton menuSelected={this.state.menuSelect[1]} onClick={() => this.selectMenu(1)}>
            Bag
          </BagMenuButton>
          <MenuData>
            {this.state.focusObject.status}
            <br />
            {(this.state.focusObject.status !== 'no object') ? this.state.focusObject.objectData.name : 'no object inspected'}
          </MenuData>
        </MenuPanel>
        <Main showObjectData={(data) => { this.setMainMenu(data) }} />
      </PlayGround>
    )
  }
}

export default App
