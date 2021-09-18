const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const InfuraProvider = new HDWalletProvider(
	"pave cousin peace owner atom stem fault soon peace lady chapter lesson",
	"https://goerli.infura.io/v3/0df1ccc706aa49d1902963543b78912b"
);

const web3 = new Web3(InfuraProvider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	const result = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({
			data: bytecode,
		})
		.send({ gas: "1000000", gasPrice: "5000000000", from: accounts[0] });

	console.log(interface);
	console.log("deployed to: ", result.options.address);
};

deploy();
