import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    artifacts: "./src/artifacts",
  },
  defaultNetwork: process.env.DEFAULT_NETWORK,
  networks: {
    hardhat: {
      chainId: 1337,
    },
    scrollAlpha: {
      url: "https://alpha-rpc.scroll.io/l2",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

export default config;
