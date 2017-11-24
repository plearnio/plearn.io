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
  border: 1px solid #ddd;
  background-color: #eee;
`

const Slot = ({ item, addToCraft }) => {
  return (<Button onClick={() => addToCraft(item)}> <img src={item.picture} width="32" alt="item" /> </Button>)
}

const Bag = ({ listItem, addCratfItem, craftItem }) => {

  const addToCraft = (item) => {
    const indexItem = listItem.indexOf(item)
    console.log(indexItem)
    if (indexItem > -1) {
      addCratfItem(listItem[indexItem])
      listItem.splice(indexItem, 1);
    }
  }

  return (
    <div>
      <h3> Your Bag </h3>
      <Panel>
        {listItem.map((item, index) => {
          return (<Slot key={index} item={item} addToCraft={addToCraft} />)
        })}
      </Panel>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    listItem: state.item.listItem,
    craftItem: state.item.craftItem
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addCratfItem: (object) => {
      dispatch({ type: 'ADD_CRAFT_ITEM', payload: object })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bag)
