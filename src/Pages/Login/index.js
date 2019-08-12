import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { sessionLogin, isAuthenticated } from '../../Services/auth'
import logo from '../../assets/logo.svg'

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: '',
    invalidLogin: false
  }

  componentWillMount() {
    if (isAuthenticated()) this.props.history.push('/main')
  }

  handleSignIn = async (e) => {
    e.preventDefault();
    try {
      this.setState({ invalidLogin: false, errorMessage: '' })
      if (!this.state.email || !this.state.password) throw new Error('Please, enter your information bellow.')
      const { email, password } = this.state

      let loginReturn = await sessionLogin(email, password)
      if (loginReturn && loginReturn.error) throw new Error(loginReturn.error)
      this.props.history.push('/clients')
    } catch (error) {
      return this.setState({ invalidLogin: true, errorMessage: error.message })
    }
  }

  render() {
    return (
      <div style={{ backgroundColor: '#e5e5e5', height: '100vh' }}>
        <Container>
          <Row>
            <Col xs={{ size: 4, offset: 4 }} style={{ backgroundColor: '#ffffff', borderRadius: 12, padding: 25, marginTop: '20vh' }}>
              <div style={{ height: 150, textAlign: 'center' }}>
                <img alt='Login' style={{ height: '100%' }} src={logo} />
              </div>
              <Form onSubmit={(e) => this.handleSignIn(e)}>
                <FormGroup>
                  <Label for='exampleEmail'>Email</Label>
                  <Input
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    type='email'
                    style={{
                      border: this.state.invalidLogin ? "1px solid #FF2D55" : ""
                    }}
                    id='inputNameLogin'
                    name='email'
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='examplePassword'>Password</Label>
                  <Input
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    type='password'
                    id='inputPasswordLogin'
                    style={{
                      border: this.state.invalidLogin ? "1px solid #FF2D55" : ""
                    }}
                    name='password'
                  />
                </FormGroup>
                <div style={{ paddingBottom: 10, textAlign: 'center' }}>
                  {this.state.errorMessage}
                </div>
                <Button className='float-right'>Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
