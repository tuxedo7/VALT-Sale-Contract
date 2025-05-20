require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

// const TBNB_PRIVATE_KEY = vars.get("TBNB_PRIVATE_KEY");
// const TBNB_API_KEY = vars.get("TBNB_API_KEY");

module.exports = {
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    bscTestnet: {
      url: `https://bsc-testnet-rpc.publicnode.com`,
      accounts: [process.env.TEST_PRIVATE_KEY],
      chainId: 97,
    },
    bsc: {
      url: `https://bsc-rpc.publicnode.com`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 56,
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.TESTNET_BSCSCAN_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
    },
  },
  sourcify: {
    enabled: true,
  },
};
