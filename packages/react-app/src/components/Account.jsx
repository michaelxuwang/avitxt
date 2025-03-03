import { Button } from "antd";
import React, {useEffect} from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import Address from "./Address";
import Balance from "./Balance";
import Wallet from "./Wallet";
import { useMoralis } from "react-moralis";

/*
  ~ What it does? ~

  Displays an Address, Balance, and Wallet as one Account component,
  also allows users to log in to existing accounts and log out

  ~ How can I use? ~

  <Account
    address={address}
    localProvider={localProvider}
    userProvider={userProvider}
    mainnetProvider={mainnetProvider}
    price={price}
    web3Modal={web3Modal}
    loadWeb3Modal={loadWeb3Modal}
    logoutOfWeb3Modal={logoutOfWeb3Modal}
    blockExplorer={blockExplorer}
  />

  ~ Features ~

  - Provide address={address} and get balance corresponding to the given address
  - Provide localProvider={localProvider} to access balance on local network
  - Provide userProvider={userProvider} to display a wallet
  - Provide mainnetProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide price={price} of ether and get your balance converted to dollars
  - Provide web3Modal={web3Modal}, loadWeb3Modal={loadWeb3Modal}, logoutOfWeb3Modal={logoutOfWeb3Modal}
              to be able to log in/log out to/from existing accounts
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
*/

export default function Account({
  address,
  userSigner,
  localProvider,
  mainnetProvider,
  price,
  minimized,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
}) {
  // const { authenticate, isAuthenticated, user, logout } = useMoralis();

  // const { web3, enableWeb3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError } = useMoralis()

  // useEffect(() => {
  //   console.log('+++++++++enabling web3', user, web3);
  //   enableWeb3();
  // }, [user]);

  const { currentTheme } = useThemeSwitcher();

  return (
    <div>
      {minimized ? (
        ""
      ) : (
        <span>
          {address ? (
            <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />
          ) : (
            "Connecting..."
          )}
          <Balance address={address} provider={localProvider} price={price} />
          <Wallet
            address={address}
            provider={localProvider}
            signer={userSigner}
            ensProvider={mainnetProvider}
            price={price}
            color={currentTheme === "light" ? "#1890ff" : "#2caad9"}
          />
        </span>
      )}
      {web3Modal &&
        (web3Modal?.cachedProvider ? (
          <Button
            key="logoutbutton"
            style={{ verticalAlign: "top", marginLeft: 8, marginTop: 4 }}
            shape="round"
            size="large"
            onClick={logoutOfWeb3Modal}
          >
            logout
          </Button>
        ) : (
          <Button
            key="loginbutton"
            style={{ verticalAlign: "top", marginLeft: 8, marginTop: 4 }}
            shape="round"
            size="large"
            /* type={minimized ? "default" : "primary"}     too many people just defaulting to MM and having a bad time */
            onClick={loadWeb3Modal}
          >
            connect
          </Button>
        ))}
    </div>
  );
}
