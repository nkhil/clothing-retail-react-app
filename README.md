# Responsive website for clothing retailer

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

[![Maintainability](https://api.codeclimate.com/v1/badges/e7f6f36584af602f5274/maintainability)](https://codeclimate.com/github/nkhil/clothing-retail-react-app/maintainability)

## Project setup

Follow these steps to setup and run this project locally:

- Clone or fork this repo with `git clone <repository name>`

## Technologies used

- Built using React.js from scratch (i.e. not create react app)
- Tested using `jest` along with `react-test-renderer`
- `parcel` for development server and build

# Approach

## Commit messages

I've followed the [Atomic commit message](https://seesparkbox.com/foundry/atomic_commits_with_git) strategy to keep my commits to one feature, fix or improvement.

I've also used [Gitmoji](https://gitmoji.carloscuesta.me/) to select few commits (for eg: new features or new dependencies) to keep them distinct and easily recognisable.

## Styling

- As styling was not a requirement, I've kept the styling to a minimum
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

As suggested in the requirements, I'm using product data that's stored locally in a flat file (rather than creating a database) and importing this into the application in the `componentWillMount()` lifecycle method provided by React.

Every time the app loads up, the data is imported into state.

**Note:**

I have followed this approach as it means minimal changes to the code once a database is introduced.
