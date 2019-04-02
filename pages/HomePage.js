import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import OrderPage from './OrderPage'

export default class HomePage extends Component {
  static path = '/'

  state = {
    redirect: null
  }

  redirectTo = redirect => event => {
    event.preventDefault()

    this.setState({ redirect })
  }

  render () {
    const {
      redirect
    } = this.state

    if (redirect) {
      return (
        <Redirect push to={redirect} />
      )
    }

    return (
      <div>
        <h1>Home</h1>

        <p>
          <a onClick={this.redirectTo(OrderPage.path)}>Order</a>
        </p>
      </div>
    )
  }
}
