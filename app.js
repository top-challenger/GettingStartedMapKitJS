const express = require('express')
const app = express()
var jwt = require('jsonwebtoken');
var fs = require('fs');

const PORT = 3000

app.use(express.static('public'))

app.get('/',(req,res) => {
  res.sendFile('/index.html')
})

app.get('/services/jwt',(req,res) => {

  const header = {
    "alg": "ES256",
    "typ": "JWT",
    "kid": "yourmapjsidhere"
  }

  const payload = {
    "iss": "yourteamidhere",
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
