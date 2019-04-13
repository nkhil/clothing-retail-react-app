import "@babel/polyfill"
import React from "react"
import App from "../src/App/App"
import renderer from "react-test-renderer"

require("react-router-dom")
jest.mock("react-router-dom")

let app

beforeEach(() => {
  app = renderer.create(<App />).toJSON()
})

test("App renders correctly", () => {
  expect(app).toMatchSnapshot()
})

test("addToCart()", () => {
  const shoppingBasket = { product1: 1 }
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.addToCart("product1")
  expect(componentInstance.state.shoppingCart).toEqual(shoppingBasket)
})

test("deductProductFromInventory()", () => {
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.addToCart("product1")
  componentInstance.deductProductFromInventory("product1")
  expect(componentInstance.state.products["product1"].productQuantity).toEqual(
    4
  )
})

test("removeFromCart()", () => {
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.addToCart("product1")
  componentInstance.removeFromCart("product1")
  expect(componentInstance.state.shoppingCart).toEqual({})
})

test("calculateTotal()", () => {
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.addToCart("product2")
  expect(componentInstance.calculateTotal()).toEqual(4200)
})

test("voucherCodeIsValid() with valid voucher code", () => {
  const mockDiscountCode = { code: "TEST", discountAmount: 500 }
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.state.VoucherCodes = [mockDiscountCode]
  expect(componentInstance.VoucherCodeIsValid("TEST")).toEqual(true)
})

test("voucherCodeIsValid() with invalid voucher code", () => {
  const mockDiscountCode = { code: "TEST", discountAmount: 500 }
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.state.VoucherCodes = [mockDiscountCode]
  expect(componentInstance.VoucherCodeIsValid("TES")).toEqual(false)
})
