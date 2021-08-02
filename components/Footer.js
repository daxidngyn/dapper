import React from "react";
import { FaEthereum } from "react-icons/fa";
function Footer() {
  const navigation = [
    { name: "Marketplace", href: "#", current: false },
    { name: "FAQ", href: "#", current: false },
  ];

  return (
    <>
      <div className="border-t-2">
        <div className="mx-auto container pt-8 flex flex-col items-center justify-center">
          <div>
            <FaEthereum size={56} />
          </div>
          <div className="text-black flex flex-col md:items-center">
            {/* <h1 className="text-2xl font-black">Dapper</h1> */}
            <div className="my-6">
              <ul className="flex items-center space-x-8">
                {navigation.map((route) => (
                  <li className="cursor-pointer lg:py-0" key={route.name}>
                    {route.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* <div className="text-sm text-color mb-10">
              <p> © 2020 Dapper. All rights reserved</p>
            </div> */}
          </div>
          <div className="w-5/6 h-0.5 bg-gray-100 rounded-full" />
          <div className="mt-4 flex items-center space-x-8 text-gray-500 font-light pb-4">
            <h2 className="cursor-pointer">Terms of use</h2>
            <h2 className="cursor-pointer">Privacy policy</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
