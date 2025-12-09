# DJ Mix Assist

Generate mix-points, take color and beat fx recommendations, and mix "on the fly".

## Local / Development Configuration

This uses the Spotify API to find tracks, so you'll need a Spotify Developer account and application.
Build that on [Spotify for Developers](developer.spotify.com).
Store your credentials locally in src/.env.local, such that they are NOT committed to git.

`REACT_APP_SPOTIFY_CLIENT_ID=`
`REACT_APP_SPOTIFY_CLIENT_SECRET=`

## Available Scripts

We've abstracted commands into a Makefile, so that parameters can be introduced later.

For now, in the project directory, you can run:

### `make quick` or `make run` (or `npm run`)

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `make test` (or `npm test`)

Launches the test runner in the interactive watch mode.\

### `make build` (or `npm run build`)

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
