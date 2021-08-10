import React, { useState, useContext } from "react";

import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Web3 = require("web3");
// var web3 = new Web3(Web3.givenProvider);

const config = {
  CONTRACT_ADDR: "0xdB66AcA61A75F38101b40c94155Fb1A1a872115c",
  NET_ID: 80001,
  CHAIN_ID: "0x13881",
  CHAIN_NAME: "Matic Testnet Mumbai",
  RPC_URL:
    "https://rpc-mumbai.maticvigil.com/v1/a8f72913d3433046ab491c005256aec91a7a92b0",
  BLOCK_EXPLORER_URL: "https://explorer-mainnet.maticvigil.com/",
  ABI_URL: "contract/Dapper.json",
};

function MyApp({ Component, pageProps }) {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");

  const [maticConnected, setMaticConnected] = useState();

  React.useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        console.log("case 1");
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        window.web3.eth.net.getId().then((netId) => {
          if (netId != config.NET_ID) {
            setMaticConnected(false);
            console.log("connect to matic");
          }
        });
        // window.web3 = new Web3(window.ethereum);
        // await window.ethereum.enable();
      } else {
        console.log("case 3");
        window.alert("Non-ethereum browser detected!");
      }
    };
    const loadBlockchainData = async () => {
      const web3 = window.web3;
      console.log(web3);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log(accounts, "ACCOUNTS");
      if (accounts.length > 0) {
        console.log("FOUND ACCOUNT!");
        setAccount(accounts[0]);
      }
    };

    const getBalance = (account) => {
      web3.eth.getBalance(account, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          setBalance(web3.utils.fromWei(res, "ether"));
          // console.log(web3.utils.fromWei(res, "ether"), "BALANCE");
        }
      });
    };

    const listenMMAccount = async () => {
      window.ethereum.on("accountsChanged", async function () {
        let accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          getBalance(accounts[0]);
        } else {
          setAccount([]);
        }
      });
    };

    if (typeof window.ethereum !== "undefined") {
      setConnected(true);
      loadWeb3();
      loadBlockchainData();
      listenMMAccount();
    }
  }, []);

  return (
    <div className="">
      <Navbar account={account} balance={balance} connected={connected} />
      <Component {...pageProps} account={account} connected={connected} />
      <Footer />
      {maticConnected == false && (
        <div className="transition transform fixed z-100 top-0 inset-x-0 pb-2 sm:pb-5 opacity-100 scale-100 translate-y-0 ease-out duration-500">
          <div className="bg-gray-800 text-white flex justify-center items-center cursor-pointer mx-auto px-12">
            Connect to Matic
          </div>
        </div>
      )}
    </div>
  );
}

export default MyApp;
