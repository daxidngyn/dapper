import React, { useState, useContext } from "react";

import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Web3 = require("web3");
// var web3 = new Web3(Web3.givenProvider);

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
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");

  const getBalance = (account) => {
    return;
  };

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
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert("Non-ethereum browser detected!");
      }
    };
    const loadBlockchainData = async () => {
      const web3 = window.web3;
      console.log(web3);
      const accounts = await web3.eth.getAccounts();
      web3.eth.getBalance(accounts[0], (err, res) => {
        if (err) {
          console.log(err);
        } else {
          // setUserData({
          //   ...userData,
          //   balance: web3.utils.fromWei(res, "ether"),
          // });
          setBalance(web3.utils.fromWei(res, "ether"));
        }
      });
      setAccount(accounts[0]);
    };

    loadWeb3();
    loadBlockchainData();

    window.ethereum.on("accountsChanged", (accounts) => {
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

  React.useEffect(() => {
    if (account) {
      console.log("Account:", account);
    }
  }, [account]);

  return (
    <div className="">
      <Navbar account={account} balance={balance} />
      <Component {...pageProps} account={account} />
      <Footer />
    </div>
  );
}

export default MyApp;
