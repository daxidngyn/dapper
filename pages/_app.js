import React, { useEffect, useState } from "react";

import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Web3 = require("web3");

let web3 = new Web3(Web3.givenProvider);
const config = {
  CONTRACT_ADDR: "0x521a3867deE220C09f1d60696Af6EcC18C0BF4d3",
  NET_ID: 137,
  CHAIN_ID: "0x89",
  CHAIN_NAME: "Matic Network",
  RPC_URL:
    "https://rpc-mainnet.maticvigil.com/v1/f298c2a4df8d50a82d1611c89e84b9a0168796dc",
  BLOCK_EXPLORER_URL: "https://explorer-mainnet.maticvigil.com",
  ABI_URL: "js/Color.json",
  API_BASE: "https://api.niftypalette.io/api/",
};

function MyApp({ Component, pageProps }) {
  const [connected, setConnected] = useState(false);

  React.useEffect(() => {
    const switchtest = async () => {
      await ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: config.CHAIN_ID,
              chainName: config.CHAIN_NAME,
              nativeCurrency: {
                name: "MATIC Token",
                symbol: "MATIC", // 2-6 characters long
                decimals: 18,
              },
              rpcUrls: [config.RPC_URL],
              blockExplorerUrls: [config.BLOCK_EXPLORER_URL],
            },
          ],
        })
        .then(async () => {
          await login();
        })
        .catch((e) => {
          throw "network switch denied--halt any interaction with chain";
        });
    };

    const login = async () => {
      try {
        let accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        web3.eth.net.getId().then(async (netId) => {
          if (netId != config.NET_ID) {
            setConnected(true);
            throw "not on matic--halt any interaction with chain";
          }
          $("#loginState").html("Connected to " + accounts[0]);
        });
      } catch (e) {
        throw "login denied--halt any interaction with chain";
      }
    };

    if (typeof window.ethereum !== "undefined") {
      login();
    }
  }, []);

  return (
    <div className="">
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
