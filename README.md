# FEND Neighborhood Project

## Description
This project uses the Google Maps and Wikipedia APIs to provide a map with markers about some destinations in Houston, Texas (where I currently live). The app was bootstrapped with ```create-react-app```. The service worker will only function if the production version is loaded. See below for details on how to run the production version.

## Code Dependencies
- Bootstrap4 CDN and associated JavaScripts (Can be found here: https://getbootstrap.com/docs/4.0/getting-started/introduction/)
- React
- Node JS and Node Package Manager (NPM)
- Node Packages:
  - 'escape-string-regexp'
  - 'react-async-script-loader'
  - 'fetch-jsonp'

## How to run
- Download or clone this repository to your local machine
- Navigate to the directory and from the command line type ```npm install```
- To run ```development mode```, type ```npm start``` to run the app. A browser window will open at address ```localhost:3000```
- To run a production build, type ```npm run build``` followed by ```serve -s build```. The app will be viewable at ```localhost:5000```.