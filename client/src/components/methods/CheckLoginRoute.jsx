import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const CheckLoginRoute = ({ component: Component, userData, ...rest }) => (
  <Route
    {...rest}
    render={
      props => (
          userData.user ? (
            <Component userData={userData} {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        )
    }
  />
)

export default CheckLoginRoute