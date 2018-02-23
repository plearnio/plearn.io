import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #bbb;
  padding: 10px;
  &:hover {
    background-color:#ddd;
  }
`
const Panel = styled.div`
  padding: 20px;
  width: 100px;
  border: 1px solid #ddd;
  margin: auto;
  background-color: #eee;
`

const Slot = ({ item, sendBack }) => {
  return (<Button onClick={() => sendBack(item)}> <img src={item.picture} width="32" alt="item" /> </Button>)
}

const HandItem = ({ holdItem, addHoldItem, addItem }) => {

  const sendBack = (item) => {
    addItem(item)
    addHoldItem(null)
  }

  return (
    <div>
      <h3> Holding Item </h3>
      <Panel>
        {holdItem && <Slot item={holdItem} sendBack={sendBack} />}
      </Panel>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    holdItem: state.item.holdItem,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (object) => {
      dispatch({ type: 'ADD_ITEM', payload: object })
    },
    addHoldItem: (object) => {
      dispatch({ type: 'ADD_HOLD_ITEM', payload: object })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HandItem)
