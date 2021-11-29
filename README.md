## Inspiration
I am currently a high school student applying to college. With the recent controversies regarding bribery and discrimination in university admissions, I found the process to be flawed and unaccountable. I also didn’t know where I stood among other applicants or how my application would be judged. These concerns led to the idea of AVIT(X)T - Accountable Verifiable Immutable Transparent (any competitive event) Tracker.

## What it does
With the goal of making my college admission process more accountable and transparent, AVIT(X)T allows for the creation, submission, judging, funding, and analysis of all parties involved. Because the submissions, scoring rubrics, scoring breakdowns, and judges’ histories are public, applicants are able to better understand the judging criteria, where they stand, and whether judges are being biased.

![AVITXT College Admission](https://drive.google.com/uc?export=view&id=1JJW1qlez5_ZLsE_STWGwhUvuiuvP6jhW)

Since developing this idea, we have generalized the system to be used for any competitive event involving judges.

![AVITXT Parties](https://drive.google.com/uc?export=view&id=1Pan01tF1UmWJPf2IbvLP9wJyVuY5FDA1)

## How we built it
The Dapp is currently deployed on Kovan, Polygon Mumbai, BSC Test Net, and uses Moralis for web hosting, event processing, and database.  Chainlink is used to fetch external data from Data Authorities to be put back onto the blockchain.  We also used Filecoin IPFS and Alchemy for chain operations, and Hardhat, Scaffold-Eth and Vue for development.

![AVITXT Current Tech Stack](https://drive.google.com/uc?export=view&id=1H_sCHk8XTvfv2A1SIht-g3WUe3k5GWDI)

## Challenges we ran into
Learning Solidity was incredibly easy with Remix remotely and Scaffold-Eth locally.  However, when we tried integrating Scaffold-Eth with Moralis, we hit some roadblocks and switched to building the web app from scratch using Vue and Vuetify, but still retaining all the other parts of Scaffold-Eth.  We also planned to use Chainlink Keepers to automatically fetch external data when a competition ends.  But we hit some Solidity compiling errors at the last minute and took out the integration with Chainlink Keepers.

## Accomplishments that we're proud of
Because of the relevance of this Dapp to my college admission process and its wide application to other spaces, we feel AVIT(X)T can change the world for any competitive event involving judges.  We are not trying to take power away from the organizers or judges. Rather, we want them to be held accountable for their power. Its immediate benefits are for the applicants, but in the long run, AVIT(X)T will improve the whole ecosystem as it eliminates the issues that were previously mentioned. 

## What we learned
This is our first time doing any blockchain development, and my first time (not my dad's first) participating in a hackathon.  We learned how blockchain can make all parties, states, and transactions Accountable, Verifiable, Immutable, and Transparent.  Chainlink, Moralis and all these tools in this ecosystem make it so easy to explore this space.

## What's next for AVIT(X)T
We plan to improve AVIT(X)T by adding privacy settings for both organizers and applicants, in-depth analysis of judges' and applicants' history, NFT for badging/achievements, tokens for transactions, develop a standardized way of working with off-chain data authorities, and allowing third parties to perform audits on data.  We also want to deploy on other blockchains like Avalanche, Solana and bridging between them.

![AVITXT Current Tech Stack](https://drive.google.com/uc?export=view&id=1nJa-mt6e5X7FIo3Gq9zakYgMv-Y1RfRr)

This is a fork of Scaffold-ETH as the foundation of our project. So we are leaving its original content here.

# 🏗 Scaffold-ETH

> everything you need to build on Ethereum! 🚀

🧪 Quickly experiment with Solidity using a frontend that adapts to your smart contract:

![image](https://user-images.githubusercontent.com/2653167/124158108-c14ca380-da56-11eb-967e-69cde37ca8eb.png)


# 🏄‍♂️ Quick Start

### Manual setup

Prerequisites: [Node](https://nodejs.org/en/download/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

> clone/fork 🏗 scaffold-eth:

```bash
git clone https://github.com/austintgriffith/scaffold-eth.git
```

> install and start your 👷‍ Hardhat chain:

```bash
cd scaffold-eth
yarn install
yarn chain
```

> in a second terminal window, start your 📱 frontend:

```bash
cd scaffold-eth
yarn start
```

> in a third terminal window, 🛰 deploy your contract:

```bash
cd scaffold-eth
yarn deploy
```

🌍 You need an RPC key for production deployments/Apps, create an [Alchemy](https://www.alchemy.com/) account and replace the value of `ALCHEMY_KEY = xxx` in `packages/react-app/src/constants.js`

🔏 Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`

📝 Edit your frontend `App.jsx` in `packages/react-app/src`

💼 Edit your deployment scripts in `packages/hardhat/deploy`

📱 Open http://localhost:3000 to see the app

### Automated with Gitpod

To deploy this project to Gitpod, click this button:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/scaffold-eth/scaffold-eth)

# 📚 Documentation

Documentation, tutorials, challenges, and many more resources, visit: [docs.scaffoldeth.io](https://docs.scaffoldeth.io)

# 🔭 Learning Solidity

📕 Read the docs: https://docs.soliditylang.org

📚 Go through each topic from [solidity by example](https://solidity-by-example.org) editing `YourContract.sol` in **🏗 scaffold-eth**

- [Primitive Data Types](https://solidity-by-example.org/primitives/)
- [Mappings](https://solidity-by-example.org/mapping/)
- [Structs](https://solidity-by-example.org/structs/)
- [Modifiers](https://solidity-by-example.org/function-modifier/)
- [Events](https://solidity-by-example.org/events/)
- [Inheritance](https://solidity-by-example.org/inheritance/)
- [Payable](https://solidity-by-example.org/payable/)
- [Fallback](https://solidity-by-example.org/fallback/)

📧 Learn the [Solidity globals and units](https://solidity.readthedocs.io/en/v0.6.6/units-and-global-variables.html)

# 🛠 Buidl

Check out all the [active branches](https://github.com/austintgriffith/scaffold-eth/branches/active), [open issues](https://github.com/austintgriffith/scaffold-eth/issues), and join/fund the 🏰 [BuidlGuidl](https://BuidlGuidl.com)!

  
 - 🚤  [Follow the full Ethereum Speed Run](https://medium.com/@austin_48503/%EF%B8%8Fethereum-dev-speed-run-bd72bcba6a4c)


 - 🎟  [Create your first NFT](https://github.com/austintgriffith/scaffold-eth/tree/simple-nft-example)
 - 🥩  [Build a staking smart contract](https://github.com/austintgriffith/scaffold-eth/tree/challenge-1-decentralized-staking)
 - 🏵  [Deploy a token and vendor](https://github.com/austintgriffith/scaffold-eth/tree/challenge-2-token-vendor)
 - 🎫  [Extend the NFT example to make a "buyer mints" marketplace](https://github.com/austintgriffith/scaffold-eth/tree/buyer-mints-nft)
 - 🎲  [Learn about commit/reveal](https://github.com/austintgriffith/scaffold-eth/tree/commit-reveal-with-frontend)
 - ✍️  [Learn how ecrecover works](https://github.com/austintgriffith/scaffold-eth/tree/signature-recover)
 - 👩‍👩‍👧‍👧  [Build a multi-sig that uses off-chain signatures](https://github.com/austintgriffith/scaffold-eth/tree/meta-multi-sig)
 - ⏳  [Extend the multi-sig to stream ETH](https://github.com/austintgriffith/scaffold-eth/tree/streaming-meta-multi-sig)
 - ⚖️  [Learn how a simple DEX works](https://medium.com/@austin_48503/%EF%B8%8F-minimum-viable-exchange-d84f30bd0c90)
 - 🦍  [Ape into learning!](https://github.com/austintgriffith/scaffold-eth/tree/aave-ape)

# 💬 Support Chat

Join the telegram [support chat 💬](https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA) to ask questions and find others building with 🏗 scaffold-eth!

---

🙏 Please check out our [Gitcoin grant](https://gitcoin.co/grants/2851/scaffold-eth) too!
