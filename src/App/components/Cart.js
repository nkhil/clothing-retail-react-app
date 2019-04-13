import React, { PureComponent, Fragment } from "react"
import ShoppingCartItem from "./CartItem"
import DisplayTotal from "./DisplayTotal"
import VoucherForm from "./VoucherForm"

class ShoppingCart extends PureComponent {
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
            voucherCodeIsValid={this.props.voucherCodeIsValid}
            setActiveVoucherCode={this.props.setActiveVoucherCode}
        </div>
      </Fragment>
    )
  }
}

export default ShoppingCart
