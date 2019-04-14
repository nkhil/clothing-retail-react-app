import "@babel/polyfill"
import React from "react"
import App from "../../src/App/App"
import renderer from "react-test-renderer"

require("react-router-dom")
jest.mock("react-router-dom")

test("_calculateTotal()", () => {
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.addToCart("product2")
  expect(componentInstance._calculateTotal()).toEqual(4200)
})