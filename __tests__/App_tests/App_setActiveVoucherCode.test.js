import "@babel/polyfill"
import React from "react"
import App from "../../src/App/App"
import renderer from "react-test-renderer"

require("react-router-dom")
jest.mock("react-router-dom")

test("setActiveVoucherCode()", () => {
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  const mockDiscountCode = {
    code: "TEST",
    discountAmount: 500,
    minimumSpend: 0,
  }
  componentInstance.state.voucherCodes = [mockDiscountCode]
  componentInstance.setActiveVoucherCode("TEST")
  expect(componentInstance.state.activeVoucherCode).toEqual("TEST")
})
