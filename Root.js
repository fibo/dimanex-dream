import React, { Component } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import HomePage from './pages/HomePage'
import OrderPage from './pages/OrderPage'

export default class Root extends Component {
  render () {
    const {
      store
    } = this.props

    return (
      <BrowserRouter>
        <Switch>
          <Route component={HomePage} exact path={HomePage.path} />

          <Route component={OrderPage} path={OrderPage.path} />

          <Redirect from='*' to={HomePage.path} />
        </Switch>
      </BrowserRouter>
    )
  }
}
