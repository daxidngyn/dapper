import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FaWallet } from "react-icons/fa";

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

const DapInfo = () => {
  const router = useRouter();
  const { hash } = router.query;

  const [dapData, setDapData] = useState({});
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
        <div>{dapData.status}</div>
      </div>

      <img
        src={`https://cloudflare-ipfs.com/ipfs/${dapData.ipfsVideoHash}`}
        className="w-96 h-96"
      />
      <div>
        <button className="ring-blue-500 ring-2 p-2 rounded-md flex items-center space-x-1.5 group hover:bg-blue-500">
          <FaWallet
            size={18}
            className="text-blue-500 group-hover:text-white"
          />
          <a className="text-xl text-blue-500 group-hover:text-white">Mint</a>
        </button>
      </div>
    </div>
  );
};

export default DapInfo;
