
"use strict";

const _ = require('lodash');
var request = require('request');
var uniqid = require('uniqid');
const config = require('./config.json');
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var Mailchimp = require('mailchimp-api-v3')

// module variables
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

app.get('/mailchimp', function(req, res) {
    // Add your code here
    res.json({success: 'Mailchimp API...', url: req.url});
});

app.post('/mailchimp', async function(req, res) {
    mailchimp.post('/lists/13d96a2e21/members', {
        email_address : 'touqeerhassan17631@gmail.com',
        merge_fields: {
        "FNAME": "Touqeer",
        "LNAME": "Hassan"
        },
        status : 'subscribed'
    })
    .then(function(results) {
        console.log('success')
    })
    .catch(function (err) {
        console.log('failure',err)
    })
    
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app