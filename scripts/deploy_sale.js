const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with:", deployer.address);

  // Replace with your actual token addresses and main wallet
  const usdtAddress = process.env.BINANCE_USDT_ADDRESS;
  const valtAddress = process.env.VALT_ADDRESS;

  const ValutSwap = await ethers.getContractFactory("ValtSwap");
  const swap = await ValutSwap.deploy(usdtAddress, valtAddress);

  await swap.waitForDeployment();
  console.log("ValtSwap deployed to:", await swap.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});