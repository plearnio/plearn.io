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

import Playground from './components/pages/Playground'

// classes
import ScalingWindow from './classes/ScalingWindow'
// assets
import menuMain from './assets/menu_main.png'
import menuBag from './assets/menu_bag.png'
import menuQuest from './assets/menu_quest.png'
import menuBook from './assets/menu_book.png'
import menuChat from './assets/menu_chat.png'
import menuHide from './assets/menu_hide.png'

const Scaling = new ScalingWindow()
Scaling.scalingApp('main')
console.log(Scaling.factor)

const MenuButton = styled.button`
  position: absolute;
  left: 0px;
  outline: none;
  border-top-left-radius: 2vw;
  border-bottom-left-radius: 2vw;
  width: 5vw;
  color: white;
  background-color:#303843;
  min-width: 40px;
  height: 10vh;
  padding: 1vh;
  text-align: center;
  font-size: 2vh;
`

const HideMenuButton = styled(MenuButton)`
  top: 0px;
  height: 5vh;
  font-size: 1vh;
  background-image: url(${menuHide});
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
`

const MainMenuButton = styled(MenuButton)`
  top: 5vh;
  ${props => props.menuSelected && css`
    border-right-style: none;
    background-color: #282828;
  `};
  background-image: url(${menuMain});
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center; 
`

const BagMenuButton = styled(MenuButton)`
  top: 15vh;
  ${props => props.menuSelected && css`
    border-right-style: none;
    background-color:#282828;
  `};
  background-image: url(${menuBag});
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center; 
`

const QuestMenuButton = styled(MenuButton)`
  top: 25vh;
  ${props => props.menuSelected && css`
    border-right-style: none;
    background-color:#282828;
  `};
  background-image: url(${menuQuest});
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center; 
`

const BookMenuButton = styled(MenuButton)`
  top: 35vh;
  ${props => props.menuSelected && css`
    border-right-style: none;
    background-color:#282828;
  `};
  background-image: url(${menuBook});
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center; 
`

const ChatMenuButton = styled(MenuButton)`
  top: 45vh;
  ${props => props.menuSelected && css`
    border-right-style: none;
    background-color:#282828;
  `};
  background-image: url(${menuChat});
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
`
const MenuPanel = styled.div`
  color: #282828;
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
  transition: height color width ease-in .5s;
  
  ${props => props.show && css`
    width: 500px;
    color: white;
  `};

  ${props => props.hideAll && css`
    width: 5vw;
    height: 5vh;
  `};
`

const MenuData = styled.div`
  padding: 20px;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #282828;
`

const NoPaddingCol = styled(Col)`
  padding: 0px;
`

const PanelPlayground = styled(Grid)`
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
      login: false,
      userData: this.props.userData,
      showMenu: false,
      hideAll: false,
      menuSelect: [false, false, false, false, false, false],
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
    console.log(this.props)
    return (
      this.props.userData && <PanelPlayground>
        <MenuPanel
          wdWidth={this.state.windowWidthLong}
          show={this.state.showMenu}
          hideAll={this.state.hideAll}
          factor={Scaling.factor}
          style={{ marginTop: '50px'}}
        >
          <HideMenuButton onClick={() => this.handleMenu()}>
            Hide
          </HideMenuButton>
          <MainMenuButton menuSelected={this.state.menuSelect[0]} onClick={() => this.selectMenu(0)} />
          <BagMenuButton menuSelected={this.state.menuSelect[1]} onClick={() => this.selectMenu(1)} />
          <QuestMenuButton menuSelected={this.state.menuSelect[2]} onClick={() => this.selectMenu(2)} />
          <BookMenuButton menuSelected={this.state.menuSelect[3]} onClick={() => this.selectMenu(3)} />
          <ChatMenuButton menuSelected={this.state.menuSelect[4]} onClick={() => this.selectMenu(4)} />
          <MenuData>
            {this.state.menuSelect[0] && (
              <div>
                <h3>Main panel</h3>
                <h5>หน้าหลัก</h5>
                {/* <div>{this.state.focusObject.status}</div>
                <br />
                <div>{(this.state.focusObject.status !== 'no object') ? this.state.focusObject.objectData.name : 'no object inspected'}</div> */}
              </div>
            )}
            {this.state.menuSelect[1] && (
              <div>
                <h3>Bag</h3>
                <h5>กระเป๋า</h5>
              </div>
            )}
            {this.state.menuSelect[2] && (
              <div>
                <h3>Quests</h3>
                <h5>เควส</h5>
              </div>
            )}
            {this.state.menuSelect[3] && (
              <div>
                <h3>Books</h3>
                <h5>หนังสือ</h5>
              </div>
            )}
            {this.state.menuSelect[4] && (
              <div>
                <h3>Chat</h3>
                <h5>ระบบสนทนา</h5>
              </div>
            )}
            
          </MenuData>
        </MenuPanel>
        <Playground userData={this.props.userData} showObjectData={(data) => { this.setMainMenu(data) }} />
      </PanelPlayground>
    )
  }
}

export default App
