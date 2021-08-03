import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight, FaFilter } from "react-icons/fa";

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
      {/* Filter drawer */}
      <div
        className={`shadow-md text-black h-screen flex items-start justify-start border-r border-gray-200 ${
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
      </div>

      <div className="flex flex-1">Test</div>
    </div>
  );
};

export default Marketplace;
