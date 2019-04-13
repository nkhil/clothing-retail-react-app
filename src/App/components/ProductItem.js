import React, { Component, Fragment } from "react"
import { formatPrice } from "../helpers/helperMethods"

class ProductItem extends Component {
  handleClick = () => {
    this.props.addToCart(this.props.index)
    this.props.deductProductFromInventory(this.props.index)
  }

  render = () => {
    const { productName, productPrice, productCategory } = this.props.details
    const index = this.props.index
    return (
      <Fragment>
        <li id={this.props.index}>
          <h3>{productName}</h3>
          <h4>{formatPrice(productPrice)}</h4>
          <p>{productCategory}</p>
          <button className={`${index}-button`} onClick={this.handleClick}>
            Add to cart
          </button>
        </li>
      </Fragment>
    )
  }
}

export default ProductItem
