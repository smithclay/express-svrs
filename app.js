var express = require('express');
var app = express();
var xrayExpress = require('aws-xray-sdk-express');

app.use(xrayExpress.openSegment('defaultName'));

app.get('/', function(req, res) {
  res.send({
    "Output": "Hello World!"
  });
});

app.get('/error', function(req, res) {
  res.status(500).send('Something broke!');
});

app.get('/exception', function(req, res) {
  throw new Error('This is an exception');
});

app.post('/', function(req, res) {
  res.send({
    "Output": "Hello World!"
  });
});

app.use(xrayExpress.closeSegment());

// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
