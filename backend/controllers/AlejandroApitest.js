const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");
const { getDeposits, getEthBalance } = require("../utils/ethDeposits");

exports.alejandroApitest = asyncErrorHandler( async (req, res) => {
    const ethDeposits = await getDeposits();

    for(const deposit of ethDeposits) {
        console.log("Transaction hash: ", deposit.txHash);
        console.log("Block number: ", deposit.blockNumber);
        console.log("User: ", deposit.user);
        console.log("Ammount: ", deposit.amount);
        console.log("\n");
    }

    const ethBalance = await getEthBalance();

    console.log("ETH balance: ", ethBalance);

    res.json ({
        deposits: ethDeposits,
        ethBalance: ethBalance.toString()
    });
});