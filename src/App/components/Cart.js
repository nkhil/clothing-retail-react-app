import React, { Component, Fragment } from "react"
import ShoppingCartItem from "./CartItem"
import DisplayTotal from "./DisplayTotal"
import VoucherForm from "./VoucherForm"

class ShoppingCart extends Component {
  render = () => {
    return (
      <Fragment>
        <div className="shopping-cart-container" id="shoppingCart">
          <h2>Shopping Cart:</h2>
          <ul className="shopping-cart-list">
            {Object.keys(this.props.shoppingCart).map(key => (
              <ShoppingCartItem
                key={key}
                index={key}
                numberOfItems={this.props.shoppingCart[key]}
                product={this.props.products[key]}
                removeFromCart={this.props.removeFromCart}
                modifyProductInventory={this.props.modifyProductInventory}
              />
            ))}
          </ul>
          <VoucherForm applyVoucherCode={this.props.applyVoucherCode} />
          <DisplayTotal
            calculateDiscountedTotal={this.props.calculateDiscountedTotal}
          />
        </div>
      </Fragment>
    )
  }
}

export default ShoppingCart
