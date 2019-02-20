# skynetserver
Proxy-server created for Blitz-weather-app using Node and Express
It is designed so that query params sent from a frontend can be reeived and converted into lat/longitiude coordinates to pinpoint accurate and detailed weather data for that specific location

## Pre-requisites
You will need Node installed locally on your machine to run this server.  I'm using Node version 11.4.0 so that's what I would reccomend.
You will also MIGHT need to change some of the links and URLs to work locally on your machine depending on your enviornemnt/preference
You will also need two API keys in order for the server to work as intended
* DarkSkyApi (used to get relevant weather data from DarkSky via lat/long coordinates)
* MapQuest geocoder or Google geocoder API (used to convert plain text locations received from query params received from frontend into lat/lng coordinates to be plugged into the DarkSkyAPI

## Installation and Setup 
After cloning and making sure that you have the pre-requisities intact:
<b>npm install</b>
Then to spin up the new instance of the proxy-server
<b>node skynet.js</b>
