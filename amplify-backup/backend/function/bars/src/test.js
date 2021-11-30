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
  console.log(result.Item.vibe.SS);
})();
