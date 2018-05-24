import React, { Component } from 'react'
import axios from 'axios'
import {
  Grid,
  Form,
  FormControl,
  FormGroup,
  HelpBlock,
  Col,
  Button,
  Checkbox,
  ControlLabel
} from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import configSandbox from '../../config/sandbox'

const CenterGrid = styled(Grid)`
  max-width: 100%;
  width: 360px;
  margin-top: 50px;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 1vw;
`

const Title = styled.h3`
  margin-top: -5px;
  margin-bottom: 25px;
`

const FieldGroup = ({ id, label, name, help, inputRef, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl inputRef={inputRef} {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToReferrer: false
    }
    this.signIn = this.signIn.bind(this)
  }

  signIn(username, password) {
    const authOptions = {
      method: 'POST',
      url: `${configSandbox.url}/login`,
      data: {
        username: username,
        password: password
      }
    };
    const userData = axios(authOptions)
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log(error);
    });

    userData.then((res) => {
      if (res && res.data !== 'wrong user or password') {
        Cookies.set('__token', res.data.user._token);
        this.props.setUserData({
          user: res.data.user
        })
        this.setState({ redirectToReferrer: true })
      } else {
        console.log(res)
        alert('no response from server')
      }
    })
  }

  handleSignIn(e) {
    e.preventDefault()
    const username = this.username.value
    const password = this.password.value
    this.signIn(username, password)
  }

  render() { 
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer || this.props.userData.user) {
      return <Redirect to={from} />;
    }

    return (
      // <div>
      //   <p>You must log in to view the page at {from.pathname}</p>
      //   <form onSubmit={this.handleSignIn.bind(this)}>
      //     <h3>Sign in</h3>
      //     <input type="text" ref="username" placeholder="enter you username" />
      //     <input type="password" ref="password" placeholder="enter password" />
      //     <input type="submit" value="Login" />
      //   </form>
      // </div>
      <Grid>
        <CenterGrid>
        <center><Title>
            Please log in first
          </Title></center>
      <Form horizontal onSubmit={this.handleSignIn.bind(this)}>
      <FieldGroup
        id="formControlsEmail"
        type="text"
        label="Username"
        name="username"
        placeholder="username"
        inputRef = {(input) => this.username = input }
      />
      <FieldGroup
        id="formControlsPassword"
        label="Password"
        name="password"
        placeholder="password"
        type="password"
        inputRef = {(input) => this.password = input }
      />

      <FormGroup>
        <Col>
          <center><Button bsStyle="primary" type="submit">Sign in</Button></center>
        </Col>
      </FormGroup>
    </Form>
    </CenterGrid>
    </Grid>
    )
  }
}

export default Login
