import "@babel/polyfill"
import React from "react"
import VoucherForm from "../src/App/components/VoucherForm"
import renderer from "react-test-renderer"
import ReactDOM from "react-dom"

require("react-router-dom")
jest.mock("react-router-dom")

test("VoucherForm renders without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(<VoucherForm />, div)
})

test("VoucherForm renders correctly", () => {
  const voucherForm = renderer.create(<VoucherForm />).toJSON()
  expect(voucherForm).toMatchSnapshot()
})
