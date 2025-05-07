const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const standardToken = await ethers.getContractFactory("DxStandardToken");
  const tvalt_token = await standardToken.deploy(
    deployer.address,
    "DxStandardToken",
    "TVALT",
    8,
    ethers.parseUnits("10000", 8)
  );

  await tvalt_token.waitForDeployment();
  const address = await tvalt_token.getAddress();

  console.log("Token deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
