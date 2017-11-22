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
const CraftButton = styled.button`
  background-color: ${props => (props.disable ? '#888' : '#457634')};
  padding: 10px;
  &:hover {
    background-color: ${props => (props.disable ? '#888' : '#659654')};
    cursor: ${props => (props.disable ? 'no-drop' : 'pointer')};
  }
`

const Panel = styled.div`
  padding: 20px;
  border: 1px solid #898989;
  background-color: #444;
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
        }, 1000)
      }
      // console.log(outputCraftItem)
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
      let diffTime = parseInt((outputCraftItem.endTime - outputCraftItem.nowTime) / 1000)
      if (diffTime <= 0) {
        clearInterval(this.updateTimeCraftItem);
        outputCraftItem.status = 'success'
        diffTime = 0
      }
      return (
        <div>
          <h3> name: {outputCraftItem.name} </h3>
          <h4> Output: {
            diffTime === 0 ?
              <Button onClick={() => this.outputToBag()}>
                <img src={outputCraftItem.picture} width="32" alt="craftItem" />
              </Button> : diffTime
            }
          </h4>
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
          <CraftButton disable={craftItem.length === 0} onClick={() => this.CheckOutputItem()}>
            Craft
          </CraftButton>
          <h2>Output</h2>
          <div>
            {outputCraftItem ? <CraftItem /> : 'nothing'}
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
