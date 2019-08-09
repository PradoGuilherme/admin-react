import React, { Component } from 'react'
import Header from '../../Components/Header'

export default class DashBoard extends Component {
  render () {
    return (
      <div>
        <Header
          history={this.props.history}
        />
        DashBoard
      </div>
    )
  }
}
