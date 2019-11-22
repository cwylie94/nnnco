var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var proxy = require('express-http-proxy');

app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use('/emails', proxy('https://tt-email-gateway.nnnco.io/v1/api/'));
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);
