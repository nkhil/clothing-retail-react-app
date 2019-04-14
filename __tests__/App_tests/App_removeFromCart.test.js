import "@babel/polyfill"
import React from "react"
import App from "../../src/App/App"
import renderer from "react-test-renderer"

require("react-router-dom")
jest.mock("react-router-dom")

test("removeFromCart()", () => {
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.addToCart("product1")
  componentInstance.removeFromCart("product1")
  expect(componentInstance.state.shoppingCart).toEqual({})
})

test("removeFromCart() and delete record", () => {
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.addToCart("product1")
  componentInstance.addToCart("product1")
  componentInstance.removeFromCart("product1")
  expect(componentInstance.state.shoppingCart).toEqual({ product1: 1 })
})