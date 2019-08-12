import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import sinon from 'sinon'
import Login from './index'

configure({ adapter: new Adapter() })

describe('Login test page', () => {
  beforeEach(() => {
    sinon.restore()
  })

  it('should enter data to make login', () => {
    const login = shallow(<Login />)
    login.find('#inputNameLogin').simulate('change', { target: { value: 'email@empresa.com.br' } })
    expect(login.state('email')).to.be.equal('email@empresa.com.br')
    login.find('#inputPasswordLogin').simulate('change', { target: { value: '@#Password123' } })
    expect(login.state('password')).to.be.equal('@#Password123')
    expect(login.state('invalidLogin')).to.be.equal(false)
  })

  it('should submit form without enter data', () => {
    const login = shallow(<Login />)
    login.find('Form').simulate('submit')
    expect(login.state('invalidLogin')).to.be.equal(true)
    expect(login.state('errorMessage')).to.be.equal('Please, enter your information bellow.')
  })

  it('should make login', () => {
    const login = shallow(<Login />)
    const historyMock = {
      push: sinon.spy()
    }

    login.setProps({ history: historyMock })
    login.find('#inputNameLogin').simulate('change', { target: { value: 'email' } })
    login.find('#inputPasswordLogin').simulate('change', { target: { value: 'password' } })
    login.find('Form').simulate('submit')

    expect(login.state('invalidLogin')).to.be.equal(false)
  })

  it('should apply error style on input', () => {
    const login = shallow(<Login />)
    login.setState({ invalidLogin: true })
    expect(login.find('#inputNameLogin').prop('style')).to.deep.equal({ border: '1px solid #FF2D55' })
    expect(login.find('#inputPasswordLogin').prop('style')).to.deep.equal({ border: '1px solid #FF2D55' })
  })

  const login = shallow(<Login />)
  it('should submit form without data then submit with data', () => {
    const historyMock = {
      push: sinon.spy()
    }

    login.setProps({ history: historyMock })
    login.find('#inputNameLogin').simulate('change', { target: { value: '' } })
    login.find('#inputPasswordLogin').simulate('change', { target: { value: '' } })
    login.find('Form').simulate('submit')
    expect(login.state('invalidLogin')).to.be.equal(true)
    expect(login.state('errorMessage')).to.be.equal('Please, enter your information bellow.')
    login.find('#inputNameLogin').simulate('change', { target: { value: 'email' } })
    login.find('#inputPasswordLogin').simulate('change', { target: { value: 'password' } })
    login.find('Form').simulate('submit')

    expect(login.state('invalidLogin')).to.be.equal(false)
  })

  chai.use(chaiEnzyme())
})
