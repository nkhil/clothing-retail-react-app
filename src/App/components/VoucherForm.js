import React, { PureComponent, Fragment } from "react"

class VoucherForm extends PureComponent {
  discountVoucherRef = React.createRef()

  handleSubmit = e => {
    e.preventDefault()
  }

  render = () => {
    return (
      <Fragment>
        <form id="voucher-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="discount-code"
            ref={this.discountVoucherRef}
            placeholder="Voucher code"
          />
          <button type="submit">Submit</button>
        </form>
      </Fragment>
    )
  }
}

export default VoucherForm
