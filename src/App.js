import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import Clients from './Pages/Clients'
import Login from './Pages/Login'
import Main from './Pages/Main'
import { isAuthenticated } from './Services/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
)

export default function App () {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <PrivateRoute exact path='/main' component={Main} />
          <PrivateRoute exact path='/clients' component={Clients} />
          <PrivateRoute path='/orders' component={() => 'Orders'} />
          <Route path='*' component={() => 'Not Found'} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
