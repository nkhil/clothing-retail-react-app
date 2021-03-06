import React, { Component, Fragment } from "react"
import products from "./mocks/products"
import voucherCodes from "./mocks/voucherCodes"
import ProductList from "./components/ProductList"
import ShoppingCart from "./components/Cart"
import GlobalStyle from "./components/styles/GlobalStyles"

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

  modifyProductInventory = (key, value) => {
    let products = { ...this.state.products }
    products[key].productQuantity += value
    this.setState({ products })
  }

  _calculateTotal = () => {
    const cartIds = Object.keys(this.state.shoppingCart)
    const cartTotal = cartIds.reduce((prevTotal, key) => {
      const productPrice = this.state.products[key].productPrice
      const count = this.state.shoppingCart[key]
      return prevTotal + productPrice * count
    }, 0)
    return cartTotal
  }

  applyVoucherCode = voucherCode => {
    if (this.voucherCodeIsValid(voucherCode)) {
      this.setActiveVoucherCode(voucherCode)
    } else alert("Invalid discount code")
  }

  calculateDiscountedTotal = () => {
    if (this.state.activeVoucherCode) {
      const discountAmount = this._getVoucherObject(
        this.state.activeVoucherCode
      ).discountAmount
      const discountedTotal = this._calculateTotal() - discountAmount
      return discountedTotal
    }
    return this._calculateTotal()
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

  _voucherMeetsMinimumSpend = minimumSpend => {
    return this.calculateDiscountedTotal() >= minimumSpend
  }

  _getVoucherObject = voucherCode => {
    const voucherObject = this.state.voucherCodes.filter(
      voucher => voucher.code === voucherCode
    )
    return voucherObject[0]
  }

  render = () => {
    return (
      <Fragment>
        <GlobalStyle />
        <div className="container">
          <ProductList
            products={this.state.products}
            addToCart={this.addToCart}
            modifyProductInventory={this.modifyProductInventory}
          />
          <ShoppingCart
            products={this.state.products}
            shoppingCart={this.state.shoppingCart}
            removeFromCart={this.removeFromCart}
            calculateDiscountedTotal={this.calculateDiscountedTotal}
            voucherCodeIsValid={this.voucherCodeIsValid}
            setActiveVoucherCode={this.setActiveVoucherCode}
            applyVoucherCode={this.applyVoucherCode}
            modifyProductInventory={this.modifyProductInventory}
          />
        </div>
      </Fragment>
    )
  }
}

export default App
