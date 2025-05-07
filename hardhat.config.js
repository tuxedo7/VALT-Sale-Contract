require("@nomicfoundation/hardhat-toolbox");

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
      }
    },
  },
  networks: {
    tbnb: {
      url: `https://bsc-testnet-rpc.publicnode.com`,
      accounts: [
        "0x1195ee52c8baf699d047a79c29e6fe96e4a158ae3db966ff9bc5f26ba5fae1a9",
      ],
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: "K1DPCVWW2U8PY24HHP6BR5J485YE3IQXJT",
    },
  },
  sourcify: {
    enabled: true,
  },
};
