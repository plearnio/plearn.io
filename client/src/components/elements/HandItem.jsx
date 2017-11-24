import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Button = styled.button`
  background-color: #282828;
  padding: 10px;
  &:hover {
    background-color:#787878;
  }
`
const Panel = styled.div`
  padding: 20px;
  width: 100px;
  border: 1px solid #ddd;
  margin: auto;
  background-color: #eee;
`

const Slot = ({ item, addItem }) => {
  return (<Button onClick={() => addItem(item)}> <img src={item.picture} width="32" alt="item" /> </Button>)
}

const HandItem = ({ holdItem, addItem }) => {

  // const addItem = (item) => {
  //   // const indexItem = listItem.indexOf(item)
  //   // console.log(indexItem)
  //   // if (indexItem > -1) {
  //   //   addCratfItem(listItem[indexItem])
  //   //   listItem.splice(indexItem, 1);
  //   // }
  //   console.log(item)
  // }

  return (
    <div>
      <h3> Hold Item </h3>
      <Panel>
        {holdItem && <Slot item={holdItem} addItem={addItem} />}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HandItem)
