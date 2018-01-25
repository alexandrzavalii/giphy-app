# Coding Exercise for Swrve

The application should include the following features:
  ● A control to show latest Cats or Dog results (no search field needed).
  ● Results view with paging of 25 GIFs per page.
  ● A detail view which shows the selected GIF when clicked/hovered/interacted with.


### Prerequisites

Node v6.5.0^

### Installing

To start the project please:
* 1. "cd" into the project
* 2. "yarn install" or "npm install"
* 3. "yarn start" or "npm start"

## Running the tests

1. "yarn test" or "npm test"
2. "a" meaning all the tests


## Deployment

*  The app is deployed on Heroku: "https://buildit-weather-app.herokuapp.com/"
*  Instructions: https://gist.github.com/mars/5e01bb2a074594b44870cb087f54fe2f

## Approach

The structure of the project was defined by its complexity. Since the project was relatively simple, it contains only one container, with most of the logic.
I decided to avoid Redux, because It has only few components and only one nested component with not many states to controll. 
To improve performance the nested, detailed view is a Pure Component which rerenders only if the state has changed.
The tests are placed next to the corresponding components, making it eas

## Highlights

* 1. Use latest React and ES6+ features
* 2. Being Able to add more cateogires
* 3. Reusable components
* 4. The performance of the app
* 4. Styling of the app with theming


## Implementation Plan

1. Implement Redux and Redux-observable. 
2. Improve Test Coverage.
3. Work on design.

## Authors

* **Alexandr Zavalii** - [alexandrzavalii](https://github.com/alexandrzavalii)
 


use redux
write more tests



 include a custom readme that details your approach, highlights things you're happy with and any corners you decided to cut for time reasons