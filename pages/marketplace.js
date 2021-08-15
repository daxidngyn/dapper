import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaAngleLeft, FaAngleRight, FaFilter } from "react-icons/fa";

import DapCard from "../components/DapCard";
import axios from "axios";

const Marketplace = () => {
  const [open, setOpen] = useState(false);
  const [hashes, setHashes] = useState([]);

  useEffect(() => {
    axios("https://dapper-backend.vercel.app/api/dap/allDaps").then((res) => {
      setHashes(res.data.daps);
    });
  }, []);

  return (
    <>
      <div className="flex py-5">
        {/* Filter drawer */}
        {/* <div
          className={`shadow-md text-black min-h-screen flex items-start justify-start border-r border-gray-200 ${
            open ? "w-64" : "w-16"
          }`}
        >
          <div className="flex w-full">
            {open ? (
              <div
                className="flex w-full justify-between items-center mt-0.5 border-b p-4 hover:shadow-md cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <div className="flex items-center space-x-1.5">
                  <FaFilter />
                  <div className="text-gray-900">Filter</div>
                </div>
                <FaAngleLeft className="block h-6 w-6" aria-hidden="true" />
              </div>
            ) : (
              <div
                className="flex w-full justify-center items-center p-4 text-gray-600 mt-0.5 hover:shadow-md hover:text-black cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <FaAngleRight className="block h-6 w-6" aria-hidden="true" />
              </div>
            )}
          </div>
        </div> */}
        <div className="flex-1">
          {/* 3xl:flex  flex-wrap */}
          {/* */}
          <div
            className="px-5 sm:grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 
          3xl:grid-cols-4 4xl:grid-cols-5 5xl:grid-cols-6 6xl:grid-cols-7 xxl:grid-cols-8"
          >
            {hashes.map((hash) => (
              <Link
                href={"/dap/" + hash.ipfsVideoHash}
                // as={"/dap/" + hash.ipfsVideoHash}
                key={hash.ipfsVideoHash}
              >
                <div>
                  <DapCard title={hash.name} gif={hash.ipfsVideoHash} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Marketplace;
