require('dotenv').config();
const hre = require("hardhat");


async function main() {
  const ProofRegister = await hre.ethers.getContractFactory("ProofRegister");
  const proofRegister = await ProofRegister.deploy(process.env.VERIFIER_ADDRESS);
  await proofRegister.deployed();
  console.log("ProofRegister deployed to:", proofRegister.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
