import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import config from "../utils/config";
const Web3 = require("web3");
var web3 = new Web3(Web3.givenProvider || config.RPC_URL);

const ipfsLoader = ({ src, width, quality }) => {
  return `https://cloudflare-ipfs.com/ipfs/${src}?w=${width}`;
};

const DapCard = ({ title, gif }) => {
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
      className={`shadow-lg m-4 group p-4 cursor-pointer transition-opacity duration-200 ease-in transform sm:hover:scale-105 hover:z-50`}
    >
      <Image
        loader={ipfsLoader}
        src={gif}
        layout="responsive"
        height={1080}
        width={1920}
      />

      <div className="p-4">
        <p className="font-bold truncate max-w-md">{title}</p>
        <h2 className="mt-1 text-2xl transition-all duration-100 ease-in-out group-hover:font-bold">
          {title}
        </h2>
        <p className="flex items-center opacity-0 group-hover:opacity-100">
          Gang Shit
        </p>
      </div>
    </div>
  );
};

export default DapCard;
