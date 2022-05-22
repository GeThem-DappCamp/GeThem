import { getAddress } from "../lib/addresses.helpers";
import { deployCamp } from "./deploy-camp";
import { deployDappCampWarriors } from "./deploy-dapp-camp-warriors";
import { deployStaking } from "./deploy-staking";
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners(); //get the account to deploy the contract

  console.log("Deploying contracts with the account:", deployer.address); 

  const campContract = await deployCamp();
  const dappCampWarriorsContract = await deployDappCampWarriors();
  await deployStaking();

  await campContract.transferOwnership(getAddress("staking"));
  await dappCampWarriorsContract.setBaseURI(
    process.env.NFT_METADATA_BASE_URI ||
      "https://gateway.pinata.cloud/ipfs/QmRLwGUPTTEfnfyzjqztJjq9NKJQY28ZVTf1qcEey3X3Rz"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
