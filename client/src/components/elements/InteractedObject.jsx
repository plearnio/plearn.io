import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ButtonToolbar,
  Button
} from 'react-bootstrap'
import styled from 'styled-components'

const InteractItemPic = styled.div`
border: 1px solid #ddd;
border-radius: 10px;
background-color: white;
width: 100px;
padding: 5px;
text-align:center;
margin: auto;
`
const Label = styled.h4`
color: #666;
`
const ObjectContent = styled.span`
color: #999;
`

const Actions = styled(ButtonToolbar)`
margin-top: 20px;
`

const ShowItem = styled.div`
/* display: none; Hidden by default */
padding:10px;
width: 100%; 
overflow: auto;
background-color: white;
color: #282828;
`

const ImgItem = styled.img`
min-width: 60px;
max-width: 80px;
overflow-x: hidden;
`

class InteractedObject extends Component {

  constructor(props) {
    super(props)
  }

  callSetAction(act) {
    const { setAction, action } = this.props
    setAction(act)
    console.log(act)
    this.forceUpdate()
  }
  render() {
  const { activeObject, action } = this.props
  console.log(activeObject)
    return (
      <div>
        {
        activeObject.name !== 'background' &&
        <ShowItem>
          <InteractItemPic>
            <ImgItem src={activeObject.picture} className="App-logo" alt="logo" />
          </InteractItemPic>
          <br />
          <Label> Name : <ObjectContent>{activeObject.name}</ObjectContent></Label>
          <Label> Science name : <ObjectContent>{activeObject.name}</ObjectContent></Label>
          <Label> Description : <ObjectContent>{activeObject.name}</ObjectContent></Label>
          <Actions>
            {
              activeObject.actions.map((act) => {
                if (act.name !== 'move' && action !== act.name) {
                  return (<Button bsSize="large" block onClick={() => this.callSetAction(act.name)}>{act.name}</Button>)
                }
              })
            }
          </Actions>
        </ShowItem>
        }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    activeObject: state.world.activeObject,
    action: state.world.action
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (object) => {
      dispatch({ type: 'ADD_ITEM', payload: object })
    },
    setAction: (action) => {
      dispatch({ type: 'SET_ACTION', payload: action })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InteractedObject)
