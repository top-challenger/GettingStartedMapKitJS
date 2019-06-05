const dotenv = require('dotenv');
const express = require('express')
var jwt = require('jsonwebtoken');
var fs = require('fs');

dotenv.config()
const app = express()

app.use(express.static('public'))

const {
  APPLE_TEAM_ID,
  MAPKIT_KEY_ID,
  PORT,
} = process.env

app.get('/',(req,res) => {
  res.sendFile('/index.html')
})

app.get('/services/jwt',(req,res) => {

  const header = {
    "alg": "ES256",
    "typ": "JWT",
    "kid": MAPKIT_KEY_ID
  }

  const payload = {
    "iss": APPLE_TEAM_ID,
    "iat": Date.now() / 1000,
    "exp": (Date.now() / 1000) + 15778800,
  }

  var cert = fs.readFileSync('./private.p8'); // private key that you downloaded
  var token = jwt.sign(payload,cert, { header: header } );
  res.json({token: token})
})

app.listen(PORT,(req,res) => {
  console.log("Server has started...")
})
