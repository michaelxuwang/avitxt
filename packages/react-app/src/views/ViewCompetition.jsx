import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { Address, Balance, Events } from "../components";
import { useParams } from "react-router-dom";
import {
  useBalance,
  useContractLoader,
  useContractReader,
  useGasPrice,
  useOnBlock,
  useUserProviderAndSigner,
} from "eth-hooks";
import { useMoralisQuery } from "react-moralis";

export default function ViewCompetition({
  address,
  mainnetProvider,
  localProvider,
  contractConfig
}) {
  const { compAddress } = useParams();
  contractConfig.customAddresses['Competition'] = compAddress;

  const contracts = useContractLoader(localProvider, contractConfig);
  const contract = contracts ? contracts['Competition'] : "";

  // const readContracts = useContractLoader(localProvider, contractConfig);
  const name = useContractReader(contracts, "Competition", "name");
  const roles = useContractReader(contracts, "Competition", "getMyRoles");
  // const roles = useContractReader(contracts, {
  //   contractName: "Competition",
  //   functionName: "getMyRoles",
  //   functionArgs: []
  // });
  console.log('!!!contract', localProvider, contract, name, roles);



  // const { data, error, isLoading } = useMoralisQuery("competitions", query =>
  //   query.fullText('name', 'hi'));
  // console.log('!!!moralis query', data, error, isLoading);

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, margin: "auto", marginTop: 64 }}>
        {address}
        <h2>View Competition: {compAddress} {name}</h2>
      </div>
    </div>
  );
}
