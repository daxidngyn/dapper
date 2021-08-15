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
      // res.data.daps.map((dap) => {
      //   if (dap.ipfsVideoHash == hash) {
      //     setDapData(dap);
      //     console.log(dapData, "dap info");
      //   }
      // });
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
    <div className="flex flex-col justify-center items-center space-y-6 py-12">
      <div className="flex flex-col justify-center items-center space-y-2">
        <h1 className="text-2xl tracking-wider uppercase">{dapData.name}</h1>
      </div>

      <div className="h-80 w-full max-w-lg">
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
        ) : (
          <div className="flex justify-center items-center space-x-4">
            <div className="ring-blue-500 ring-2 p-2 rounded-md flex items-center space-x-1.5 bg-blue-500">
              <a className="text-xl text-white">Claimed</a>
            </div>

            <div>{minter}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DapInfo;
