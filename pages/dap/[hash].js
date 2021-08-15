import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { FaWallet, FaEthereum } from "react-icons/fa";
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
  console.log(dapId);
  ethereum
    .request({
      method: "eth_sendTransaction",
      params: [
        {
          from: window.web3.currentProvider.selectedAddress,
          to: config.CONTRACT_ADDR,
          value: (1000000000000000000).toString(16),
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
    .post(
      "https://dapper-backend.vercel.app/api/tokensale/confirmTransaction",
      {
        dapTokenIds: dap,
        status: status,
        minterAddress: addr,
      }
    )
    .then(function (data) {
      console.log(data);
      window.location.reload(false);
    })
    .catch(function (res) {});
}

const DapInfo = () => {
  const router = useRouter();
  const { hash } = router.query;

  const [dapData, setDapData] = useState({});
  const [disable, setDisable] = useState(false);
  const [minter, setMinter] = useState("");

  useEffect(() => {
    const getDaps = async () => {
      const res = await axios(
        "https://dapper-backend.vercel.app/api/dap/" + hash
      );
      setDapData(res.data.dap);
    };
    getDaps();
  }, []);

  useEffect(() => {
    console.log(dapData);

    if (dapData.status === "claimed") {
      axios
        .post("https://dapper-backend.vercel.app/api/dap/minter", {
          id: dapData.tokenId,
        })
        .then(function (res) {
          setMinter(res.data.daps[0]);
        });
    }
  }, [dapData]);

  return (
    <div className="lg:pt-24 lg:pb-40 max-w-5xl container flex mx-auto pt-12 pb-24">
      <div className="lg:grid grid-cols-2 w-full flex flex-col items-center">
        <div className="w-full flex flex-col items-center space-y-6 px-4 lg:px-0">
          <h1 className="text-4xl tracking-wide font-semibold lg:hidden">
            {dapData.name}
          </h1>
          <div className="h-80 w-full max-w-lg">
            <div className="relative h-full w-full">
              <Image loader={ipfsLoader} src={hash} layout="fill" />
            </div>
          </div>
          {dapData.status === "claimed" && (
            <div className="flex items-center space-x-4">
              <a
                href={`https://testnets.opensea.io/assets/${config.CONTRACT_ADDR}/${dapData.tokenId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-white bg-blue-500 p-2 rounded-md hover:ring ring-blue-400"
              >
                Trade
              </a>

              <a
                href={`https://testnets.opensea.io/accounts/${minter}/dapper-v3`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-white bg-blue-500 p-2 rounded-md hover:ring ring-blue-400"
              >
                View owner
              </a>
            </div>
          )}
        </div>

        <div className="lg:px-8 px-4 space-y-4 max-w-3xl w-full py-12 h-full">
          <h1 className="text-4xl tracking-wide font-semibold hidden lg:block">
            {dapData.name}
          </h1>
          <div className="bg-gray-50 rounded-md border border-gray-100">
            <div className="space-y-2 p-2">
              <div className="text-2xl">Price</div>
              <div className="flex items-center space-x-1.5">
                <FaEthereum size={24} />
                <span className="text-3xl font-semibold">0.0032</span>
              </div>
              {dapData.status === "claimed" ? (
                <div className="lg:w-5/12 ring-blue-500 ring-2 p-2 flex justify-center items-center rounded-md bg-blue-500 ">
                  <a className="text-xl text-white">Claimed</a>
                </div>
              ) : (
                <button
                  className="lg:w-5/12 ring-blue-500 ring-2 p-2 rounded-md flex justify-center items-center space-x-2 group hover:bg-blue-500"
                  id="mint"
                  onClick={() => {
                    let Contract = null;
                    axios
                      .get("https://dapper-backend.vercel.app/api/dap/contract")
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
                        .post(
                          "https://dapper-backend.vercel.app/api/tokensale/buyDap",
                          {
                            dap: dapName,
                          }
                        )
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
                  <a className="text-xl text-blue-500 group-hover:text-white">
                    Mint
                  </a>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col justify-center items-center space-y-2">
        <h1 className="text-4xl tracking-wide font-semibold">{dapData.name}</h1>
      </div>

      <div className="h-80 w-full max-w-lg">
        <div className="relative h-full w-full">
          <Image loader={ipfsLoader} src={hash} layout="fill" />
        </div>
      </div>

      <div>
        {dapData.status === "claimed" ? (
          <div className="flex justify-center items-center space-x-4">
            <div className="ring-blue-500 ring-2 p-2 rounded-md flex items-center space-x-1.5 bg-blue-500">
              <a className="text-xl text-white">Claimed</a>
            </div>

            <div>
              <a href="#">{minter}</a>
            </div>
          </div>
        ) : (
          <button
            className="ring-blue-500 ring-2 p-2 rounded-md flex items-center space-x-1.5 group hover:bg-blue-500"
            id="mint"
            onClick={() => {
              let Contract = null;
              axios
                .get("https://dapper-backend.vercel.app/api/dap/contract")
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
                  .post(
                    "https://dapper-backend.vercel.app/api/tokensale/buyDap",
                    {
                      dap: dapName,
                    }
                  )
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
        )}
      </div> */}
    </div>
  );
};

export default DapInfo;
