# DJ Mix Assist

Generate mix-points, take color and beat fx recommendations, and mix "on the fly".

## Local / Development Configuration

This uses the Spotify API to find tracks, so you'll need a Spotify Developer account and application.
Build that on [Spotify for Developers](developer.spotify.com).
Store your credentials locally in src/.env.local, such that they are NOT committed to git.

`REACT_APP_SPOTIFY_CLIENT_ID=`
`REACT_APP_SPOTIFY_CLIENT_SECRET=`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
