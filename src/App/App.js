import React, { Component, Fragment } from "react"
import products from "./helpers/products"
import voucherCodes from "./helpers/voucherCodes"
import ProductList from "./components/ProductList"
import ShoppingCart from "./components/Cart"

class App extends Component {
  state = {
    products: {},
    shoppingCart: {},
    voucherCodes: [],
    activeVoucherCode: null,
  }

  componentWillMount = () => {
    this.loadProductsIntoState(products)
    this.loadVoucherCodesIntoState(voucherCodes)
  }

  loadProductsIntoState = products => {
    this.setState({ products })
  }

  loadVoucherCodesIntoState = voucherCodes => {
    this.setState({ voucherCodes })
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

  calculateDiscountedTotal = () => {
    if (this.state.activeVoucherCode) {
      const discountAmount = this._getVoucherObject(
        this.state.activeVoucherCode
      ).discountAmount
      const discountedTotal = this.calculateTotal() - discountAmount
      return discountedTotal
    }
    return this.calculateTotal()
  }

  setActiveVoucherCode = voucherCode => {
    this.setState({ activeVoucherCode: voucherCode })
  }

  voucherCodeIsValid = voucherCode => {
    const voucherObject = this._getVoucherObject(voucherCode)
    if (voucherObject && voucherCode === "FIFTEENOFF") {
      return this._checkFifteenOffCriteria(voucherObject.minimumSpend)
    }
    if (voucherObject) {
      return this._voucherMeetsMinimumSpend(voucherObject.minimumSpend)
    }
    return false
  }

  _checkFifteenOffCriteria = minimumSpend => {
    return (
      this._voucherMeetsMinimumSpend(minimumSpend) &&
      this._shoppingCartContainsFootwear()
    )
  }

  _shoppingCartContainsFootwear = () => {
    const shoppingCartIds = Object.keys(this.state.shoppingCart)
    const footwearItemsInCart = shoppingCartIds.filter(key => {
      return this.state.products[key].productCategory.includes("Footwear")
    })
    return footwearItemsInCart.length > 0
  }

  _voucherMeetsMinimumSpend = minimumSpend =>
    this.calculateDiscountedTotal() >= minimumSpend

  _getVoucherObject = voucherCode => {
    const voucherObject = this.state.voucherCodes.filter(
      voucher => voucher.code === voucherCode
    )
    return voucherObject[0]
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
          calculateDiscountedTotal={this.calculateDiscountedTotal}
          voucherCodeIsValid={this.voucherCodeIsValid}
          setActiveVoucherCode={this.setActiveVoucherCode}
        />
      </Fragment>
    )
  }
}

export default App
