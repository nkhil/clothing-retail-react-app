import "@babel/polyfill"
import React from "react"
import App from "../../src/App/App"
import renderer from "react-test-renderer"

require("react-router-dom")
jest.mock("react-router-dom")

test("voucherCodeIsValid() with valid voucher code (FIVEOFF)", () => {
  const mockDiscountCode = {
    code: "FIVEOFF",
    discountAmount: 500,
    minimumSpend: 0,
  }
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.state.voucherCodes = [mockDiscountCode]
  expect(componentInstance.voucherCodeIsValid("FIVEOFF")).toEqual(true)
})

test("voucherCodeIsValid() with valid voucher code (FIFTEENOFF) and minimum spend, but no footwear", () => {
  const mockDiscountCode = {
    code: "FIFTEENOFF",
    discountAmount: 1500,
    minimumSpend: 7500,
  }
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.addToCart("product6")
  componentInstance.state.voucherCodes = [mockDiscountCode]
  expect(componentInstance.voucherCodeIsValid("FIFTEENOFF")).toEqual(false)
})

test("voucherCodeIsValid() with valid voucher code (FIFTEENOFF),minimum spend, and footwear", () => {
  const mockDiscountCode = {
    code: "FIFTEENOFF",
    discountAmount: 1500,
    minimumSpend: 7500,
  }
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.addToCart("product6")
  componentInstance.addToCart("product1")
  componentInstance.state.voucherCodes = [mockDiscountCode]
  expect(componentInstance.voucherCodeIsValid("FIFTEENOFF")).toEqual(true)
})

test("voucherCodeIsValid() with valid voucher code (FIFTEENOFF) and footwear but no minimum spend", () => {
  const mockDiscountCode = {
    code: "FIFTEENOFF",
    discountAmount: 1500,
    minimumSpend: 7500,
  }
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.addToCart("product2")
  componentInstance.state.voucherCodes = [mockDiscountCode]
  expect(componentInstance.voucherCodeIsValid("FIFTEENOFF")).toEqual(false)
})

test("voucherCodeIsValid() with invalid voucher code", () => {
  const mockDiscountCode = {
    code: "TEST",
    discountAmount: 500,
    minimumSpend: 0,
  }
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.state.voucherCodes = [mockDiscountCode]
  expect(componentInstance.voucherCodeIsValid("TES")).toEqual(false)
})