import "@babel/polyfill"
import React from "react"
import DisplayTotal from "../src/App/components/DisplayTotal"
import renderer from "react-test-renderer"
import ReactDOM from "react-dom"

require("react-router-dom")
jest.mock("react-router-dom")

const mockCalculateDiscountedTotal = () => 2300

test("DisplayTotal renders without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(
    <DisplayTotal calculateDiscountedTotal={mockCalculateDiscountedTotal} />,
    div
  )
})

test("DisplayTotal renders correctly", () => {
  const displayTotal = renderer
    .create(
      <DisplayTotal calculateDiscountedTotal={mockCalculateDiscountedTotal} />
    )
    .toJSON()
  expect(displayTotal).toMatchSnapshot()
})
