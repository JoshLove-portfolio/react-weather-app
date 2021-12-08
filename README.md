# Simple Weather App

## Getting Started

Start by either downloading this project or forking it. Then, change directories into the location on your local machine. 

Open a terminal and run the following to install dependencies:

### `npm install`

You can then run the development server with:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

ReactJS development server supports hot-reload so if you make any changes, they will automatically populate in the browser.

## Usage

Once the development server is running and you've navigated to [http://localhost:3000](http://localhost:3000), you can enter your zip code and hit submit. 

## Understanding

Upon submitting a Zip Code, the application makes a request to USGS to convert the zipcode to latitude/longitude data. That data is then sent off to 7timer for a simple 7-day weather forecast which is then displayed in the cards. 

## Caution

The provided services here utilize public APIs without keys. Please be respectful of these free services and don't abuse these privileges. Functionality of the app is subject to change at any time if the underlying APIs change. 

## Attributions

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). \
Zip Code data provided by [USGS](https://webapps.usgs.gov/) \
Weather data provided by [7timer](http://www.7timer.info/index.php?lang=en) \
Icons provided by [Icons8](https://icons8.com/icon/set/weather/ios--animated)
