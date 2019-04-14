import "@babel/polyfill"
import React from "react"
import ProductList from "../src/App/components/ProductList"
import renderer from "react-test-renderer"
import ReactDOM from "react-dom"

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

const mockAddToCart = () => {}
const mockDeductProductFromInventory = () => {}

test("ProductList renders without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(
    <ProductList
      products={mockProducts}
      addToCart={mockAddToCart}
      deductProductFromInventory={mockDeductProductFromInventory}
    />,
    div
  )
})

test("ProductList renders correctly", () => {
  const productList = renderer
    .create(
      <ProductList
        products={mockProducts}
        addToCart={mockAddToCart}
        deductProductFromInventory={mockDeductProductFromInventory}
      />
    )
    .toJSON()
  expect(productList).toMatchSnapshot()
})
