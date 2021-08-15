import React, { useState, useContext, useEffect } from "react";

import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import config from "../utils/config";

import { BsFillExclamationCircleFill } from "react-icons/bs";

const Web3 = require("web3");
var web3 = new Web3(Web3.givenProvider || config.RPC_URL);

function MyApp({ Component, pageProps }) {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");

  const [maticConnected, setMaticConnected] = useState();
  const [alertStatus, setAlertStatus] = useState(false);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      web3.eth.getAccounts().then((accounts) => {
        if (accounts[0]) {
          if (accounts[0].length > 0) {
            console.log("FOUND ACCOUNT!");
            setAccount(accounts[0]);
          }
          web3.eth.net.getId().then(async (netId) => {
            if (netId != config.NET_ID) {
              setMaticConnected(false);
              console.log("matic not connected!");
            } else {
              setMaticConnected(true);
              web3.eth.getBalance(accounts[0], (err, res) => {
                if (err) {
                  console.log(err);
                } else {
                  const wei = web3.utils.fromWei(res, "wei");
                  let matic = wei / 1000000000000000000;
                  setBalance(matic);
                  // console.log(web3.utils.fromWei(res, "ether"), "BALANCE");
                }
              });
            }
          });
        }
      });
      // window.web3 = new Web3(window.ethereum);
      // await window.ethereum.enable();
    } else {
      console.log("case 3");
      window.alert("Non-ethereum browser detected!");
    }
  };

  useEffect(() => {
    // const getBalance = (account) => {
    //   web3.eth.getBalance(account, (err, res) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       setBalance(web3.utils.fromWei(res, "MATIC"));
    //       // console.log(web3.utils.fromWei(res, "ether"), "BALANCE");
    //     }
    //   });
    // };

    const listenMMAccount = async () => {
      window.ethereum.on("accountsChanged", async function () {
        let accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          web3.eth.net.getId().then(async (netId) => {
            if (netId != config.NET_ID) {
              setMaticConnected(false);
              console.log("matic not connected!");
            } else {
              setMaticConnected(true);
              web3.eth.getBalance(accounts[0], (err, res) => {
                if (err) {
                  console.log(err);
                } else {
                  const wei = web3.utils.fromWei(res, "wei");
                  let matic = wei / 1000000000000000000;
                  setBalance(matic);
                  // console.log(web3.utils.fromWei(res, "ether"), "BALANCE");
                }
              });
            }
          });
        } else {
          setBalance();
          setAccount([]);
        }
      });
    };

    if (typeof window.ethereum !== "undefined") {
      setConnected(true);
      loadWeb3();
      listenMMAccount();
    }
    loadWeb3();
  }, []);

  useEffect(() => {
    if (maticConnected == false) {
      setAlertStatus(true);
    }
  }, [maticConnected]);

  return (
    <div className="">
      <Navbar
        account={account}
        balance={balance}
        connected={connected}
        maticConnected={maticConnected}
      />
      <Component
        {...pageProps}
        account={account}
        connected={connected}
        maticConnected={maticConnected}
        setMaticConnected={setMaticConnected}
      />
      <Footer />
      {maticConnected == false && account.length > 0 && alertStatus == true && (
        <div
          onClick={() => {
            setAlertStatus(false);
          }}
          className="fixed z-100 flex items-end flex-col bottom-0 right-0 transition transform  pb-2 sm:pb-5 opacity-100 scale-100 translate-y-0 ease-out duration-500 "
        >
          <div className="space-x-4 border-l-4 border-blue-600 bg-gray-800 text-white text-xl flex justify-center items-center cursor-pointer mx-auto py-6 px-8">
            <BsFillExclamationCircleFill size={24} />
            <div>Please connect to the Ethereum network.</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyApp;
