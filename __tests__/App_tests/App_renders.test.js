import "@babel/polyfill"
import React from "react"
import App from "../../src/App/App"
import ReactDOM from "react-dom"
import renderer from "react-test-renderer"

require("react-router-dom")
jest.mock("react-router-dom")

test("App renders without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(<App />, div)
})

test("App renders correctly", () => {
  const app = renderer.create(<App />).toJSON()
  expect(app).toMatchSnapshot()
})
