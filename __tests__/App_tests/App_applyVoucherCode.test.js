import "@babel/polyfill"
import React from "react"
import App from "../../src/App/App"
import renderer from "react-test-renderer"

require("react-router-dom")
jest.mock("react-router-dom")

test("applyVoucherCode() when code is valid", () => {
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  const mockDiscountCode = {
    code: "TEST",
    discountAmount: 500,
    minimumSpend: 0,
  }
  componentInstance.state.voucherCodes = [mockDiscountCode]
  componentInstance.applyVoucherCode("TEST")
  expect(componentInstance.state.activeVoucherCode).toEqual("TEST")
})

test("applyVoucherCode() when code is invalid", () => {
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  const mockDiscountCode = {
    code: "TEST",
    discountAmount: 500,
    minimumSpend: 0,
  }
  componentInstance.state.voucherCodes = [mockDiscountCode]
  jest.spyOn(window, "alert").mockImplementation(() => {})
  componentInstance.applyVoucherCode("A")
  expect(window.alert).toBeCalledWith("Invalid discount code")
})