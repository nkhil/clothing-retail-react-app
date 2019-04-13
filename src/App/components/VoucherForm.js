import React, { Component, Fragment } from "react"

class VoucherForm extends Component {
  voucherCodeRef = React.createRef()

  handleSubmit = e => {
    e.preventDefault()
    const voucherCode = this.voucherCodeRef.current.value.toUpperCase()
    if (this.props.voucherCodeIsValid(voucherCode)) {
      this.props.setActiveVoucherCode(voucherCode)
    }
  }

  render = () => {
    return (
      <Fragment>
        <form id="voucher-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="voucher-code"
            ref={this.voucherCodeRef}
            placeholder="Voucher code"
          />
          <button type="submit">Apply</button>
        </form>
      </Fragment>
    )
  }
}

export default VoucherForm
