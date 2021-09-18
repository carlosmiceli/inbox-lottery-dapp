const path = require("path");
const fs = require("fs");
const solc = require("solc");

const lotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const source = fs.readFileSync(lotteryPath, "utf8");

//for this exercise, will only access the property with the bytecode and interface,
//but remember that whole compile object has more data
module.exports = solc.compile(source, 1).contracts[":Lottery"];
