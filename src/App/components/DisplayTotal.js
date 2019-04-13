import React, { Component, Fragment } from "react"
import { formatPrice } from "../helpers/helperMethods"

class DisplayTotal extends Component {
  render = () => {
    return (
      <Fragment>
        <h3 id="total">Total: {formatPrice(this.props.calculateTotal())}</h3>
      </Fragment>
    )
  }
}

export default DisplayTotal
