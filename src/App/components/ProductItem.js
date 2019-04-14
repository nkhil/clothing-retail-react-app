import React, { Component, Fragment } from "react"
import { formatPrice } from "../helpers/helperMethods"

class ProductItem extends Component {
  handleClick = () => {
    this.props.addToCart(this.props.index)
    this.props.modifyProductInventory(this.props.index, -1)
  }

  render = () => {
    const {
      productName,
      productPrice,
      productCategory,
      productQuantity,
    } = this.props.details
    const index = this.props.index
    const isAvailable = productQuantity > 0
    return (
      <Fragment>
        <li id={this.props.index} className="product">
          <div className="product-details">
            <h3>{productName}</h3>
            <h4>{formatPrice(productPrice)}</h4>
            <p>{isAvailable ? `${productQuantity} available` : ""}</p>
            <p>Category: {productCategory}</p>
          </div>
          <button
            className={`${index}-button item-button`}
            onClick={this.handleClick}
            disabled={!isAvailable}
          >
            {isAvailable ? "Add to cart" : "Sold out!"}
          </button>
        </li>
      </Fragment>
    )
  }
}

export default ProductItem
