/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const AWS = require("aws-sdk");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var bodyParser = require("body-parser");
var express = require("express");
const bars = require("./barData");

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "BarTable";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "id";
const partitionKeyType = "S";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/bars";
const UNAUTH = "UNAUTH";
const hashKeyPath = "/:" + partitionKeyName;
const sortKeyPath = hasSortKey ? "/:" + sortKeyName : "";

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch (type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
};

/**********************
 * GET bar methods *
 **********************/

app.get("/bars", function (req, res) {
  //TODO: Add Error Handling
  if (!req.query.lat || !req.query.long || !req.query.radius) {
    res.json({ error: "invalid paramters" });
  }

  let axios = require("axios");

  let config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat}%2C${req.query.long}&radius=${req.query.radius}&type=bar&key=${process.env.GOOGLE_API_KEY}`,
    headers: {},
  };

  axios(config)
    .then(function (response) {
      let results = [];

      response.data.results.forEach((bar) => {
        let newBar = {
          name: bar["name"],
          location: "bar.geometry.location",
          address: bar["formatted_address"],
          phone_number: bar["formatted_phone_number"],
          open_time: bar["opening_hours"],
          vaccination_protocols: "show a vaccination card",
        };
        results.push(newBar);
        // if uuid is in the table
        // add attributes to current object
      });

      res.json(results);
    })
    .catch(function (error) {
      res.json({ error });
    });
});

// app.get("*", function (req, res) {
//   res.json({ success: "* route", url: req.url });
// });

app.get("/bars/:id", function (req, res) {
  //TODO: Add error handling

  let axios = require("axios");

  let config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.id}&key=${process.env.GOOGLE_API_KEY}`,
    headers: {},
  };

  axios(config)
    .then(function (response) {
      let result = {
        name: response.data.result["name"],
        // location: response.data.results["geometry"]["location"],
        address: response.data.result["formatted_address"],
        phone_number: response.data.result["formatted_phone_number"],
        open_time: response.data.result["opening_hours"]["periods"],
        vaccination_protocols: "show a vaccination card",
      };

      // 2021-11-13T15:11:22.150Z	3f22edb9-3590-447f-acb1-f05f4414290c	INFO	Failure User: arn:aws:sts::590272945317:assumed-role/barhopperLambdaRoleb90956d9-dev/bars-dev is not authorized to perform: dynamodb:GetItem on resource: arn:aws:dynamodb:us-east-1:590272945317:table/BAR_TABLE

      // (async () => {
      //   const data = await bars.getBar(req.params.id);
      //   res.json(data);
      //   if (data) {
      //     result[vibe] = data.Item.vibe.SS;
      //     result[line_attributes] = data.Item.line_attributes.SS;
      //     result[music_playing] = data.Item.music_playing.SS;
      //   } else {
      //     result[vibe] = [];
      //     result[line_attributes] = [];
      //     result[music_playing] = [];
      //   }
      // })();

      // res.json(result);
    })
    .catch(function (error) {
      res.json({ error });
    });
});

// /****************************
//  * POST bars method *
//  ****************************/

app.post("/bars/:id", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

// /****************************
//  * PUT bars methods *
//  ****************************/

app.put("/items/:id", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

// /****************************
//  * DELETE bars method *
//  ****************************/

app.delete("/items/:id", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
