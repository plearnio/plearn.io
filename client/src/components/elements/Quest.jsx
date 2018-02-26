import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  Grid,
  Button,
  Modal
} from 'react-bootstrap'

import fire from '../../assets/card/fire.jpg'
import water from '../../assets/card/water.jpg'
import food from '../../assets/card/food.jpg'
import home from '../../assets/card/home.jpg'

const ImgCenterRespon = styled.img`
  max-width: 85%;
  margin-top: 90px;
`

const QuestButton = styled(Button)`
  width: 100%;
  background-color: #fff;
  border: 1px solid #bbb;
  padding: 10px;
  &:hover {
    background-color:#ddd;
    color: #222;
  }
  &:active {
    background-color:#ddd;
    color: #222;
  }
  color: #444;
`
const QuestItem = ({QuestTarget, setShow, show, onHide, target, id}) => {
  return(<div className="modal-container">
    <QuestButton
      bsStyle="default"
      bsSize="large"
      onClick={() => {
        setShow(true, id)
      }}
      disabled = {QuestTarget.disable}
    >
      {QuestTarget.name}
    </QuestButton>
    <Modal
    bsSize="large"
      show={show}
      onHide={onHide}
      container={target}
      aria-labelledby="contained-modal-title-lg"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-lg">
          <h3>{QuestTarget.name}</h3>
          <h4>{QuestTarget.subtask}</h4>
          <h3>รางวัล</h3>
          <h4>{QuestTarget.reward}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {QuestTarget.description}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
        onHide(false, id)
      }}>Close</Button>
      </Modal.Footer>
    </Modal>
  </div>)
}

const listItem = 
  [
    {
      name: 'การเอาตัวรอดเบื้องต้น # 1',
      subtask: 'การก่อไฟ',
      reward: '+ 50 exp, + เควส เตาเผา',
      description:
        <div>
          <h3> ขั้นตอน </h3>
          <h4> เก็บ grass 2 ต้น </h4>
          <h4> นำ grass สร้างเป็น rope 2 อัน </h4>
          <h4> เก็บ twig 2 อัน </h4>
          <h4> เก็บ log 1 อัน </h4>
          <h4> สร้าง อุปกรณ์ก่อไฟ ระดัย 1 จาก twig x 2, log x 1, rope x 2 </h4>
          <Grid fluid>
          <center><ImgCenterRespon src={fire} width="750" /></center>
        </Grid>
        </div>
    }, {
      name: 'การเอาตัวรอดเบื้องต้น # 2',
      subtask: 'น้ำ',
      reward: '+ 80 exp, + เควส เครื่องปั้นดินเผา',
      description:
        <div>
          <h3> ขั้นตอน </h3>
          <h4> เก็บ Bark 3 อัน </h4>
          <h4> นำ Bark สร้างเป็น Bucket 1 อัน </h4>
          <h4> สำรวจแหล่งน้ำ </h4>
          <h4> ตักน้ำจากแหล่งน้ำ </h4>
          <h4> เก็บ charcoal 2 อัน </h4>
          <h4> เก็บ flint 1 อัน </h4>
          <h4> เก็บ sand 1 อัน </h4>
          <h4> สร้าง ที่กรองน้ำ ระดัย 1 จาก bark x 1, charcoal x 2, flint x 1, sand x 1 </h4>
          <h4> กรองน้ำที่ตักกับ ที่กรองน้ำระดับ 1 </h4>
          <Grid fluid>
          <center><ImgCenterRespon src={water} width="750" /></center>
        </Grid>
        </div>
    }, {
      name: 'การเอาตัวรอดเบื้องต้น # 3',
      subtask: 'อาหาร',
      reward: '+ 50 exp, + เควส การเกษตร',
      description:
        <div>
          <h3> ขั้นตอน </h3>
          <h4> สำรวจหาอาหารที่ไม่มีพิษ 3 ชนิด </h4>
          <h4> สำรวจหาอาหารที่มีพิษ 3 ชนิด </h4>
          <Grid fluid>
          <center><ImgCenterRespon src={food} width="750" /></center>
        </Grid>
        </div>
    }, {
      name: 'การเอาตัวรอดเบื้องต้น # 4',
      subtask: 'ที่อยู่อาศัย',
      reward: '+ 100 exp, + เควส ห้องทดลอง',
      description:
      <div>
        <h3> ขั้นตอน </h3>
        <h4> เก็บ Bark 10 อัน </h4>
        <h4> เก็บ leaf 10 ชุด</h4>
        <h4> สร้าง bed level 1 จาก Bark x 10, leaf x 10</h4>
        <h4> เก็บ twig 10 อัน</h4>
        <h4> เก็บ stick 10 อัน</h4>
        <h4> สร้าง teepee's structure จาก twig x 10, stick x 10</h4>
        <h4> เก็บ log 2 อัน</h4>
        <h4> เก็บ grass 5 ต้น</h4>
        <h4> สร้าง teepee's roof จาก log x 2, grass x 5, leaf x 10</h4>
        <h4> สร้าง teepee (กระโจม) จาก teepee's roof x 1, teepee's structure x 1, bed level 1 x 1</h4>
        <Grid fluid>
        <center><ImgCenterRespon src={home} width="750" /></center>
      </Grid>
      </div>
    }, {
      name: 'ล็อค', disable: true
    }, {
      name: 'ล็อค', disable: true
    }, {
      name: 'ล็อค', disable: true
    }, {
      name: 'ล็อค', disable: true
    }
  ]

class Quest extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleHide = this.handleHide.bind(this);
    this.setShow = this.setShow.bind(this);

    this.state = {
      show: [false, false]
    };
  }

  handleHide(data, index) {
    const newShow = this.state.show
    newShow[index] = data
    this.setState({ show: newShow })
  }

  setShow(data, index) {
    const newShow = this.state.show
    newShow[index] = data
    this.setState({ show: newShow })
  }
  render() {
    return (
      <div>
        {
          listItem.map((QuestTarget, index) => {
            return (<QuestItem
              id={index}
              QuestTarget={QuestTarget}
              setShow={this.setShow}
              show={this.state.show[index]}
              onHide={this.handleHide}
              target={this}
            />)
          })
        }
      </div>
    )
  }
}

export default Quest
