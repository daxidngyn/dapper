import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import config from "../utils/config";
const Web3 = require("web3");
var web3 = new Web3(Web3.givenProvider || config.RPC_URL);
import { FaEthereum } from "react-icons/fa";

const ipfsLoader = ({ src, width }) => {
  return `https://cloudflare-ipfs.com/ipfs/${src}?w=${width}`;
};

const DapCard = ({ title, gif, status }) => {
  return (
    <div
      onClick={() => {
        if (!window.ethereum) {
          console.log("user not logged");
        } else {
          web3.eth.getAccounts().then((accounts) => {
            if (accounts[0]) {
              web3.eth.net.getId().then(async (netId) => {
                console.log(netId);
              });
            } else {
              console.log("not connected");
            }
          });
        }
      }}
      className={`${
        status == "claimed" && "bg-gray-200"
      } space-y-2 border border-gray-200 rounded-md m-4 group p-4 cursor-pointer transition-opacity duration-200 ease-in transform sm:hover:shadow-md hover:z-50`}
    >
      <Image
        loader={ipfsLoader}
        src={gif}
        layout="responsive"
        height={1080}
        width={1920}
      />

      <div className="flex justify-between items-center">
        <h1 className="font-semibold truncate max-w-md text-2xl">{title}</h1>
        <div className="flex items-center space-x-1">
          <FaEthereum />
          <div className="text-xl">0.0032</div>
        </div>
        {/* <p className="flex items-center opacity-0 group-hover:opacity-100">
          subheader
        </p> */}
      </div>
    </div>
  );
};

export default DapCard;
