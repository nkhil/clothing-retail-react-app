import { createGlobalStyle } from "styled-components"
import styledNormalize from "styled-normalize"

const GlobalStyle = createGlobalStyle`
  
  ${styledNormalize}

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  ul {
    padding: 0;
  }

  button {
    cursor: pointer;
  }

  .item-button {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  li {
    list-style-type: none;
    padding: 10px;
    border: 5px solid black;
  }

  .products-list {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .product-details {
    margin-bottom: 40px;
  }

  .product {
    padding: 10px;
    width: 250px;
    margin-top: 10px;
    border-radius: 5px;
    position: relative;
  }

  .shopping-cart-list {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .shopping-cart-container {
    margin-left: 20px;
  }

  @media (max-width: 599px) { 
    .shopping-cart-list {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      flex-wrap: wrap;
      padding: 0;
      margin: 0;
      list-style: none;
    }
    .shopping-cart-container {
      text-align: center;
      margin-left: 0;
    }
   }

`

export default GlobalStyle
