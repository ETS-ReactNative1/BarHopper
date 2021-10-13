# BarHopper

Capstone Project

## Setup Locally

### If this is your first time running the application:

Install the Expo CLI
`yarn global add expo-cli`

Install Dependecies
`yarn install`

Start the App
`yarn start`
The Expo dev tools will open in a browser tab. From there you can select `Run on an iOS simulator` to view how the application will look on an iPhone or `Run in web browser` to use chrome devtools

## Push API changes

### If this is your first time using amplify

Install the Amplify CLI
`npm install -g @aws-amplify/cli`

Connect to the backend enviornment
`amplify pull --appId d2gr1iwano51nd --envName dev`

### Modifying the API

Modify the HTTP methods in BarHopper/amplify/backend/function/bars/src/app.js

Push changes to the cloud by running `amplify push -y`

Make calls to the API endpoint at `https://vunj8zm0d7.execute-api.us-east-1.amazonaws.com/dev` and pass your AccessKey and SecretKey in the request header
