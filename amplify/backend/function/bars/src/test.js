// const bars = require("./barData");

// let addResponse = bars.addAttributes(
//   "ChIJN1t_tDeuEmsRUsoyG83frY4",
//   ["short line"],
//   ["country"]
// );
// console.log(addResponse);

// let response = bars.getBar("ChIJN1t_tDeuEmsRUsoyG83frY4");
// console.log(response);

// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "us-east-1" });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

var params = {
  TableName: "BARS_TABLE",
  Item: {
    KEY: { 'S': "aaaa" },
    "CUSTOMER_ID": { 'N': "001" },
    "CUSTOMER_NAME": { 'S': "Richard Roe" },
  },
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
