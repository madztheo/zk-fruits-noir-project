const hre = require("hardhat");

async function main() {
  const TurboVerifier = await hre.ethers.getContractFactory("TurboVerifier");
  const turboVerifier = await TurboVerifier.deploy();
  await turboVerifier.deployed();
  console.log("TurboVerifier deployed to:", turboVerifier.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
