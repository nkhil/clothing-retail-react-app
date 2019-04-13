import React, { PureComponent, Fragment } from "react"
import ShoppingCartItem from "./CartItem"

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
              />
            ))}
          </ul>
        </div>
      </Fragment>
    )
  }
}

export default ShoppingCart
