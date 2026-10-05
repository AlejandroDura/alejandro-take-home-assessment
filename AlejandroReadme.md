This is what I did:

1. I decided to retrieve/fetch information about ETH deploys in the dETH.sol contract.
2. To do that, I focused on fetching ETHDeposited event logs. These logs contains interesting
   information about the user address and deposited amount. I also added transaction
   hash and block number to identify them better. To simplify this, I decided to search from
   block 0 to current chain block.
3. To complement, I also performed an extra operation to read the ETH contract balance.
4. The utils getDeposits() function returns all that data encoded in JSON format to the controller
   to work with these data. The utils getEthBalance() function returns the contract balance to
   the controller. In both cases, what we do is to display this information in the backend console.
   We also send this information to the request response.

Things that I changed/added:

- new route in: routes/AlejandroApitest.js
- new controller in: controllers/AlejandroApitest.js
- new config file in: config/blockchain.js (This includes the contract address and RPC)
- new utils file in: utils/ethDeposits.js (This includes the RPC calls to dETH contract)
- added openzeppelin dependencies to deploy the dETH.sol contract
- added these new routes in the app.js:
  const alejandro = require('./routes/AlejandroApitest');
  app.use('/api/alejandro', alejandro);

I decided to work with Anvil local blockchain, instead of deploying the contract in testnets
like sepolia. The results will be the same, but the RPC will be different.

To reproduce these results, I recomend you to deploy the dETH.sol contract at the beginning of the Anvil
chain (block 1), to receive the 0x5FbDB2315678afecb367f032d93F642f64180aa3 contract address (this is
the address you can find in the config file config/blockchain.js).

Here you have the comands that I used:

To deploy the contract: forge create --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 contracts/dETH.sol:DepositETH --broadcast

To create deposit transactions: cast send 0x5FbDB2315678afecb367f032d93F642f64180aa3 "deposit()" --value 1ether --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Note: This private key is from Anvil. So it's a fake account and there is no security concerns about sharing this.

Then, go to http://localhost:PORT/api/alejandro/AlejandroApitest to test the results.
