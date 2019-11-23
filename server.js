var express = require("express");
var serveStatic = require("serve-static");
var axios = require("axios");

var app = express();
app.use(express.json());

app.post("/emails", (req, res) => {
  axios
    .post("https://tt-email-gateway.nnnco.io/v1/api/emails", req.body)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.send(error);
    });
});

app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
app.listen(port);
