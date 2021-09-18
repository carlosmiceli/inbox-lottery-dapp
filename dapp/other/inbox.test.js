const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
	// Get a list of all accounts
	accounts = await web3.eth.getAccounts();

	// Use one of those accounts to deploy the contract
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({
			data: bytecode,
			arguments: ["Hello!"],
		})
		.send({ from: accounts[0], gas: "1000000" });
});

describe("bla", () => {
	it("deploys contract", () => {
		assert.ok(inbox.options.address);
	});
	it("check message default", async () => {
		const message = await inbox.methods.message().call();
		assert.ok(typeof message == "string" && message.length > 4);
	});
	it("check setmessage", async () => {
		await inbox.methods.setMessage("Goodbye!").send({ from: accounts[0] });
		const message = await inbox.methods.message().call();
		assert.equal(message, "Goodbye!");
	});
});
