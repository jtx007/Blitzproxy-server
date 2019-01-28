const express = require('express')
const cors = require('cors');
const app = express()
const port = 9000
const request = require('request')
let key = "DywaJ3sUfGtSlqpJjvBeWowbhLF3ybVm"
let latLngCoords
app.use(cors());

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// const request = require('request')
// request('https://api.darksky.net/forecast/221948f2de097d880248f8277c7ef0ae/40.730610,-73.935242', function (error, response, body) {
//     console.log('error:', error);//Print error if applicable
//     console.log('statuscode:', response && response.statusCode); //Print the response status code if a response was received
//     console.log('body:', body);
//     app.get('/', (req, res) => res.send(body))


// })

app.get('/', (req, res) => {
    console.log(req.query)
    const location = req.query.location
    // Use Geocoder Api
    
    let geoCoderRequest = request(`http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${location}
`, function (error, response, body) {
        if (error) {
            res.render('error', {error})
        }
        let jsonResponseObject = JSON.parse(body)
        latLngCoords = (jsonResponseObject.results[0].locations[0].latLng)
        request(`https://api.darksky.net/forecast/221948f2de097d880248f8277c7ef0ae/${latLngCoords.lat},${latLngCoords.lng}`, function (error, response, body) {
            console.log('error:', error);//Print error if applicable
            console.log('statuscode:', response && response.statusCode); //Print the response status code if a response was received
            console.log('body:', body);
            res.send(body)
    })
    })
})
