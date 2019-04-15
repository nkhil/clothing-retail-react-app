# Responsive web app for a clothing retailer

Fully responsive React application styled using `styled-components`. Tested using `jest` and `react-test-renderer` for unit tests and `cypress` for end-to-end (integration) tests.

[Click to see a 1 min demo →](https://youtu.be/-nI2VIfAg2A)

[![Maintainability](https://api.codeclimate.com/v1/badges/e7f6f36584af602f5274/maintainability)](https://codeclimate.com/github/nkhil/clothing-retail-react-app/maintainability)

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

[![screen3.jpg](https://i.postimg.cc/vDRVS1pJ/screen3.jpg)](https://postimg.cc/MfDHnGZ5)

## Project setup

Steps to setup and run the project locally:

- Clone or fork this repo with `git clone https://github.com/nkhil/clothing-retail-react-app.git`
- Go into the application root with `cd clothing-retail-react-app`
- To install dependencies, type `npm install`
- To start the server, type `npm run start`
- Visit `http://localhost:1234/` in any modern browser to see the app in action (hot reloading is enabled)

## Tests setup

This project uses `jest` along with `react-test-renderer` for unit testing and `cypress` for end-to-end (integration) testing.

**Unit tests:**

- From the application root, run `npm run test`. This will start the test suite in `watchAll` mode by default
- To update the Jest snapshots, run `npm run updatesnapshot`

**Feature (integration) tests:**

- From the application root, run `npm run cypress`. This will open up the Cypress runner - Click on `run all specs` (alternatively, click on a test to run a specific test)

## Libraries / Frameworks used

- Built using **React.js** from scratch (_not_ create-react-app)
- Unit tested using **Jest** (along with **React test renderer**)
- End-to-end testing (integration testing) using **Cypress**
- **Parcel** is used as the bundler (and for the development server)

## User stories

The application satisfies all of the user stories below.

```
As a user
I can add a product to my shopping cart

As a user
I can remove a product from my shoping cart

As a user
I can view the total price for the products in my shopping cart

As a user
I can apply a voucher to my shopping cart

As a user
I can view the total price for the products in my shopping cart with discounts applied

As a user
I'm alerted when I apply an invalid voucher to my shopping cart

As a user
I'm unable to add out of stock products to the shopping cart
```

# Approach

## Testing

[![Screen-Shot-2019-04-14-at-22-55-29.png](https://i.postimg.cc/QxkDSh6B/Screen-Shot-2019-04-14-at-22-55-29.png)](https://postimg.cc/QHtvdGZs)

[![Screen-Shot-2019-04-14-at-22-54-41.png](https://i.postimg.cc/13mQj2Tv/Screen-Shot-2019-04-14-at-22-54-41.png)](https://postimg.cc/XpzmZHn5)

- All the `render()` methods are tested using snapshot testing to detect undesirable changes as the app is developed
- All the functions elements (business logic) are tested for behaviour using assertions
- Integration tests test the functionality of the aplication from the user's perspective (for eg: `App doesn't allow adding a product once the inventory is exhausted`)

**Note:**

As mock data is being used, the tests depend on the state of the data (for eg: a test might depend on `product1`'s price in order to pass the assertion). This is not ideal. When a development database is used, it's much easier to use mock data, and delete all data in order to control all variables and test as close to a real-world scenario.

## Application architecture

As I'm using React, the application follows the [Flux application architecture](https://facebook.github.io/flux/) where data flow is unidirectional, i.e. the `App` component retains aplication state, business logic and also is responsible for rendering the related components.

State and logic (functions) are passed into other components as props.

Below is an illustrated example where the `ProductItem` component receives it's state directly from `App`. When the `Add to cart` button is clicked on the `ProductItem` component, it calls the `addToCart()` function that then causes the App's `shoppingCart` state to change.

[![Untitled-1.jpg](https://i.postimg.cc/2SScDyys/Untitled-1.jpg)](https://postimg.cc/jLBQ6szc)

## Application functionality

Quick runthrough of the application functionality:

#### On Application load

When the application is first loaded, the `componentWillMount()` method is used to import products and discountVouchers from the `App/mocks` directory and set it to state.

**Here's what the application state looks like on start (In React's dev tools):**

[![Screen-Shot-2019-04-14-at-23-28-19.png](https://i.postimg.cc/52DTBrw7/Screen-Shot-2019-04-14-at-23-28-19.png)](https://postimg.cc/3kCt7nfm)

#### Displaying products on the page

The `<ProductList />` component with nested `<ProductItem />` components (for each product item) is used to render all the products in state to view layer.

In order to present the prices, the `formatPrice()` helper method (from `App/helpers`) is used.

Each `<ProductItem />` component displays an `add to cart` button.

#### Adding products to shopping cart

When the 'Add to cart' button is clicked on, it fires the `addToCart()` function that adds the product's key, along with a number to `<App />`'s state.

Adding a product to the shopping cart also fires the `modifyProductInventory()` function that's used to decrease the `productQuantity` property by one.

**Here's what adding products into the shopping cart looks like in React's dev tools**

[![Apr-15-2019-00-24-00.gif](https://i.postimg.cc/FRDHHSqQ/Apr-15-2019-00-24-00.gif)](https://postimg.cc/ftSNHVDH)

### Adding voucher codes

When a user enters a voucher code and clicks 'apply', here's the sequence of events that takes place:

- `applyVoucherCode()` is called
- As a result, `voucherCodeIsValid(voucherCode)` is called to check:
  - if the code exists in state
  - if it meets the minimum spend
  - if it's a special code (for eg: the 15% off code that requires a purchase of at least 1 footwear item), it calls the necessary function (`_shoppingCartContainsFootwear()` in this case)
  - it then returns true or false if the conditions are met
- If `voucherCodeIsValid()` returns true, `setActiveVoucherCode()` is called, which sets the (valid) code into the application's state under `activeVoucherCode`
- If `voucherCodeIsValid()` returns false, it calls the javaScript `Alert` function that displays an alert to the user.

**Here's a quick screen grab of the state change**
[![Apr-14-2019-23-51-06.gif](https://i.postimg.cc/7hGwPzDb/Apr-14-2019-23-51-06.gif)](https://postimg.cc/YLHJbhvw)

You can see [the application respond with an alert in this short 1 min video](https://youtu.be/-nI2VIfAg2A)

### Displaying the total price

The application uses a `calculateDiscountedTotal()` function that

- Checks for the presence of `activeDiscountCode` in state.
- If there is an active voucher code, it retrieves the discount amount from the voucher object (more about the voucher object data structure below)
- it then uses the `_calculateTotal()` function to get the total price (without the discount), deducts the discount amount and returns the total discounted price.
- If there isn't an active voucher, it directly returns the total price (using `_calculateTotal()`)

### Not letting users add out of stock items into the shopping cart

In the `render()` method for the `<ProductItem/>` component, the `isAvailable` variable returns true if the product quantity is above 0 and false if not. This is used to deactivate the `Add to cart` button and change the text to `Sold out!`.

**Here's a quick screen grab**

[![Apr-15-2019-00-08-03.gif](https://i.postimg.cc/y8v92J12/Apr-15-2019-00-08-03.gif)](https://postimg.cc/K13RM8g5)

### Putting items from the shopping cart back into products

The `Remove` button on basket items calls `modifyProductInventory()` which will decrease the number of items (if basket contains more than one of any type), or delete the item from the basket if there's only one of it.

[![Apr-15-2019-00-16-40.gif](https://i.postimg.cc/K8DSb2w6/Apr-15-2019-00-16-40.gif)](https://postimg.cc/fVyg76wC)

## Commit message philosophy

I've followed the [Atomic commit message](https://seesparkbox.com/foundry/atomic_commits_with_git) strategy to keep my commits to one feature, fix or improvement.

I've also used [Gitmoji](https://gitmoji.carloscuesta.me/) to select few commits (for eg: new features or new dependencies) to keep them distinct and easily recognisable.

## Git branching approach

I worked on the master branch to create a working `hello world` react app that loads mock product data (supplied in the requirements) into the application state (`App.state.products`).

Following that, all work is carried out on the `dev` branch, and every feature was developed on its own branch followed by a pull request to merge into `dev` and subsequently into `master`. Once merged, branches are deleted.

## Styling

- This project uses `globalStyles` included in the `styled-components` package
- To make the application responsive, flexbox containers and `@media` queries are used

**Note:** Aside from the responsiveness, the styling is purposefully minimal to allow the client to test the prototype. I'm aware that this styling will need to be discarded in the next stages, and hence only a minimal amount of time was spent on it once all the user stories had been developed.

## Product Prices

Product prices are stored as integers (in pennies) for to avoif floating point errors. A helper method (`formatPrice` in `App/helpers.js`) is used to convert the integer into a string for presentation purposes. As this wasn't explicitly stated, product prices are rendered like so:

```
£30.50 / £30.00 / £1.00
```

## Displaying available products & shopping cart on the same route

The requirements mention to `display all of the available products, as well as a shopping cart`.

I assumed that it means that the user should see both components at the same time so that adding an item to the shopping cart will instantly update the shopping cart that's visible on the page.

**Note:**

In a real world scenario, I would put this as a question to the client which wasn't a possibility in this case. However, as I'm using react, changing this functionality to have a simple link to the shopping cart and display the shopping cart on another route (for eg: `/shopping-cart`) will be trivial as I have separated out the shopping cart into its own component.

## Using mock data

Mock data (stored in `./App/mocks`) is used in place of a database.

### Products

The application uses product data that's stored locally in a flat file (as suggested in the requirements). The supplied mock products are loaded into the application's state when the `componentWillMount()` lifecycle method is fired.

**Products data structure**

```javascript
product4: {
    productName: "Flip Flops, Red",
    productCategory: "Men's Footwear",
    productPrice: 1900,
    productQuantity: 6,
  },
  product5: {
    productName: "Flip Flops, Blue",
    productCategory: "Men's Footwear",
    productPrice: 1900,
    productQuantity: 0,
  },
  product6: {
    productName: "Gold Button Cardigan, Black",
    productCategory: "Women’s Casualwear",
    productPrice: 16700,
    productQuantity: 6,
  }
```

### Vouchers

Similar to products, the application uses vouchers stored locally in a flat file.

The discount voucher is an array of objects (see `voucherCodes` below)

```javascript
const five = {
  code: "FIVEOFF",
  discountAmount: 500,
  minimumSpend: 0,
}
const ten = {
  code: "TENOFF",
  discountAmount: 1000,
  minimumSpend: 5000,
}
const fifteen = {
  code: "FIFTEENOFF",
  discountAmount: 1500,
  minimumSpend: 7500,
}

const voucherCodes = [five, ten, fifteen]
```

_Note that the `discountAmount` property expects data in the form of pennies (same as products)._

### Approach to developing the discount voucher feature

As the discount codes include a fair amount of logic (for eg: `15% off with a minimum spend of £75 and at least 1 item of footwear purchased`), I have added a `minimumSpend` property to the discount voucher's data structure (as can be seen above).

With the given discount codes, there was one outlier (15% off) that needs to satisfy an additional condition to be valid (i.e. at least 1 item of footwear purchased). Given the time constraint, I have created private methods ( `_checkFifteenOffCriteria` & `_shoppingCartContainsFootwear`) to satisfy the current requirement.

In the future, If new discount codes are added or amended often, this can be added as an advanced feature with more thought out business logic.

## Adding items to shopping cart

Instead of putting the entire product into the shopping cart, I have opted for the approach of adding the product's key as the basket item's key, and the quantity as the value.

**Here's what it looks like when the shopping cart has items in it**

```javascript
shoppingCart = {
  product1: 2,
  product2: 1,
}
```

I believe this approach (adding a reference instead of the entire object) is more efficient than adding the entire product into the basket.

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

Private methods throughout this project are denoted with a `_` before the function name (for eg: `_getDiscountObject`). Private methods are not to be called by other components or passed as props.

## ESLint

This project uses ESLint as a linter to make sure my confirms to standards.

## Prettier

This project uses Prettier, a code formatter to ensure my code is formatted correctly.

## CodeClimate

This project also uses code climate to make sure it is maintainable, and any inefficiencies are picked up by automated processes.
