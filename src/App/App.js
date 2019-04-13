import React, { Component, Fragment } from "react"
import products from "./helpers/products"

class App extends Component {
  state = {
    products: {},
    shoppingCart: {},
  }

  componentWillMount = () => {
    this.loadProductsIntoState()
  }

  loadProductsIntoState = () => {
    this.setState({ products })
  }

  render = () => {
    return (
      <Fragment>
        <h1>Hello World</h1>
      </Fragment>
    )
  }
}

export default App
