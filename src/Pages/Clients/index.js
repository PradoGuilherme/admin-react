import React, { Component } from 'react'
import { Container, Row, Col, Button, Table } from 'reactstrap'
import clientService from '../../Services/clients'
import Dialoga from '../../Components/ClientDialog'
import Header from '../../Components/Header'

export default class Clients extends Component {
  state = {
    clients: [],
    clientsToDelete: [],
    showModal: false
  }

  async componentDidMount() {
    const clients = await clientService.listCLients()
    this.setState({ clients: clients.data })
  }

  openModal = () => this.setState({ showModal: true })

  toggle = async () => {
    this.setState({ showModal: !this.state.showModal })
    const clients = await clientService.listCLients()
    this.setState({ clients: clients.data })
  }

  handleChangeChk = (e) => {
    let index = this.state.clientsToDelete.findIndex(id => { return id === e })
    if (index === -1) {
      let cliToDelete = [e, ...this.state.clientsToDelete]
      return this.setState({
        clientsToDelete: cliToDelete
      })
    }

    let cliToDelete = this.state.clientsToDelete
    cliToDelete.splice(index, 1)
    this.setState({
      clientsToDelete: cliToDelete
    })
  }


  deleteClient = async () => {
    if (!this.state.clientsToDelete || !this.state.clientsToDelete.length)
      return alert('Você deve selecionar ao menos um cliente para realizar a remoção.')

    const clients = await clientService.removeClients(this.state.clientsToDelete)
    this.setState({ idsToDelete: [], clients: clients.data })
  }

  render() {
    return (
      <div>
        <Header
          history={this.props.history}
        />

        <Container>
          <Dialoga
            handleClose={this.toggle}
            show={this.state.showModal}
          />
          <Row>
            <Col>
              <div>
                <Button
                  style={{
                    marginTop: 10,
                    marginBottom: 25
                  }}
                  onClick={this.openModal}
                  className='float-right'
                  variant='dark'>
                  Add Client
              </Button>
              </div>
              {this.state.clients.length
                ? <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.clients.map(cli =>
                      <tr key={cli._id}>
                        <td>
                          <input type="checkbox"
                            onChange={() => this.handleChangeChk(cli._id)}>
                          </input>
                        </td>
                        <td>{cli.name}</td>
                        <td>{cli.email}</td>
                        <td>{cli.userName}</td>
                        <td></td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                : <div style={{ textAlign: 'center' }}>
                  <h1>Não existe clientes cadastrados.</h1>
                </div>
              }
              <div>
                {this.state.clients.length ?
                  <Button
                    style={{
                      marginTop: 10,
                      marginBottom: 25
                    }}
                    onClick={this.deleteClient}
                    className='float-right'
                    color='danger'>
                    Delete Client
                  </Button>
                  : ''
                }
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
