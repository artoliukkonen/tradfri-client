# Trådfri Client

## Configuration

1. Copy `.env.example` as `.env` and replace API URL
2. Change client bucket name in `serverless.yml`
3. Edit `src/config.js` with your bulb & plug IDs

You can get the ID's from API by calling `/list` endpoint.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn deploy`

Build & deploy UI to AWS S3 & CloudFront. See `serverless.yml` for configurable variables.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn test`

YOLO who needs tests.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
