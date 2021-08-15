import Image from "next/image";
import { useState, useEffect } from "react";

import FAQ from "../public/FAQ.svg";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Faq = () => {
  const [question, setquestion] = useState(0);

  useEffect(() => {
    setquestion(null);
  }, []);
  return (
    <div className="pt-16 pb-12">
      <div className="container mx-auto pt-16 pb-5`">
        <div className="text-center pb-3 md:pb-10 xl:pb-20">
          <h1 className="px-2 xl:px-0 xl:text-5xl md:text-3xl text-2xl ">
            <Image src={FAQ} />
          </h1>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col space-y-8">
            <div>
              <div
                className="bg-gray-200 cursor-pointer p-4 rounded-md flex justify-between items-center"
                onClick={() =>
                  question === 0 ? setquestion(null) : setquestion(0)
                }
              >
                <h1 className="text-xl">How do I mint a Dap?</h1>
                {question == 0 ? (
                  <FiChevronUp size={24} />
                ) : (
                  <FiChevronDown size={24} />
                )}
              </div>
              {question === 0 && (
                <div className="p-2 text-lg bg-gray-50  rounded-md">
                  Simply go to the Marketplace click on your desired handshalke
                  and press mint! Once you mint iot it wll show that uyoui
                  claiomed it.You will also need a Metamask wallet.
                </div>
              )}
            </div>

            <div>
              <div
                className="bg-gray-200 cursor-pointer p-4 rounded-md flex justify-between items-center"
                onClick={() =>
                  question === 1 ? setquestion(null) : setquestion(1)
                }
              >
                <h1 className="text-xl">How do I get Matic?</h1>
                {question == 0 ? (
                  <FiChevronUp size={24} />
                ) : (
                  <FiChevronDown size={24} />
                )}
              </div>
              {question === 1 && (
                <div className="p-2 text-lg bg-gray-50 rounded-md">
                  If you DON'T live in the United States: Go to TRANSAK and buy
                  some directly on the Matic network (MAKE SURE YOU PURCHASE
                  MATIC ON THE MATIC NETWORK). If you live in the United States:
                  Get Ethereum and transfer Ethereum to Matic using the official
                  bridge: https://wallet.matic.network/bridge/. You will pay gas
                  for the transfer, but everything else you do on the Matic
                  network (buy, trade, sell) will have extremely low gas fees.{" "}
                </div>
              )}
            </div>

            <div>
              <div
                className="bg-gray-200 cursor-pointer p-4 rounded-md flex justify-between items-center"
                onClick={() =>
                  question === 2 ? setquestion(null) : setquestion(2)
                }
              >
                <h1 className="text-xl">Where is the data stored?</h1>
                {question == 0 ? (
                  <FiChevronUp size={24} />
                ) : (
                  <FiChevronDown size={24} />
                )}
              </div>
              {question === 2 && (
                <div className="p-2 text-lg bg-gray-50 rounded-md">
                  We store data on IPFS and will subsidize all NFTs storage on
                  IPFS, so you're not responsible for maintaining your dap's NFT
                  data.{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
