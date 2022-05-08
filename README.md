# wikipedia-top-pageviews

Displays a list of the most viewed Wikipedia articles, sourced from the [Wikimedia Pageviews API](https://wikitech.wikimedia.org/wiki/Analytics/AQS/Pageviews). Allows for filtering by date and country.

Live demo: [https://popular-on-wikipedia.herokuapp.com/](https://popular-on-wikipedia.herokuapp.com/)

_(**Notes**: Heroku takes some time to load. Requests to Wikipedia's API may be blocked on certain browsers, or by browser ad blockers; this will prevent the app from loading results.)_

## Running the app
#### Install dependencies:
```
npm install
```

#### Build and run locally:
```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view app in development mode.

## Running tests
#### Run all tests (React Testing Library / Jest):
```
npm test
```

#### Run all tests (React Testing Library / Jest) in watch mode:
```
npm run test-watch
```

#### Run all end-to-end tests (Cypress):
```
npm run cypress
```

Ensure that `npm start` is running, so that tests can interact with the app that's running locally.

## About
### Technologies used
- React, TypeScript
- @testing-library, Jest, Cypress
- [react-datepicker](https://reactdatepicker.com/)