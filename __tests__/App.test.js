import "@babel/polyfill"
import React from "react"
import App from "../src/App/App"
import ReactDOM from "react-dom"
import renderer from "react-test-renderer"

require("react-router-dom")
jest.mock("react-router-dom")

test("App renders without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(<App />, div)
})

test("App renders correctly", () => {
  const app = renderer.create(<App />).toJSON()
  expect(app).toMatchSnapshot()
})

test("loadProductsIntoState()", () => {
  const mockProducts = {
    product7: {
      productName: "Cotton Shorts, Medium Red",
      productCategory: "Women’s Casualwear",
      productPrice: 3000,
      productQuantity: 5,
    },
    product8: {
      productName: "Fine Stripe Short Sleeve Shirt, Grey",
      productCategory: "Men’s Casualwear",
      productPrice: 4999,
      productQuantity: 9,
    },
  }
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.loadProductsIntoState(mockProducts)
  expect(componentInstance.state.products).toEqual(mockProducts)
})

test("loadVoucherCodesIntoState()", () => {
  const mockVoucherCode = {
    code: "TENOFF",
    discountAmount: 1000,
    minimumSpend: 5000,
  }
  const mockVoucherCodesArray = [mockVoucherCode]
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.loadVoucherCodesIntoState(mockVoucherCodesArray)
  expect(componentInstance.state.voucherCodes).toEqual(mockVoucherCodesArray)
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

test("_calculateTotal()", () => {
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.addToCart("product2")
  expect(componentInstance._calculateTotal()).toEqual(4200)
})

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
