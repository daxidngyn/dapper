import React, { useState, useContext } from "react";

import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Web3 = require("web3");
// var web3 = new Web3(Web3.givenProvider);

const config = {
  CONTRACT_ADDR: "0x8450c24d7DfCBa03D50a794ca598e838C19b1Acb",
  NET_ID: 80001,
  CHAIN_ID: "0x13881",
  CHAIN_NAME: "Matic Testnet Mumbai",
  RPC_URL:
    "https://rpc-mumbai.maticvigil.com/v1/a8f72913d3433046ab491c005256aec91a7a92b0",
  BLOCK_EXPLORER_URL: "https://explorer-mainnet.maticvigil.com/",
  ABI_URL: "js/Color.json",
  API_BASE: "http://localhost:3002/api/",
};

function MyApp({ Component, pageProps }) {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");

  React.useEffect(() => {
    // const switchtest = async () => {
    //   await ethereum
    //     .request({
    //       method: "wallet_addEthereumChain",
    //       params: [
    //         {
    //           chainId: config.CHAIN_ID,
    //           chainName: config.CHAIN_NAME,
    //           nativeCurrency: {
    //             name: "MATIC Token",
    //             symbol: "MATIC", // 2-6 characters long
    //             decimals: 18,
    //           },
    //           rpcUrls: [config.RPC_URL],
    //           blockExplorerUrls: [config.BLOCK_EXPLORER_URL],
    //         },
    //       ],
    //     })
    //     .then(async () => {
    //       await login();
    //     })
    //     .catch((e) => {
    //       throw "network switch denied--halt any interaction with chain";
    //     });
    // };
    // const login = async () => {
    //   try {
    //     let accounts = await ethereum.request({
    //       method: "eth_requestAccounts",
    //     });
    //     web3.eth.net.getId().then(async (netId) => {
    //       if (netId != config.NET_ID) {
    //         setConnected(true);
    //         throw "not on matic--halt any interaction with chain";
    //       }
    //       $("#loginState").html("Connected to " + accounts[0]);
    //     });
    //   } catch (e) {
    //     throw "login denied--halt any interaction with chain";
    //   }
    // };
    // if (typeof window.ethereum !== "undefined") {
    //   login();
    // }

    const loadWeb3 = async () => {
      if (window.ethereum) {
        console.log("case 1");
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        console.log("case 2");
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        console.log("case 3");
        window.alert("Non-ethereum browser detected!");
      }
    };
    const loadBlockchainData = async () => {
      const web3 = window.web3;
      console.log(web3);
      const accounts = await web3.eth.getAccounts();
      // web3.eth.getBalance(accounts[0], (err, res) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     setUserData({
      //       ...userData,
      //       balance: web3.utils.fromWei(res, "ether"),
      //     });
      //     setBalance(web3.utils.fromWei(res, "ether"));
      //   }
      // });
      console.log(accounts, "ACCOUNTS");
      if (accounts.length > 0) {
        console.log("FOUND ACCOUNT!");
        setAccount(accounts[0]);
      }
    };

    if (typeof window.ethereum !== "undefined") {
      setConnected(true);
      loadWeb3();
      loadBlockchainData();
    }

    window.ethereum.on("accountsChanged", (accounts) => {
      console.log("accountsChanged:", accounts);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        web3.eth.getBalance(accounts[0], (err, res) => {
          if (err) {
            console.log(err);
          } else {
            setBalance(web3.utils.fromWei(res, "ether"));
          }
        });
      } else {
        setAccount(accounts);
      }
    });
  }, []);

  return (
    <div className="">
      <Navbar account={account} balance={balance} connected={connected} />
      <Component {...pageProps} account={account} connected={connected} />
      <Footer />
    </div>
  );
}

export default MyApp;
