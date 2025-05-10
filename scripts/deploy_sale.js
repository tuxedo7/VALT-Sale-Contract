const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with:", deployer.address);

  // Replace with your actual token addresses and main wallet
  const usdtAddress = "0xde74fcF3FafBb00Ba73395aD734f293edfD04544";
  const valtAddress = "0xa207C8686c3a4256e6176b25E0AA7dAc468009D1";

  const ValutSwap = await ethers.getContractFactory("ValtSwap");
  const swap = await ValutSwap.deploy(usdtAddress, valtAddress);

  await swap.waitForDeployment();
  console.log("ValtSwap deployed to:", await swap.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});