# Weather App

This app will allow you to input a location, a day of the week, and a time of day, and the weather for the last year up to the next week will display.

## App URL

The app can be tested at:

## Quickstart

> [!NOTE]
> Note: I'm using `pnpm`, but you can use `npm` or `yarn`.

From the project root:

```
pnpm install
```

Then start the mock server:

```
pnpm run dev:server
```

Then start the app:

```
pnpm run dev
```

## Tests

Tests can be run with:

```
pnpm run test
```

The tests cover:

- Querying the Geocode API for a list of location search results
- Querying the Weather API for weather conditions at a location and time
