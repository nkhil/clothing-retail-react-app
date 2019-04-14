import "@babel/polyfill"
import React from "react"
import App from "../../src/App/App"
import renderer from "react-test-renderer"

require("react-router-dom")
jest.mock("react-router-dom")

test("loadVoucherCodesIntoState()", () => {
  const mockVoucherCode = {
    code: "TENOFF",
    discountAmount: 1000,
    minimumSpend: 5000,
  }
  const mockVoucherCodesArray = [mockVoucherCode]
  const component = renderer.create(<App />)
  const componentInstance = component.getInstance()
  componentInstance.loadVoucherCodesIntoState(mockVoucherCodesArray)
  expect(componentInstance.state.voucherCodes).toEqual(mockVoucherCodesArray)
})