import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  Button,
  Modal
} from 'react-bootstrap'

const ButtonItem = styled.button`
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

const Slot = ({
  item,
  addToCraft,
  setShow,
  show,
  bag,
  id,
  addHoldItem,
  placeToG
}) => {
  const close = () => { setShow(false, id) }
  console.log(id)
  // return (<Button onClick={() => addToCraft(item)}> <img src={item.picture} width="32" alt="item" /> </Button>)
  return (
    <Button onClick={() => {
      setShow(true, id)
    }}> <img src={item.picture} width="32" alt="item" /> 
    <Modal
    show={show}
    onHide={close}
    container={bag}
    bsSize="small"
    aria-labelledby={'contained-modal-title'+id}
    >
    <Modal.Header closeButton>
      <Modal.Title id={'contained-modal-title'+id}>{item.name}</Modal.Title>
    </Modal.Header>
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <img src={item.picture} width="32" alt="item" />
      <br /><br />
      <p> Up your level for details </p>
      <Button block style={{ marginTop: '20px'}} onClick={() => {
        setShow(false, id)
        addToCraft(item)
        }}>
        Add to craft table
      </Button>
      <Button block onClick={() => {
        setShow(false, id)
        addHoldItem(item)
        }}>
        Add to your hand
      </Button>
      <Button block onClick={() => {
        setShow(false, id)
        placeToG(item)
        }}>
        Place item to ground
      </Button>
    </div>
    <Modal.Footer>
      <Button onClick={close}>Close</Button>
    </Modal.Footer>
  </Modal>
  </Button>
  )
}

class Bag extends Component {
  constructor(props){
    super(props)
    this.state = {
      show: [false]
    }
    this.setShow = this.setShow.bind(this)
    this.addToCraft = this.addToCraft.bind(this)
    this.addToHand = this.addToHand.bind(this)
    this.placeToG = this.placeToG.bind(this)
  }

  addToCraft(item) {
    const { listItem, addCratfItem, craftItem } = this.props
    const indexItem = listItem.indexOf(item)
    if (indexItem > -1) {
      addCratfItem(listItem[indexItem])
      listItem.splice(indexItem, 1);
    }
  }

  addToHand(item) {
    const { listItem, addHoldItem } = this.props
    const indexItem = listItem.indexOf(item)
    if (indexItem > -1) {
      addHoldItem(listItem[indexItem])
      listItem.splice(indexItem, 1);
    }
  }

  placeToG(item) {
    const { listItem, addHoldItem, placeObjectToG } = this.props
    const indexItem = listItem.indexOf(item)
    console.log(indexItem)
    if (indexItem > -1) {
      placeObjectToG(listItem[indexItem])
      listItem.splice(indexItem, 1);
    }
  }


  setShow(data, index) {
    const newShow = this.state.show
    newShow[index] = data
    this.setState({ show: newShow })
  }
  render() {
    const { listItem, addCratfItem, craftItem, addHoldItem } = this.props
    return (
    <div>
      <h3> Your Bag </h3>
      <Panel>
        {listItem.map((item, index) => {
          return (<Slot
            key={index}
            id={index}
            item={item}
            addToCraft={this.addToCraft}
            setShow={this.setShow}
            show={this.state.show[index]}
            bag={this}
            addHoldItem={this.addToHand}
            placeToG={this.placeToG}
          />)
        })}
      </Panel>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listItem: state.item.listItem,
    craftItem: state.item.craftItem
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addHoldItem: (object) => {
      dispatch({ type: 'ADD_HOLD_ITEM', payload: object })
    },
    addCratfItem: (object) => {
      dispatch({ type: 'ADD_CRAFT_ITEM', payload: object })
    }, 
    placeObjectToG: (object) => {
      dispatch({ type: 'PLACE_OBJECT', payload: object })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bag)
