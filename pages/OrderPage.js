import { transform } from '@babel/core'
import DMX from 'dimanex-components'
import babelPresetReact from '@babel/preset-react'
import React, { Component } from 'react'

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

class DimanexDream extends Component {
  render() {
    const {
      children,
      ...props
    } = this.props

    if (typeof children === 'function') {
      return children(props)
    } else {
      return <div>loading...</div>
    }
  }
}

export default class OrderPage extends Component {
  static path = '/order'

  state = {
    renderProp: Function.prototype
  }

  componentDidMount () {
    const {
      match
    } = this.props

    fetch(`http://localhost:3000/pages${match.path}`, { headers })
      .then(response => response.json())
      .then(({ jsx, props={} }) => transform(jsx, { presets: [ [ babelPresetReact ] ] }, (err, result) => {
        if (err) throw err

        const renderProp = new Function('React', 'DMX', `return ${result.code}`)

        this.setState({ renderProp, props })
      })
    )
  }

  render () {
    const {
      props,
      renderProp
    } = this.state

    return (
      <div>
        <h1>Order</h1>

        <DimanexDream {...props}>
          {renderProp(React, DMX)}
        </DimanexDream>

        <DMX.Button>FE Button</DMX.Button>
      </div>
    )
  }
}
