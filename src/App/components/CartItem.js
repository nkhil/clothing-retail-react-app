import React, { Component, Fragment } from "react"

class ShoppingCartItem extends Component {
  render = () => {
    const productName = this.props.product.productName
    return (
      <Fragment>
        <li id={this.props.index}>
          <h3>
            {productName} x {this.props.numberOfItems}
          </h3>
        </li>
      </Fragment>
    )
  }
}

export default ShoppingCartItem
