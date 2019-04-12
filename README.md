# Responsive website for clothing retailer

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

[![Maintainability](https://api.codeclimate.com/v1/badges/e7f6f36584af602f5274/maintainability)](https://codeclimate.com/github/nkhil/clothing-retail-react-app/maintainability)

## Project setup

Follow these steps to setup and run this project locally:

- Clone or fork this repo with `git clone <repository name>`

## Technologies used

- Built using React.js from scratch (i.e. not create react app)
- Tested using `Jest` along with `React-test-renderer`
- Parcel for development server and build

## Atomic commit messages

I've followed the [Atomic commit message](https://seesparkbox.com/foundry/atomic_commits_with_git) strategy to keep my commits to one feature, fix or improvement.

I've also used [Gitmoji](https://gitmoji.carloscuesta.me/) to select few commits (for eg: new features or new dependencies) to keep them distinct and easily recognisable.

## Approach

**Product Prices**
Product prices are stored as integers (in pennies) for maximum accuracy. A helper method (`formatPrice` in `App/helpers.js`) is used to convert the integer into a string to present the it to users.
