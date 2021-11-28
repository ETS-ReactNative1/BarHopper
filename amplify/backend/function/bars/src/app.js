const AWS = require("aws-sdk");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var bodyParser = require("body-parser");
var express = require("express");
const verify = require("./util");

AWS.config.update({
  region: "us-east-1", // replace with your region in AWS account
});

// const DynamoDB = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

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
          _id: bar["place_id"],
          name: bar["name"],
          rating: bar["rating"],
          location: bar["geometry"]["location"],
          icon: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${bar.photos[0].photo_reference}&sensor=false&maxheight=${bar.photos[0].height}&maxwidth=${bar.photos[0].width}&key=${process.env.GOOGLE_API_KEY}`,
          address: bar["formatted_address"],
          phone_number: bar["formatted_phone_number"],
          open_time: bar["opening_hours"],
          vaccination_protocols: "show a vaccination card",
        };
        results.push(newBar);
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
  verify.str(req.params.id);

  let axios = require("axios");

  let config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.id}&key=${process.env.GOOGLE_API_KEY}`,
    headers: {},
  };

  axios(config)
    .then(function (response) {
      const params = {
        TableName: "BAR_TABLE",
        Key: {
          uuid: req.params.id,
        },
      };

      async function getItem() {
        try {
          const data = await docClient.get(params).promise();
          return data;
        } catch (err) {
          return err;
        }
      }

      getItem()
        .then((data) => {
          let result = {
            name: response.data.result?.name,
            rating: response.data.result?.rating,
            location: response.data.result?.geometry.location,
            address: response.data.result?.formatted_address,
            phone_number: response.data.result?.formatted_phone_number,
            open_time: response.data.result.opening_hours?.periods,
            vaccination_protocols: "show a vaccination card",
          };

          result["vibe"] = data.Item?.vibe;
          result["line_attribute"] = data.Item?.line_attribute;
          result["music_playing"] = data.Item?.music_playing;

          return res.json(result);
        })
        .catch((error) => {
          let result = {
            name: response.data.result?.name,
            rating: response.data.result?.rating,
            location: response.data.result?.geometry.location,
            address: response.data.result?.formatted_address,
            phone_number: response.data.result?.formatted_phone_number,
            open_time: response.data.result.opening_hours?.periods,
            vaccination_protocols: "show a vaccination card",
          };

          return res.json(result);
        });
    })
    .catch(function (error) {
      return res.json({ error });
    });
});

// /****************************
//  * POST bars method *
//  ****************************/

app.post("/bars/:id", function (req, res) {
  verify.str(req.params.id);

  let line_attribute_list =
    req.query.line_attribute && verify.str(req.query.line_attribute)
      ? [req.query.line_attribute]
      : [];
  let music_playing_list =
    req.query.music_playing && verify.str(req.query.music_playing)
      ? [req.query.music_playing]
      : [];
  let vibe_list =
    req.query.vibe && verify.str(req.query.vibe) ? [req.query.vibe] : [];

  const params = {
    TableName: "BAR_TABLE",

    Item: {
      uuid: req.params.id,
      line_attribute: line_attribute_list,
      music_playing: music_playing_list,
      vibe: vibe_list,
    },
    ReturnValues: "ALL_OLD",
  };

  async function createItem() {
    try {
      await docClient.put(params).promise();
    } catch (err) {
      return err;
    }
  }

  createItem()
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      return res.json(JSON.stringify(error));
    });
});

// /****************************
//  * PUT bars methods *
//  ****************************/

app.put("/bars/:id", function (req, res) {
  verify.str(req.params.id);

  const get_params = {
    TableName: "BAR_TABLE",
    Key: {
      uuid: req.params.id,
    },
  };

  async function getItem() {
    try {
      const data = await docClient.get(get_params).promise();
      return data;
    } catch (err) {
      return err;
    }
  }

  //fetch existing attributes from db
  getItem()
    .then((data) => {
      let line_attribute_list =
        req.query.line_attribute && verify.str(req.query.line_attribute)
          ? data.Item?.vibe
          : [];

      line_attribute_list.push(req.query.line_attribute);

      let music_playing_list =
        req.query.music_playing && verify.str(req.query.music_playing)
          ? data.Item?.music_playing
          : [];

      music_playing_list.push(req.query.music_playing);

      let vibe_list =
        req.query.vibe && verify.str(req.query.vibe) ? data.Item?.vibe : [];

      vibe_list.push(req.query.vibe);

      const params = {
        TableName: "BAR_TABLE",

        Item: {
          uuid: req.params.id,
          line_attribute: line_attribute_list,
          music_playing: music_playing_list,
          vibe: vibe_list,
        },
        ReturnValues: "ALL_OLD",
      };

      async function createItem() {
        try {
          await docClient.put(params).promise();
        } catch (err) {
          return err;
        }
      }

      createItem()
        .then((result) => {
          return res.json(result);
        })
        .catch((error) => {
          return res.json(JSON.stringify(error));
        });
    })
    .catch((error) => {
      //item not in db
      let line_attribute_list =
        req.query.line_attribute && verify.str(req.query.line_attribute)
          ? [req.query.line_attribute]
          : [];
      let music_playing_list =
        req.query.music_playing && verify.str(req.query.music_playing)
          ? [req.query.music_playing]
          : [];
      let vibe_list =
        req.query.vibe && verify.str(req.query.vibe) ? [req.query.vibe] : [];

      const params = {
        TableName: "BAR_TABLE",

        Item: {
          uuid: req.params.id,
          line_attribute: line_attribute_list,
          music_playing: music_playing_list,
          vibe: vibe_list,
        },
        ReturnValues: "ALL_OLD",
      };

      async function createItem() {
        try {
          await docClient.put(params).promise();
        } catch (err) {
          return err;
        }
      }

      createItem()
        .then((result) => {
          return res.json(result);
        })
        .catch((error) => {
          return res.json(JSON.stringify(error));
        });
    });
});

// /****************************
//  * DELETE bars method *
//  ****************************/

app.delete("/bars/:id", function (req, res) {
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
