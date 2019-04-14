import React, { Component, Fragment } from "react"

class ShoppingCartItem extends Component {
  handleClick = () => {
    this.props.removeFromCart(this.props.index)
  }

  render = () => {
    const productName = this.props.product.productName
    return (
      <Fragment>
        <li id={this.props.index} className="product">
          <h3>
            {productName} x {this.props.numberOfItems}
          </h3>
          <button className="remove-item" onClick={this.handleClick}>
            Remove
          </button>
        </li>
      </Fragment>
    )
  }
}

export default ShoppingCartItem
