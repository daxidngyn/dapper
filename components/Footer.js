import React from "react";
import { FaBitcoin } from "react-icons/fa";
function Footer() {
  return (
    <>
      <div className="pb-8 border-t-2">
        <div className="mx-auto container pt-12 flex flex-col items-center justify-center">
          <div>
            <FaBitcoin size={100} />
          </div>
          <div className="text-black flex flex-col md:items-center pt-3">
            <h1 className="text-2xl font-black">Dapper</h1>
            <div className="my-6 text-base">
              <ul className="md:flex items-center pt-4">
                <li className=" md:mr-6 cursor-pointer lg:py-0">GAY</li>
                <li className=" md:mr-6 cursor-pointer lg:py-0">F</li>
                <li className=" md:mr-6 cursor-pointer lg:py-0">DAVE</li>
                <li className=" md:mr-6 cursor-pointer lg:py-0">BETA</li>
                <li className=" md:mr-6 cursor-pointer lg:py-0">LEX</li>
                <li className="cursor-pointer lg:py-0">SPED</li>
              </ul>
            </div>
            <div className="flex items-center mt-5 space-x-8 text-gray-500 font-light pb-4">
              <h2 className="cursor-pointer">Terms of use</h2>
              <h2 className="cursor-pointer">Privacy policy</h2>
            </div>
            {/* <div className="text-sm text-color mb-10">
              <p> © 2020 Dapper. All rights reserved</p>
            </div> */}
          </div>
          <div className="w-9/12  h-0.5 bg-gray-100 rounded-full" />
        </div>
      </div>
    </>
  );
}

export default Footer;
