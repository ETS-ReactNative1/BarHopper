const bars = require("./barData");

// let addResponse = bars.addAttributes(
//   "ChIJN1t_tDeuEmsRUsoyG83frY4",
//   ["dive"],
//   ["long ling"],
//   ["grunge"]
// );

// console.log(addResponse);

(async () => {
  console.log("before start");

  const result = await bars.getBar("ChIJN1t_tDeuEmsRUsoyG83frY4");

  console.log("after start");
  console.log(result);
})();

// let response = bars.getBar("ChIJN1t_tDeuEmsRUsoyG83frY4");
// console.log(response);

// const AWS = require("aws-sdk");

// AWS.config.update({
//   region: "us-east-1", // replace with your region in AWS account
// });

// const DynamoDB = new AWS.DynamoDB();

// function createTable() {
//   const params = {
//     TableName: "BAR_TABLE",
//     KeySchema: [{ AttributeName: "uuid", KeyType: "HASH" }],
//     AttributeDefinitions: [{ AttributeName: "uuid", AttributeType: "S" }],
//     ProvisionedThroughput: {
//       ReadCapacityUnits: 10,
//       WriteCapacityUnits: 10,
//     },
//   };

//   DynamoDB.createTable(params, function (err, data) {
//     if (err) {
//       console.error("Unable to create table", err);
//     } else {
//       console.log("Created table", data);
//     }
//   });
// }

// function addMovie(title, rtScore) {
//   const params = {
//     TableName: "Movies",
//     Item: {
//       title: { S: title },
//       rtScore: { N: rtScore },
//     },
//   };

//   DynamoDB.putItem(params, function (err) {
//     if (err) {
//       console.error("Unable to add movie", err);
//     } else {
//       console.log(`Added ${title} with a Rotten Tomatoes Score of ${rtScore}%`);
//     }
//   });
// }

// module.exports = {
//   createTable,
//   addMovie,
// };
