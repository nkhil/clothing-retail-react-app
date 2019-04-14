import "@babel/polyfill"
import React from "react"
import ShoppingCartItem from "../src/App/components/CartItem"
import renderer from "react-test-renderer"
import ReactDOM from "react-dom"

require("react-router-dom")
jest.mock("react-router-dom")

const mockProduct = {
  productName: "Almond Toe Court Shoes, Patent Black",
  productCategory: "Women's Footwear",
  productPrice: 9900,
  productQuantity: 5,
}

const mockRemoveFromCart = () => {}

test("ShoppingCartItem renders without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(
    <ShoppingCartItem
      key={"product1"}
      index={"product1"}
      numberOfItems={1}
      product={mockProduct}
      removeFromCart={mockRemoveFromCart}
    />,
    div
  )
})

test("ShoppingCart renders correctly", () => {
  const shoppingCartItem = renderer
    .create(
      <ShoppingCartItem
        key={"product1"}
        index={"product1"}
        numberOfItems={1}
        product={mockProduct}
        removeFromCart={mockRemoveFromCart}
      />
    )
    .toJSON()
  expect(shoppingCartItem).toMatchSnapshot()
})
