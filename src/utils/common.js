import { ethers } from "ethers";

// 1: Mainnet
// 4: Rinkeby
// 1337: localhost network

const networkId = "4";
const networks = {
  1: "mainnet",
  4: "rinkeby",
  1337: "localhost",
};
export const networkName = "rinkeby";
//networks[networkId];

export const getEthereumObject = () => {
  const { ethereum } = window;
  console.log("getEthereumObject", ethereum.networkVersion, networkId);
  if (!ethereum) return null;

  // if (ethereum.networkVersion != networkId) {
  //   // alert(`Please switch to the ${networkName} network`)
  //   return null;
  // }

  return ethereum;
};

export const setupEthereumEventListeners = (ethereum) => {
  const provider = new ethers.providers.Web3Provider(ethereum, "any");
  provider.on("network", (newNetwork, oldNetwork) => {
    if (oldNetwork) {
      window.location.reload();
    }
  });

  window.ethereum.on("accountsChanged", async (accounts) => {
    window.location.reload();
  });

  return ethereum;
};

export const connectWallet = async () => {
  const { ethereum } = window;
  console.log("ethereum", ethereum);
  if (!ethereum) return null;

  await ethereum.request({ method: "eth_requestAccounts" });

  // location.reload();
};

export const getCurrentAccount = async () => {
  const { ethereum } = window;

  const accounts = await ethereum.request({ method: "eth_accounts" });

  if (!accounts || accounts?.length === 0) {
    return null;
  }
  const account = accounts[0];
  console.log("getCurrentAccount DONE======>", account);

  return account;
};

export const getSignedContract = (address, abi) => {
  const { ethereum } = window;

  const provider = new ethers.providers.Web3Provider(ethereum, "any");

  const signer = provider.getSigner();
  return new ethers.Contract(address, abi, signer);
};
