// hardhat.config.js
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20", // Update this line to use 0.8.20 or higher
  paths: {
    artifacts: "./frontend/src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};