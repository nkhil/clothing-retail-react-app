import React, { Component, Fragment } from "react"
import products from "./helpers/products"
import ProductList from "./components/ProductList"
import ShoppingCart from "./components/Cart"

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

  removeFromCart = key => {
    const shoppingCart = { ...this.state.shoppingCart }
    shoppingCart[key] = shoppingCart[key] - 1
    if (shoppingCart[key] <= 0) {
      delete shoppingCart[key]
    }
    this.setState({ shoppingCart })
  }

  deductProductFromInventory = key => {
    let products = { ...this.state.products }
    products[key].productQuantity -= 1
    this.setState({ products })
  }

  calculateTotal = () => {
    const cartIds = Object.keys(this.state.shoppingCart)
    const cartTotal = cartIds.reduce((prevTotal, key) => {
      const productPrice = this.state.products[key].productPrice
      const count = this.state.shoppingCart[key]
      return prevTotal + productPrice * count
    }, 0)
    return cartTotal
  }

  render = () => {
    return (
      <Fragment>
        <ProductList
          products={this.state.products}
          addToCart={this.addToCart}
          deductProductFromInventory={this.deductProductFromInventory}
        />
        <ShoppingCart
          products={this.state.products}
          shoppingCart={this.state.shoppingCart}
          removeFromCart={this.removeFromCart}
        />
      </Fragment>
    )
  }
}

export default App
