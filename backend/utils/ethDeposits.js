const {RPC_URL} = require("../config/blockchain");
const {DepositETH} = require("../config/blockchain");
const { ethers } = require("ethers");

const ABI = require("../../lib/abis/dETH.json");
const provider = new ethers.JsonRpcProvider(RPC_URL);

const getBlockNumber = async() => { return await provider.getBlockNumber(); };

const getDeposits = async() => {
    const contract = new ethers.Contract(DepositETH, ABI, provider);

    const fromBlock = 0;
    const toBlock = await provider.getBlockNumber();

    const events = await contract.queryFilter(contract.filters.ETHDeposited(), fromBlock, toBlock);

    console.log(`Found ${events.length} events`);

    const deposits = events.map(event => ({
        txHash: event.transactionHash,
        blockNumber: event.blockNumber,
        user: event.args.user,
        amount: event.args.amount.toString(),
    }));

    return deposits;
};

const getEthBalance = async() => {
    const contract = new ethers.Contract(DepositETH, ABI, provider);
    return await contract.getContractETHBalance();
};

module.exports = {
  getBlockNumber,
  getDeposits,
  getEthBalance
};

