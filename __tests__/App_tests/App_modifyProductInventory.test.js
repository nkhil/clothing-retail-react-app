import "@babel/polyfill"
import React from "react"
import App from "../../src/App/App"
import renderer from "react-test-renderer"

require("react-router-dom")
jest.mock("react-router-dom")

test("modifyProductInventory() deducting product", () => {
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.modifyProductInventory("product1", -1)
  expect(componentInstance.state.products["product1"].productQuantity).toEqual(
    4
  )
})

test("modifyProductInventory() adding product", () => {
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.modifyProductInventory("product1", 1)
  expect(componentInstance.state.products["product1"].productQuantity).toEqual(
    5
  )
})
