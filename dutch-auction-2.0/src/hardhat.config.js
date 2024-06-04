require("@nomicfoundation/hardhat-toolbox");

const INFURA_API_KEY = "ca307c465c99458a9c645fac29f6ec13";

// Replace this private key with your Sepolia account private key
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const SEPOLIA_PRIVATE_KEY = "6c8dbd0e507ffc8320bcd071444707580caea086289324ecbddc69f18094f0e9";


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
  },
  artifactsDirectory: "./artifacts",
};
