import React, { Component } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie'
import {
  Navbar,
  Button
} from 'react-bootstrap'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';

import configSandbox from '../../config/sandbox'

const TopNavbar = styled(Navbar)`
  position: absolute;
  width: 100%;
  z-index: 100;
`

const NavbarMenu = withRouter(
  ({ history, userData, setUserData }) => {
    const logOut = () => {
      const authOptions = {
        method: 'GET',
        url: `${configSandbox.url}/logout`,
        headers: {
          Authorization: Cookies.get('__token'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
      }
      axios(authOptions)
      .then((response) => {
        if (response.data.status === 'complete') {
          setUserData({
            user: null,
          })
          Cookies.remove('__token');
          history.push('/home')
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }
    return (
      <TopNavbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">plearn.io</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text><Navbar.Link href="#"> 
            <Link to="/home">
              Main
            </Link>
          </Navbar.Link>
          </Navbar.Text>
          <Navbar.Text style={{ marginTop: '10px', marginBottom: '5px' }}>
            <Link to="/playground">
              <Button
                bsSize="small"
                bsStyle="success"
              >
              Play
              </Button>
            </Link>
          </Navbar.Text>
          {
          userData.user && (<Navbar.Text pullRight style={{ marginTop: '10px', marginBottom: '5px' }}>
            <Button
              bsSize="small"
              bsStyle="warning"
              onClick={() => logOut()}
            >
              Log out
            </Button>
          </Navbar.Text>)
        }
          {
            userData.user ? (
              <Navbar.Text pullRight>
                Signed in as: <Navbar.Link href="#"> {userData.user.username} </Navbar.Link>
              </Navbar.Text>
            ) : ( 
              <Navbar.Text pullRight>
                You are not signed in.
              </Navbar.Text>
            )
          }
        </Navbar.Collapse>
      </TopNavbar>
    )
  }
)

export default NavbarMenu