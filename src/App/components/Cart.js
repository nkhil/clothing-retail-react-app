import React, { Component, Fragment } from "react"
import ShoppingCartItem from "./CartItem"
import DisplayTotal from "./DisplayTotal"
import VoucherForm from "./VoucherForm"

class ShoppingCart extends Component {
  render = () => {
    return (
      <Fragment>
        <div id="shoppingCart">
          <h2>Basket:</h2>
          <ul>
            {Object.keys(this.props.shoppingCart).map(key => (
              <ShoppingCartItem
                key={key}
                index={key}
                numberOfItems={this.props.shoppingCart[key]}
                product={this.props.products[key]}
                removeFromCart={this.props.removeFromCart}
              />
            ))}
          </ul>
          <VoucherForm
            applyVoucherCode={this.props.applyVoucherCode}
          />
          <DisplayTotal
            calculateDiscountedTotal={this.props.calculateDiscountedTotal}
          />
        </div>
      </Fragment>
    )
  }
}

export default ShoppingCart
