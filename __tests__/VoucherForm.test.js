import "@babel/polyfill"
import React from "react"
import VoucherForm from "../src/App/components/VoucherForm"
import renderer from "react-test-renderer"

require("react-router-dom")
jest.mock("react-router-dom")

test("VoucherForm renders correctly", () => {
  const voucherForm = renderer.create(<VoucherForm />).toJSON()
  expect(voucherForm).toMatchSnapshot()
})
