'use strict';

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const server = awsServerlessExpress.createServer(app);

const AWSXRay = require('aws-xray-sdk');
AWSXRay.captureAWS(require('aws-sdk'));
AWSXRay.captureHTTPsGlobal(require('http'));

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
