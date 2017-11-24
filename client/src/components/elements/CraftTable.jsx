import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ProgressBar } from 'react-bootstrap'

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #bbb;
  padding: 10px;
  &:hover {
    background-color:#ddd;
  }
`
const CraftButton = styled.button`
  background-color: ${props => (props.disable ? '#ddd' : '#85b674')};
  padding: 10px;
  color: white;
  border-radius: 30px;
  &:hover {
    background-color: ${props => (props.disable ? '#ddd' : '#659654')};
    cursor: ${props => (props.disable ? 'no-drop' : 'pointer')};
  }
`

const Panel = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #eee;
`

const Slot = ({ item, addToBag }) => {
  return (<Button onClick={() => addToBag(item)}> <img src={item.picture} width="32" alt="item" /> </Button>)
}

class CraftTable extends Component {
  constructor(props) {
    super(props)
    this.addToBag = this.addToBag.bind(this)
    this.CheckOutputItem = this.CheckOutputItem.bind(this)
  }

  addToBag(item) {
    const {
      craftItem,
      addItem
    } = this.props
    const indexItem = craftItem.indexOf(item)
    console.log(indexItem)
    if (indexItem > -1) {
      addItem(craftItem[indexItem])
      craftItem.splice(indexItem, 1);
    }
  }

  craftToOutput() {
    const {
      craftItem
    } = this.props
    craftItem.splice(0, craftItem.length)
  }

  outputToBag() {
    const {
      outputCraftItem,
      addItem,
      clearCraftedItem
    } = this.props
    if (outputCraftItem) {
      addItem(outputCraftItem)
      clearCraftedItem()
    }
  }

  CheckOutputItem() {
    const { outputCraftItem, craftingItem, startCraftItem, craftItem } = this.props
    if (outputCraftItem === null) {
      if (craftItem.length > 0) {
        startCraftItem()
        this.craftToOutput()
        this.updateTimeCraftItem = setInterval(() => {
          craftingItem()
          this.forceUpdate()
        }, 500)
      }
    }
  }

  render() {
    const {
      craftItem,
      startCraftItem,
      outputCraftItem,
      craftingItem
    } = this.props

    const CraftItem = () => {
      let diffTime = parseInt((outputCraftItem.endTime - outputCraftItem.nowTime) / 1000, 10)
      if (diffTime <= 0) {
        clearInterval(this.updateTimeCraftItem);
        outputCraftItem.status = 'success'
        diffTime = 0
      }
      return (
        <div>
          <h4> Output </h4> <br />
          {
          diffTime === 0 ?
            <Button onClick={() => this.outputToBag()}>
              <img src={outputCraftItem.picture} width="32" alt="craftItem" />
            </Button> :
            <ProgressBar striped bsStyle="success" now={Math.abs((outputCraftItem.buildTimeSec * 10) - (diffTime * 10))} />
          }
        </div>
      )
    }

    return (
      <div>
        <h3> Craft Table </h3>
        <Panel>
          {craftItem.map((item, index) => {
            return (<Slot key={index} item={item} addToBag={this.addToBag} />)
          })}
          <br /><br />
          { craftItem.length !== 0 &&
            <CraftButton onClick={() => this.CheckOutputItem()}>
              Craft
            </CraftButton>
          }
          <div>
            {outputCraftItem && <CraftItem />}
          </div>
        </Panel>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listItem: state.item.listItem,
    craftItem: state.item.craftItem,
    outputCraftItem: state.item.outputCraftItem
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addCratfItem: (object) => {
      dispatch({ type: 'ADD_CRAFT_ITEM', payload: object })
    },
    addItem: (object) => {
      dispatch({ type: 'ADD_ITEM', payload: object })
    },
    startCraftItem: () => {
      dispatch({ type: 'START_CRAFT_ITEM' })
    },
    craftingItem: () => {
      dispatch({ type: 'CRAFTING_ITEM' })
    },
    clearCraftedItem: () => {
      dispatch({ type: 'CLEAR_CRAFTED_ITEM' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CraftTable)
