// import * as env from "env-var";

export class AppConfig {
  //   static MORALIS_APPID = "tkuc3FgHnBgyA28ty1VzZwo7ixIkTzzCVLbZeRAe";
  //   static MORALIS_SERVER_URL = "https://rfdhyqlivk4x.usemoralis.com:2053/server";

  static DEFAULT_NETWORK_NAME = "kovan";

  // MY INFURA_ID, SWAP IN YOURS FROM https://infura.io/dashboard/ethereum
  static INFURA_ID = "7b0e75d38d424750b92791477924d133";

  // MY ETHERSCAN_ID, SWAP IN YOURS FROM https://etherscan.io/myapikey
  static ETHERSCAN_KEY = "DNXJA8RX2Q3VZ4URQIWP7Z68CJXQZSC6AW";

  // BLOCKNATIVE ID FOR Notify.js:
  static BLOCKNATIVE_DAPPID = "0b58206a-f3c0-4701-a62f-73c7243e8c77";

  static ALCHEMY_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

  static NETWORKS = {
    localhost: {
      name: "localhost",
      color: "#666666",
      chainId: 31337,
      blockExplorer: "",
      rpcUrl: "http://" + (global.window ? window.location.hostname : "localhost") + ":8545",
      moralisServerUrl: "https://rfdhyqlivk4x.usemoralis.com:2053/server",
      moralisAppId: "tkuc3FgHnBgyA28ty1VzZwo7ixIkTzzCVLbZeRAe"
    },
    mainnet: {
      name: "mainnet",
      color: "#ff8b9e",
      chainId: 1,
      rpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${this.ALCHEMY_KEY}`,
      blockExplorer: "https://etherscan.io/",
    },
    kovan: {
      name: "kovan",
      color: "#7003DD",
      chainId: 42,
      // rpcUrl: `https://kovan.infura.io/v3/${this.INFURA_ID}`,
      // rpcUrl: "https://speedy-nodes-nyc.moralis.io/83fe2dc49820be3f0d48133d/eth/kovan",
      rpcUrl: "https://eth-kovan.alchemyapi.io/v2/UQdl3PnJmWbRdP4ziX5d_7imyiyHB8W9",
      moralisServerUrl: "https://qurauvzjjmrz.usemoralis.com:2053/server",
      moralisAppId: "yY2GiYSr8ksX7BraE3gYYU12E4LeCnYQk9Ed0zG0",
      blockExplorer: "https://kovan.etherscan.io/",
      faucet: "https://gitter.im/kovan-testnet/faucet", // https://faucet.kovan.network/
      linkTokenAddress: "0xa36085F69e2889c224210F603D836748e7dC0088",
    },
    polytest: {
      name: "polytest",
      color: "#92D9FA",
      chainId: 80001,
      price: 1,
      gasPrice: 1000000000,
      rpcUrl: "https://speedy-nodes-nyc.moralis.io/83fe2dc49820be3f0d48133d/polygon/mumbai",
      faucet: "https://faucet.matic.network/",
      blockExplorer: "https://mumbai-explorer.matic.today/",
      moralisServerUrl: "https://pubuxbhouojn.usemoralis.com:2053/server",
      moralisAppId: "Dga9yy9tDzJdFnuYOtgHZuBOCVLQnQrygmwWzlnQ",
      linkTokenAddress: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    },
    bsctest: {
      name: "bsctest",
      color: "#92D9FA",
      chainId: 97,
      price: 1,
      gasPrice: 20000000000,
      rpcUrl: "https://speedy-nodes-nyc.moralis.io/83fe2dc49820be3f0d48133d/bsc/testnet",
      faucet: "https://testnet.binance.org/faucet-smart",
      blockExplorer: "https://mumbai-explorer.matic.today/",
      moralisServerUrl: "https://dwwce8ek9e95.usemoralis.com:2053/server",
      moralisAppId: "GOnwQaHuGpgk82e7wj1Ez34P9LFlTlejsEAiiLHP",
      linkTokenAddress: "0x84b9b910527ad5c03a9ca831909e21e236ea7b06",
    },
    rinkeby: {
      name: "rinkeby",
      color: "#e0d068",
      chainId: 4,
      rpcUrl: `https://rinkeby.infura.io/v3/${this.INFURA_ID}`,
      faucet: "https://faucet.rinkeby.io/",
      blockExplorer: "https://rinkeby.etherscan.io/",
    },
    ropsten: {
      name: "ropsten",
      color: "#F60D09",
      chainId: 3,
      faucet: "https://faucet.ropsten.be/",
      blockExplorer: "https://ropsten.etherscan.io/",
      rpcUrl: `https://ropsten.infura.io/v3/${this.INFURA_ID}`,
    },
    goerli: {
      name: "goerli",
      color: "#0975F6",
      chainId: 5,
      faucet: "https://goerli-faucet.slock.it/",
      blockExplorer: "https://goerli.etherscan.io/",
      rpcUrl: `https://goerli.infura.io/v3/${this.INFURA_ID}`,
    },
    xdai: {
      name: "xdai",
      color: "#48a9a6",
      chainId: 100,
      price: 1,
      gasPrice: 1000000000,
      rpcUrl: "https://dai.poa.network",
      faucet: "https://xdai-faucet.top/",
      blockExplorer: "https://blockscout.com/poa/xdai/",
    },
    matic: {
      name: "matic",
      color: "#2bbdf7",
      chainId: 137,
      price: 1,
      gasPrice: 1000000000,
      rpcUrl: "https://rpc-mainnet.maticvigil.com",
      faucet: "https://faucet.matic.network/",
      blockExplorer: "https://explorer-mainnet.maticvigil.com//",
    },
    localArbitrum: {
      name: "localArbitrum",
      color: "#50a0ea",
      chainId: 153869338190755,
      blockExplorer: "",
      rpcUrl: `http://localhost:8547`,
    },
    localArbitrumL1: {
      name: "localArbitrumL1",
      color: "#50a0ea",
      chainId: 44010,
      blockExplorer: "",
      rpcUrl: `http://localhost:7545`,
    },
    rinkebyArbitrum: {
      name: "Arbitrum Testnet",
      color: "#50a0ea",
      chainId: 421611,
      blockExplorer: "https://rinkeby-explorer.arbitrum.io/#/",
      rpcUrl: `https://rinkeby.arbitrum.io/rpc`,
    },
    arbitrum: {
      name: "Arbitrum",
      color: "#50a0ea",
      chainId: 42161,
      blockExplorer: "https://explorer.arbitrum.io/#/",
      rpcUrl: `https://arb1.arbitrum.io/rpc`,
      gasPrice: 0,
    },
    localOptimismL1: {
      name: "localOptimismL1",
      color: "#f01a37",
      chainId: 31337,
      blockExplorer: "",
      rpcUrl: "http://" + (global.window ? window.location.hostname : "localhost") + ":9545",
    },
    localOptimism: {
      name: "localOptimism",
      color: "#f01a37",
      chainId: 420,
      blockExplorer: "",
      rpcUrl: "http://" + (global.window ? window.location.hostname : "localhost") + ":8545",
      gasPrice: 0,
    },
    kovanOptimism: {
      name: "kovanOptimism",
      color: "#f01a37",
      chainId: 69,
      blockExplorer: "https://kovan-optimistic.etherscan.io/",
      rpcUrl: `https://kovan.optimism.io`,
      gasPrice: 0,
    },
    optimism: {
      name: "optimism",
      color: "#f01a37",
      chainId: 10,
      blockExplorer: "https://optimistic.etherscan.io/",
      rpcUrl: `https://mainnet.optimism.io`,
    },
    localAvalanche: {
      name: "localAvalanche",
      color: "#666666",
      chainId: 43112,
      blockExplorer: "",
      rpcUrl: `http://localhost:9650/ext/bc/C/rpc`,
      gasPrice: 225000000000,
    },
    fujiAvalanche: {
      name: "fujiAvalanche",
      color: "#666666",
      chainId: 43113,
      blockExplorer: "https://cchain.explorer.avax-test.network/",
      rpcUrl: `https://api.avax-test.network/ext/bc/C/rpc`,
      gasPrice: 225000000000,
    },
    mainnetAvalanche: {
      name: "mainnetAvalanche",
      color: "#666666",
      chainId: 43114,
      blockExplorer: "https://cchain.explorer.avax.network/",
      rpcUrl: `https://api.avax.network/ext/bc/C/rpc`,
      gasPrice: 225000000000,
    },
    testnetHarmony: {
      name: "Harmony Testnet",
      color: "#00b0ef",
      chainId: 1666700000,
      blockExplorer: "https://explorer.pops.one/",
      rpcUrl: `https://api.s0.b.hmny.io`,
      gasPrice: 1000000000,
    },
    mainnetHarmony: {
      name: "Harmony Mainnet",
      color: "#00b0ef",
      chainId: 1666600000,
      blockExplorer: "https://explorer.harmony.one/",
      rpcUrl: `https://api.harmony.one`,
      gasPrice: 1000000000,
    },
  };

  static DEFAULT_NETWORK = this.NETWORKS[this.DEFAULT_NETWORK_NAME];
}