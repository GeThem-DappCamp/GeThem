import { getAddress, saveAddress } from "../lib/addresses.helpers";
import { deployCamp } from "./deploy-camp";
import { deployDappCampWarriors } from "./deploy-dapp-camp-warriors";
import { deployStaking } from "./deploy-staking";
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners(); //get the account to deploy the contract

  console.log("Deploying contracts with the account:", deployer.address); 

  const gethem = await ethers.getContractFactory("GeThem");
  const gethemContract = await gethem.deploy();
  saveAddress("gethem", gethemContract.address);

  console.log("The contract deployed to address:", gethemContract.address); 


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });