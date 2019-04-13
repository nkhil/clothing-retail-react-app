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

  addToCart = key => {
    const shoppingCart = { ...this.state.shoppingCart }
    shoppingCart[key] = shoppingCart[key] + 1 || 1
    this.setState({ shoppingCart })
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
