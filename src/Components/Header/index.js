import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap'

import { sessionLogout } from '../../Services/auth'
import { NavLink as RouterNavLink } from 'react-router-dom'
import './style.css'

export default class index extends Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.logout = this.logout.bind(this)
    this.state = {
      isOpen: false
    }
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  logout () {
    sessionLogout()
    this.props.history.push('/')
  }

  render () {
    return (
      <div>
        <Navbar color='dark' dark expand='md'>
          <Container>
            <NavbarBrand tag={RouterNavLink} to='/main'>Home</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink tag={RouterNavLink} to='/clients' >Clients</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RouterNavLink} to='/orders' >Orders</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={{ color: '#ffffff' }} onClick={this.logout}>Logout</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}
