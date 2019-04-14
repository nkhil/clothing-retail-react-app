import "@babel/polyfill"
import React from "react"
import App from "../../src/App/App"
import renderer from "react-test-renderer"

require("react-router-dom")
jest.mock("react-router-dom")

test("calculateDiscountedTotal() in the presence of discount code", () => {
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  const mockVoucherCode = { code: "FIVEOFF", discountAmount: 500 }
  componentInstance.state.voucherCodes = [mockVoucherCode]
  componentInstance.setActiveVoucherCode("FIVEOFF")
  componentInstance.addToCart("product1")
  expect(componentInstance.calculateDiscountedTotal()).toEqual(9400)
})

test("calculateDiscountedTotal() in the absence of discount code", () => {
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.addToCart("product1")
  expect(componentInstance.calculateDiscountedTotal()).toEqual(9900)
})
