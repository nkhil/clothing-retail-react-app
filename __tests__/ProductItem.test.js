import "@babel/polyfill"
import React from "react"
import ProductItem from "../src/App/components/ProductItem"
import renderer from "react-test-renderer"

require("react-router-dom")
jest.mock("react-router-dom")

const mockKey = "product1"
const mockDetails = {
  productName: "Almond Toe Court Shoes, Patent Black",
  productCategory: "Women's Footwear",
  productPrice: 9900,
  productQuantity: 5,
}
const mockAddToCart = () => {}
const mockDeductProductFromInventory = () => {}

test("ProductItem renders correctly", () => {
  const productList = renderer
    .create(
      <ProductItem
        key={mockKey}
        details={mockDetails}
        index={mockKey}
        addToCart={mockAddToCart}
        deductProductFromInventory={mockDeductProductFromInventory}
      />
    )
    .toJSON()
  expect(productList).toMatchSnapshot()
})
