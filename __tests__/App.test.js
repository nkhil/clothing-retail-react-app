import "@babel/polyfill"
import React from "react"
import App from "../src/App/App"
import renderer from "react-test-renderer"

require("react-router-dom")
jest.mock("react-router-dom")

let app

beforeEach(() => {
  app = renderer.create(<App />).toJSON()
})

test("App renders correctly", () => {
  expect(app).toMatchSnapshot()
})
