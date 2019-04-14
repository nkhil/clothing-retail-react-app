import "@babel/polyfill"
import React from "react"
import Router from "../src/App/components/Router"
import renderer from "react-test-renderer"
import ReactDOM from "react-dom"

require("react-router-dom")
jest.mock("react-router-dom")

test("Router renders without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(<Router />, div)
})

test("Router renders correctly", () => {
  const router = renderer.create(<Router />).toJSON()
  expect(router).toMatchSnapshot()
})
