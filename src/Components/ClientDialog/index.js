import React, { Component } from 'react'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import clientService from '../../Services/clients'

class ClientDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: null,
      name: '',
      email: '',
      userName: ''
    }
  }

  submitForm = async () => {
    const { name, email, userName, _id } = this.state
    if (!_id) {
      await clientService.createClient({ name, email, userName })
    } else {
      this.setState({
        _id: null,
      })
      await clientService.updateClient({ name, email, userName, _id })
    }
    this.props.handleClose()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      _id: nextProps.userToEdit._id,
      name: nextProps.userToEdit.name,
      email: nextProps.userToEdit.email,
      userName: nextProps.userToEdit.userName
    })
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.submitForm()
    }
  }

  render() {
    const { show, handleClose } = this.props

    return (
      <Modal isOpen={show} toggle={handleClose} className={this.props.className}>
        <ModalHeader toggle={handleClose}>Modal title</ModalHeader>
        <ModalBody>
          <Form autoComplete='off'>
            <FormGroup>
              <Label for='exampleEmail'>Name</Label>
              <Input onKeyDown={this._handleKeyDown} type='text' name='name' value={this.state.name} onChange={e => this.setState({ name: e.target.value })} placeholder='Please, enter your real name' />
            </FormGroup>
            <FormGroup>
              <Label for='exampleEmail'>Email</Label>
              <Input onKeyDown={this._handleKeyDown} type='email' value={this.state.email} name='email' onChange={e => this.setState({ email: e.target.value })} placeholder='Please, enter your best e-mail' />
            </FormGroup>
            <FormGroup>
              <Label for='exampleEmail'>Username</Label>
              <Input onKeyDown={this._handleKeyDown} type='text' value={this.state.userName} name='userName' onChange={e => this.setState({ userName: e.target.value })} placeholder='How we call you? Please, enter a good username' />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={handleClose}>Cancel</Button>
          <Button color='primary' onClick={this.submitForm}>Do Something</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ClientDialog
