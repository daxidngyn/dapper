import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { FaWallet } from "react-icons/fa";
import config from "../../utils/config";

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

const ipfsLoader = ({ src, width, quality }) => {
  return `https://cloudflare-ipfs.com/ipfs/${src}`;
};

const Web3 = require("web3");
const web3_matic = new Web3(
  "https://rpc-mumbai.maticvigil.com/v1/a8f72913d3433046ab491c005256aec91a7a92b0"
);

const mintingDap = async (dapId, contract) => {
  const oneMATIC = 1000000000000000000;
  console.log(dapId);
  ethereum
    .request({
      method: "eth_sendTransaction",
      params: [
        {
          from: window.web3.currentProvider.selectedAddress,
          to: config.CONTRACT_ADDR,
          value: (0).toString(16),
          data: contract.methods.mintDap(dapId).encodeABI(),
        },
      ],
    })
    .then(function (txHash) {
      console.log(txHash);
      alert("Purchase successful.");
      confirmTrxBackend(
        dapId[0],
        "claimed",
        window.web3.currentProvider.selectedAddress
      );
    })
    .catch(function (error) {
      console.log("failed minting", error);
      alert("Purchase failed.");
      confirmTrxBackend(
        dapId[0],
        "available",
        window.web3.currentProvider.selectedAddress
      );
    });
};

function confirmTrxBackend(dap, status, addr) {
  axios
    .post("http://localhost:3001/api/tokensale/confirmTransaction", {
      dapTokenIds: dap,
      status: status,
      minterAddress: addr,
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (res) {});
}

const DapInfo = () => {
  const router = useRouter();
  const { hash } = router.query;

  const [dapData, setDapData] = useState({});
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const getDaps = async () => {
      const res = await axios(
        "https://dapper-backend.vercel.app/api/dap/allDaps"
      );
      res.data.daps.map((dap) => {
        if (dap.ipfsVideoHash == hash) {
          setDapData(dap);
          console.log(dapData, "dap info");
        }
      });
    };
    getDaps();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center space-y-4 p-4">
      <div className="flex flex-col justify-center items-center space-y-2">
        <h1 className="text-2xl tracking-wider uppercase">{dapData.name}</h1>
      </div>

      <div className="h-64 w-full max-w-md">
        <div className="relative h-full w-full">
          <Image loader={ipfsLoader} src={hash} layout="fill" />
        </div>
      </div>

      <div>
        {dapData.status === "available" ? (
          <button
            className="ring-blue-500 ring-2 p-2 rounded-md flex items-center space-x-1.5 group hover:bg-blue-500"
            id="mint"
            onClick={() => {
              let Contract = null;
              axios
                .get("http://localhost:3001/api/dap/contract")
                .then(function (data) {
                  return data.data.abi;
                })
                .then(function (abi) {
                  Contract = new web3_matic.eth.Contract(
                    abi,
                    config.CONTRACT_ADDR
                  );

                  // return new web3_matic.eth.Contract(abi, config.contractAddr);
                });
              const mintDap = async (dapName) => {
                axios
                  .post("http://localhost:3001/api/tokensale/buyDap", {
                    dap: dapName,
                  })
                  .then(function (data) {
                    mintingDap(data.data.daps, Contract);
                  });
              };

              mintDap(dapData.name);
            }}
          >
            <FaWallet
              size={18}
              className="text-blue-500 group-hover:text-white"
            />
            <a className="text-xl text-blue-500 group-hover:text-white">Mint</a>
          </button>
        ) : (
          <button className="ring-blue-500 ring-2 p-2 rounded-md flex items-center space-x-1.5 group hover:bg-blue-500">
            <a className="text-xl text-blue-500 group-hover:text-white">
              Claimed
            </a>
          </button>
        )}
      </div>
    </div>
  );
};

export default DapInfo;
