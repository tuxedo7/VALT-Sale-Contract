const { ethers } = require("hardhat");

async function main() {
  const TestUSDT = await ethers.getContractFactory("TestUSDT");
  const usdt = await TestUSDT.deploy();
  await usdt.waitForDeployment();
  console.log("Test USDT deployed to:", await usdt.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});