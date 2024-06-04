
// require("dotenv").config();
// const hre = require("hardhat");
// const ethers = require("ethers");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const unlockTime = currentTimestampInSeconds + 60;

//   const lockedAmount = ethers.utils.parseEther("0.001");

//   // Use Infura provider
//   const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
//   const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
//   const factory = new ethers.ContractFactory("Lock", [unlockTime], wallet);

//   const lock = await factory.deploy({
//     value: lockedAmount,
//   });

//   await lock.deployed();

//   console.log(
//     `Lock with ${ethers.utils.formatEther(
//       lockedAmount
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
//   );
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const token = await ethers.deployContract("Token");

  console.log("Token address:", await token.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });