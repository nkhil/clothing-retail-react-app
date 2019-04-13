# Responsive website for clothing retailer

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

[![Maintainability](https://api.codeclimate.com/v1/badges/e7f6f36584af602f5274/maintainability)](https://codeclimate.com/github/nkhil/clothing-retail-react-app/maintainability)

## Project setup

Steps to setup and run the project locally:

- Clone or fork this repo with `git clone https://github.com/nkhil/clothing-retail-react-app.git`
- Go into the application root with `cd clothing-retail-react-app`
- To start the server, type `npm run start`
- Visit `http://localhost:1234/` in any modern browser to see the app in action

## Testing

This project uses `jest` along with `react-test-renderer` for unit testing and `cypress` for integration testing.

Steps to run the test suite:

**Unit tests:**

- From the application root, run `npm run test`. This will start the test suite in `watchAll` mode by default
- To update the Jest snapshots, run `npm run updatesnapshot`

**Feature (integration) tests:**

- From the application root, run `npm run cypress`.

## Technologies used

- Built using React.js from scratch (i.e. not create react app)
- Tested using `cypress` and `jest` along with `react-test-renderer`
- `parcel` for development server and build

# Approach

## Commit messages

I've followed the [Atomic commit message](https://seesparkbox.com/foundry/atomic_commits_with_git) strategy to keep my commits to one feature, fix or improvement.

I've also used [Gitmoji](https://gitmoji.carloscuesta.me/) to select few commits (for eg: new features or new dependencies) to keep them distinct and easily recognisable.

## Git branching approach

I worked on the master branch to create a working 'hello world' react app that loads mock product data (supplied in the requirements) into the application state (`App.state.products`).

Following that, all work is carried out on the `dev` branch, and every feature was developed on its own branch followed by a pull request to merge into `dev` and subsequently into `master`. Once merged, branches are deleted.

## Styling

- As styling the application was not a requirement, I've kept the styling to a minimum
- This project uses `styled-components` for the styling, and uses a [reusable component system](https://levelup.gitconnected.com/building-a-reusable-component-system-with-react-js-and-styled-components-4e9f1018a31c) which allows to keep the code clean, and abstract the presentation layer, while still keeping the styling declarative and readable (for eg: `<Flex column contentCenter alignCenter>` or `<Header h3>`)
- I'm using simple flexbox containers in order to make the application responsive on desktop, mobile phones and tablets.

## Product Prices

Product prices are stored as integers (in pennies) for maximum accuracy. A helper method (`formatPrice` in `App/helpers.js`) is used to convert the integer into a string for presentation purposes. As this wasn't explicitly stated, product prices are rendered like so: **£30.50** and **£30.00**.

## Displaying available products & shopping cart

The requirements mention to `display all of the available products, as well as a shopping cart`.

I am assuming that it means that the user should see both components at the same time so that adding an item to the shopping cart will instantly update the shopping cart that's visible on the page.

**Note:**

In a real world scenario, I would put this as a question to the client which wasn't a possibility in this case. However, as I'm using react, changing this functionality to have a simple link to the shopping cart and display the shopping cart on another route (for eg: `/shopping-cart`) will be trivial as I have separated out the shopping cart into its own component.

## Using mock data

### Products

The application uses product data that's stored locally in a flat file (as suggested in the requirements). The supplied mock products are loaded into the application's state when the `componentWillMount()` lifecycle method is fired.

### Vouchers

Similar to products, the application uses vouchers stored locally in a flat file.

The discount voucher is a javaScript object with properties. For eg:

`const five = { code: "FIVEOFF", discountAmount: 500 }`

I decided to choose this data structure, as it would allow admins to add or modify discounts without needing to go into the application logic. I have a comment with instructions on how to do this in `helpers/discountCodes.js`. Note that the `discountAmount` property expects data in the form of pennies (similar to products)

**Note:**

I have followed this approach as it means minimal changes to the code once a database is introduced.

## Adding items to shopping cart

Instead of putting the entire product into the shopping cart, I have opted for the approach of adding the product's key as the basket item's key, and the quantity as the value.

**Here's what it looks like when the shopping cart has items in it**

```
shoppingCart = {
  product1: 2,
  product2: 1,
}
```

I believe this approach (adding a reference instead of the entire object) is more efficient than adding the entire product into the basket.

## Using pure components

TK

## Structuring components

I've followed SRP (single responsibility principle) strictly throughout the development process. Every UI element has been separated out into its own component which ensures that each component has a single responsibility, making the application easy to change.

For eg: Each product item and each shopping cart item are their own components. Content, styling or functionality changes to them is as simple as modifying one component.

### Example component structure:

```
<App
  <ProductList
    <ProductItem />
    <ProductItem />
    <ProductItem />
  />
  <ShoppingCart
    <ShoppingCartItem />
    <ShoppingCartItem />
    <ShoppingCartItem />
  />
/>
```

## Private methods

Private methods throughout this project are denoted with a `_` before the function name (for eg: `_getDiscountObject`). Private methods are not to be called by other components.
