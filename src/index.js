import React from "react"
import { render } from "react-dom"
import Router from "./App/components/Router"

render(
  <Router />,
  document.querySelector("#app") || document.createElement("div")
)
