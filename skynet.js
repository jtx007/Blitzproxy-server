require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000
const request = require('request')

let latLngCoords
conf = {
  // look for PORT environment variable,
  // else look for CLI argument,
  // else use hard coded value for port 8080
  port: process.env.PORT || process.argv[2] || 8080,

  // origin undefined handler
  // see https://github.com/expressjs/cors/issues/71
  originUndefined: function (req, res, next) {
    if (!req.headers.origin) {
      res.json({
        mess:
          "Hi you are visiting the service locally. If this was a CORS the origin header should not be undefined",
      });
    } else {
      next();
    }
  },

  // Cross Origin Resource Sharing Options
  cors: {
    // origin handler
    origin: function (origin, cb) {
      // setup a white list
      let wl = ["https://blitzweatherapp.herokuapp.com/"];

      if (wl.indexOf(origin) != -1) {
        cb(null, true);
      } else {
        cb(new Error("invalid origin: " + origin), false);
      }
    },

    optionsSuccessStatus: 200,
  },
};

app.use(conf.originUndefined, cors(conf.cors));


app.listen(port, () => console.log('Weather app spinning up, send request from frontend'))



app.get('/', (req, res) => {
    console.log(req.query)
    const location = req.query.location
    // Use Geocoder Api
    
    let geoCoderRequest = request(`http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAP_QUEST_KEY}&location=${location}
`, function (error, response, body) {
        if (error) {
            res.render('error', {error})
        }
        
        let jsonResponseObject = JSON.parse(body)
        latLngCoords = (jsonResponseObject.results[0].locations[0].latLng)
        // Send coordinates to dark sky api
        request(`https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${latLngCoords.lat},${latLngCoords.lng}`, function (error, response, body) {
            console.log('error:', error);//Print error if applicable
            console.log('statuscode:', response && response.statusCode); //Print the response status code if a response was received
            console.log('body:', body);
            res.send(body)
    })
    })
})
