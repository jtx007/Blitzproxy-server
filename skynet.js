require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000
const request = require('request')

let latLngCoords
app.use(cors());




app.listen(port, () => console.log(`Weather app spinning up, send request from frontend to port ${port}`))



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
