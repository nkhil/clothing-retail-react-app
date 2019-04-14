import "@babel/polyfill"
import React from "react"
import App from "../../src/App/App"
import renderer from "react-test-renderer"

require("react-router-dom")
jest.mock("react-router-dom")

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