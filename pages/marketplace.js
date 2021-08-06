import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight, FaFilter } from "react-icons/fa";

import gif1 from "../public/GIFs/1.gif";
import gif2 from "../public/GIFs/2.gif";
import gif3 from "../public/GIFs/3.gif";
import gif4 from "../public/GIFS/4.gif";

import DapCard from "../components/DapCard";

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
    <>
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
        {/* flex-wrap */}
        <div className="flex-1">
          {/* 3xl:flex  flex-wrap */}
          <div
            className="px-5 my-10 sm:grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 
          3xl:flex  flex-wrap "
          >
            <DapCard title="OYEA" gif={gif1} />
            <DapCard title="dfhjsdkhfjdkshfjkdshfksd" gif={gif2} />
            <DapCard title="dfhjsdkhfjdkshfjkdshfksd" gif={gif3} />
            <DapCard title="dfhjsdkhfjdkshfjkdshfksd" gif={gif4} />
            <DapCard title="dfhjsdkhfjdkshfjkdshfksd" gif={gif1} />
            <DapCard title="dfhjsdkhfjdkshfjkdshfksd" gif={gif2} />
            <DapCard title="dfhjsdkhfjdkshfjkdshfksd" gif={gif3} />
            <DapCard title="dfhjsdkhfjdkshfjkdshfksd" gif={gif4} />
            <DapCard title="dfhjsdkhfjdkshfjkdshfksd" gif={gif1} />
            <DapCard title="dfhjsdkhfjdkshfjkdshfksd" gif={gif2} />
            <DapCard title="dfhjsdkhfjdkshfjkdshfksd" gif={gif3} />
            <DapCard title="4dfhjsdkhfjdkshfjkdshfksd" gif={gif4} />
            <DapCard title="1dfhjsdkhfjdkshfjkdshfksd" gif={gif1} />
            <DapCard title="2dfhjsdkhfjdkshfjkdshfksd" gif={gif2} />
            <DapCard title="dfhjsdkhfjdkshfjkdshfksd" gif={gif3} />
            <DapCard title="dfhjsdkhfjdkshfjkdshfksd" gif={gif4} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Marketplace;
