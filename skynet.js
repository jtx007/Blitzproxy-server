const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors());

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const request = require('request')
request('https://api.darksky.net/forecast/221948f2de097d880248f8277c7ef0ae/37.8267,-122.4233', function(error, response, body){
    console.log('error:', error);//Print error if applicable
    console.log('statuscode:', response && response.statusCode); //Print the response status code if a response was received
    console.log('body:', body);
    app.get('/', (req, res) => res.send(body))


})