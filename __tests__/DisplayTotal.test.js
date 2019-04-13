import "@babel/polyfill"
import React from "react"
import DisplayTotal from "../src/App/components/DisplayTotal"
import renderer from "react-test-renderer"

require("react-router-dom")
jest.mock("react-router-dom")

const mockCalculateTotal = () => 2300

test("DisplayTotal renders correctly", () => {
  const displayTotal = renderer
    .create(<DisplayTotal calculateTotal={mockCalculateTotal} />)
    .toJSON()
  expect(displayTotal).toMatchSnapshot()
})
