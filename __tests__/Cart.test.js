import "@babel/polyfill"
import React from "react"
import ShoppingCart from "../src/App/components/Cart"
import renderer from "react-test-renderer"

require("react-router-dom")
jest.mock("react-router-dom")

const mockProducts = {
  product1: {
    productName: "Almond Toe Court Shoes, Patent Black",
    productCategory: "Women's Footwear",
    productPrice: 9900,
    productQuantity: 5,
  },
  product2: {
    productName: "Suede Shoes, Blue",
    productCategory: "Women's Footwear",
    productPrice: 4200,
    productQuantity: 4,
  },
}

const mockShoppingCart = { product1: 1, product2: 1 }

const mockRemoveFromCart = () => {}
const mockCalculateTotal = () => 2300

test("ShoppingCart renders correctly", () => {
  const shoppingCart = renderer
    .create(
      <ShoppingCart
        products={mockProducts}
        shoppingCart={mockShoppingCart}
        removeFromCart={mockRemoveFromCart}
        calculateTotal={mockCalculateTotal}
      />
    )
    .toJSON()
  expect(shoppingCart).toMatchSnapshot()
})
