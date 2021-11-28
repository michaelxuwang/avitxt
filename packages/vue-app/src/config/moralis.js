import * as Moralis from "moralis";
import { AppConfig } from ".";
import deployedContracts from "../contracts/hardhat_contracts.json";

Moralis.start({
  serverUrl: AppConfig.DEFAULT_NETWORK.moralisServerUrl,
  appId: AppConfig.DEFAULT_NETWORK.moralisAppId,
});

Moralis.$web3 = null;
Moralis.getContract = async (name, address) => {
    if (!Moralis.$web3)
        Moralis.$web3 = await Moralis.enableWeb3();
    // console.log(name, address, deployedContracts, AppConfig.DEFAULT_NETWORK);

    const contractInfo = deployedContracts[AppConfig.DEFAULT_NETWORK.chainId]?.[AppConfig.DEFAULT_NETWORK.name]?.contracts?.[name];
    if (!contractInfo)
        return null;

    if (!address)
        address = contractInfo.address;

    const contract = new Moralis.$web3.eth.Contract(contractInfo.abi, address);
    contract.fetchAllPlainData = fetchAllPlainData;
    contract.getLinkBalance = getLinkBalance;
    return contract;
}

async function fetchAllPlainData() {
    const data = {};
    
    const plainMethodNames = Object.keys(this.methods).filter(x => x.indexOf('()') > 0);
    const methods = plainMethodNames.map(x => this.methods[x]()).filter(x => x._method.stateMutability === 'view');
    
    const promises = methods.map(x => x.call());
    const results = await Promise.all(promises);

    for (let i=0; i<methods.length; i++) {
        let name = methods[i]._method.name;
        if (name.startsWith('get'))
            name = name[3].toLowerCase() + name.substr(4);
        data[name] = results[i];
    }
    // console.log('fetchAllPlainData', methods, promises, results, data);

    return data;
}

async function getLinkBalance() {
  // The minimum ABI to get ERC20 Token balance
  let minABI = [
    // balanceOf
    {
      "constant":true,
      "inputs":[{"name":"_owner","type":"address"}],
      "name":"balanceOf",
      "outputs":[{"name":"balance","type":"uint256"}],
      "type":"function"
    },
    // decimals
    {
      "constant":true,
      "inputs":[],
      "name":"decimals",
      "outputs":[{"name":"","type":"uint8"}],
      "type":"function"
    }
  ];
  
  try {
    // Get ERC20 Token contract instance
    let linkContract = new Moralis.$web3.eth.Contract(minABI, AppConfig.DEFAULT_NETWORK.linkTokenAddress);
    
    // Call balanceOf function
    let balance = await linkContract.methods.balanceOf(this._address).call();
    let decimals = await linkContract.methods.decimals().call();
    return balance / 10**decimals;
  } catch (e) {
    console.log('LINK contract get blanace error');
  }
  return 0;
}

const MoralisConfig = Moralis;

export default MoralisConfig;
