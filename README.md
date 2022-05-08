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

#### Run all tests in watch mode:
```
npm test
```

This project focuses on integration testing to verify core functionality.

## About

### Technologies used
- React, TypeScript
- @testing-library, jest
- [react-datepicker](https://reactdatepicker.com/)