const hre = require("hardhat");

async function main() {
  const ProofRegister = await hre.ethers.getContractFactory("ProofRegister");
  const proofRegister = await ProofRegister.deploy();
  await proofRegister.deployed();
  console.log("ProofRegister deployed to:", turboVerifier.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
