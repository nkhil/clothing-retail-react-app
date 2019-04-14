import React, { PureComponent, Fragment } from "react"
import ProductItem from "./ProductItem"

class ProductList extends PureComponent {
  render = () => {
    return (
      <Fragment>
        <ul className="products-list">
          {Object.keys(this.props.products).map(key => (
            <ProductItem
              key={key}
              details={this.props.products[key]}
              index={key}
              addToCart={this.props.addToCart}
              modifyProductInventory={this.props.modifyProductInventory}
            />
          ))}
        </ul>
      </Fragment>
    )
  }
}

export default ProductList
