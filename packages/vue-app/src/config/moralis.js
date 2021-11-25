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

    return new Moralis.$web3.eth.Contract(contractInfo.abi, address);
}

const MoralisConfig = Moralis;

export default MoralisConfig;
