import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import {
  Grid,
  Row,
  Col,
  Tabs,
  Tab,
  DropdownButton,
  ButtonToolbar,
  Button,
  MenuItem,
  OverlayTrigger,

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

import card_1 from './assets/card/card_1.png'
import card_2 from './assets/card/card_2.png'
import card_3 from './assets/card/card_3.png'
import card_4 from './assets/card/card_4.png'
import card_5 from './assets/card/card_5.png'
import card_6 from './assets/card/card_6.png'

import item_1 from './assets/items/item_1.png'
import item_2 from './assets/items/item_2.png'
import item_3 from './assets/items/item_3.png'
import item_4 from './assets/items/item_4.png'
import item_5 from './assets/items/item_5.png'
import item_6 from './assets/items/item_6.png'
import item_7 from './assets/items/item_7.png'
import item_8 from './assets/items/item_8.png'
import item_9 from './assets/items/item_9.png'
import item_10 from './assets/items/item_10.png'

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
const BAG = [item_1, item_2, item_3, item_4]
const BUTTONS = ['Default', 'Default', 'Default'];
const renderDropdownButton = (title, i, objectData, input) => {
  console.log('asdasdasdsssss')
  console.log(input)
  let Item = menuHide
  if (input) {
    Item = menuHide
  } else {
    if (i === 0) {
      Item = item_9
    } else {
      Item = menuHide
    }
  }
  return (
    <div>
    <DropdownButton
      bsStyle={title.toLowerCase()}
      key={i}
      id={`dropdown-basic-${i}`}
      style={{
        width: '80px',
        height: '80px',
        backgroundImage: `url(${Item})`,
        float :'left',
        marginLeft: '10px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '90%',
        backgroundPosition: 'center',
        color: 'black',
      }}
    >
      <MenuItem eventKey="1">asd</MenuItem>
      <MenuItem eventKey="2">Twig</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Get back</MenuItem>
    </DropdownButton>
    <DropdownButton
      bsStyle={title.toLowerCase()}
      key={i}
      id={`dropdown-basic-${i}`}
      style={{
        width: '80px',
        height: '80px',
        backgroundImage: `url(${menuHide})`,
        float :'left',
        marginLeft: '10px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '90%',
        backgroundPosition: 'center',
        color: 'black',
      }}
    >
      <MenuItem eventKey="1">none</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Get back</MenuItem>
    </DropdownButton>
    </div>
  );
}

const renderBagButton = (title, i, input, user) => {
  console.log(user.user.name)
  if (user.user.name === 'test_1') {
    title = menuHide
  }
  return (
    <div>
    <DropdownButton
      bsStyle={title.toLowerCase()}
      key={i}
      id={`dropdown-basic-${i}`}
      style={{
        width: '80px',
        height: '80px',
        backgroundImage: `url(${title})`,
        float: 'left',
        marginLeft: '10px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '90%',
        backgroundPosition: 'center',
        color: 'black',
      }}
    >
    </DropdownButton>
    <DropdownButton
      bsStyle={title.toLowerCase()}
      key={i}
      id={`dropdown-basic-${i}`}
      style={{
        width: '80px',
        height: '80px',
        backgroundImage: `url(${menuHide})`,
        float :'left',
        marginLeft: '10px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '90%',
        backgroundPosition: 'center',
        color: 'black',
      }}
    >
      {(title === menuHide) && (<MenuItem eventKey="1">eat</MenuItem>)}
      {(title === menuHide) && (<MenuItem eventKey="2">drop</MenuItem>)}
      {(title === menuHide) && (<MenuItem eventKey="2">equip</MenuItem>)}
    </DropdownButton>
    </div>
  );
}

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
        showMenu: !this.state.showMenu,
        menuSelect: [false, false]
      })

    } else {
      const clearMenu = [false, false, false, false, false, false]
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
    // if (data.status === 'inspecting') {
    //   console.log( 'wait : ' + data.timeMillisec / 1000 + 'seconds')
    this.setState({
      focusObject: data
    })
    console.log(this.state.focusObject)
    if (this.state.menuSelect[0] !== true)  {
      this.selectMenu(0)
    }
      // }
    // } else if (data.status === 'complete') {
    //   console.log('complete !') 
    //   console.log(data)
    //   this.setState({
    //     focusObject: data
    //   })
    // }
  }

  resizeMenu() {
    this.setState({
      windowWidthLong: window.innerWidth > 700
    })
  }

  render() {
    // alert(this.state.focusObject.objectData)
    window.onresize = () => {
      this.resizeMenu()
    }
    console.log('asdasdasdasd datatatatatt ')
    console.log(this.state.focusObject.objectData)
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
          <MenuData style={{ overflowY: 'auto'}}>
            {this.state.menuSelect[0] && (
              <div>
                <h3>Main panel</h3>
                <h5>หน้าหลัก</h5>
                <div>{this.state.focusObject.status}</div>
                <br />
                <div>{((this.state.focusObject.objectData) && (this.state.focusObject.objectData.name != '????')) && (
                  <div>

                  <h3>{this.state.focusObject.objectData.name} </h3>
                  <Grid>
                    <Row>
                    <h4 style={{ marginTop: '50px' }}>อุปกรณ์เสริม</h4>
                      <center>
                        {/* <button onClick={() => { alert('asdasd') }} style={{ width: '80px', height: '80px', backgroundColor: 'white', float :'left', marginLeft: '10px' }}> asdasd </button>
                        <button style={{ width: '80px', height: '80px', backgroundColor: 'white', float :'left', marginLeft: '10px' }}> asdasd </button>
                        <button style={{ width: '80px', height: '80px', backgroundColor: 'white', float :'left', marginLeft: '10px' }}> asdasd </button>
                        <button style={{ width: '80px', height: '80px', backgroundColor: 'white', float :'left', marginLeft: '10px' }}> asdasd </button> */}
                        <ButtonToolbar>{BUTTONS.map((el, index) => renderDropdownButton(el, index, this.state.focusObject.objectData, true))}</ButtonToolbar>
                    </center>
                    </Row>
                  </Grid>
                  <Grid>
                    <Row>
                    <h4 style={{ marginTop: '20px' }}>ผลลัพธ์</h4>
                      <center>
                        {/* <button onClick={() => { alert('asdasd') }} style={{ width: '80px', height: '80px', backgroundColor: 'white', float :'left', marginLeft: '10px' }}> asdasd </button>
                        <button style={{ width: '80px', height: '80px', backgroundColor: 'white', float :'left', marginLeft: '10px' }}> asdasd </button>
                        <button style={{ width: '80px', height: '80px', backgroundColor: 'white', float :'left', marginLeft: '10px' }}> asdasd </button>
                        <button style={{ width: '80px', height: '80px', backgroundColor: 'white', float :'left', marginLeft: '10px' }}> asdasd </button> */}
                        <ButtonToolbar>{BUTTONS.map((el, index) => renderDropdownButton(el, index, this.state.focusObject.objectData, false))}</ButtonToolbar>
                        </center>
                    </Row>
                  </Grid>
                  </div>
                 )
                }</div>
              </div>
            )}
            {this.state.menuSelect[1] && (
              <div>
                <h3>Bag</h3>
                <h5>กระเป๋า</h5>
                <ButtonToolbar>{BAG.map((el, index) => renderBagButton(el, index, false, this.props.userData))}</ButtonToolbar>
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
                <img src={card_1} style={{ width: "70%" }} />
                <h3> ภาวะเกื้อกูล </h3>
                <p> testt testa</p>
                <img src={card_2} style={{ width: "70%" }} />
                <h3> ภาวะเกื้อกูล </h3>
                <p> testt testa</p>
                <img src={card_3} style={{ width: "70%" }} />
                <h3> ภาวะเกื้อกูล </h3>
                <p> testt testa</p>
                <img src={card_4} style={{ width: "70%" }} />
                <h3> ภาวะเกื้อกูล </h3>
                <p> testt testa</p>
                <img src={card_5} style={{ width: "70%" }} />
                <h3> ภาวะเกื้อกูล </h3>
                <p> testt testa</p>
                <img src={card_6} style={{ width: "70%" }} />
                <h3> ภาวะเกื้อกูล </h3>
                <p> testt testa</p>
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
