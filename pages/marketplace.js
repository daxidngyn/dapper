import React, { useState, Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";

import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { FaWallet, FaAngleLeft, FaAngleRight } from "react-icons/fa";

const navigation = [
  { name: "Marketplace", href: "/marketplace", current: false },
  { name: "FAQ", href: "/faq", current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Marketplace = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <div
        className={`shadow-md text-gray-900 h-screen flex items-start justify-start border-r-2 border-gray-300 ${
          open ? "w-64" : "w-12"
        }`}
      >
        <div className="flex w-full">
          {open ? (
            <div className="flex  w-full justify-end items-center mt-1 border-b-2 p-2">
              <FaAngleLeft
                className="block h-6 w-6 cursor-pointer"
                aria-hidden="true"
                onClick={() => setOpen(false)}
              />
            </div>
          ) : (
            <div className="flex w-full justify-center items-center p-2 hover:ring-gray-300 mt-1 hover:ring-2 hover:bg-gray-400 hover:text-white  cursor-pointer">
              <FaAngleRight
                className="block h-6 w-6"
                aria-hidden="true"
                onClick={() => setOpen(true)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="bg-blue-100 flex flex-1">Test</div>

      {/* <>
          Marketplace
           className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 ">
            <span className="sr-only">Open main menu</span>
            {open ? (
              <div className="flex">
                <div>Open</div>
                
              </div>
            ) : (
              <FaAngleRight
                className="block h-6 w-6"
                aria-hidden="true"
                onClick={() => setOpen(true)}
              />
            )}
          
        </> */}
    </div>
  );
};

export default Marketplace;
