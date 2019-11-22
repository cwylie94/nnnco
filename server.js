var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var axios = require('axios');

app = express();
app.use(express.json());

app.post('/emails', (req, res) => {
  axios.post('https://tt-email-gateway.nnnco.io/v1/api/emails', req.body)
  .then(response => {
    res.json(response.data);
  })
  .catch(error => {
    console.log("Error");
    res.sendStatus(error.status);
  });
});

app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);
