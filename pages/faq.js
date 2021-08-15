import Image from "next/image";
import { useState, useEffect } from "react";

import FAQ from "../public/FAQ.svg";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Faq = () => {
  const [question, setQuestion] = useState(0);

  const questions = [
    {
      question: "What is Dapper?",
      answer:
        "Dapper is a meta-NFT handshake collectible based on Ethereum. We provide iconic handshakes from the web for you to mint!",
      id: 0,
    },
    {
      question: "How do I mint a Dap?",
      answer:
        "Simply go to the Marketplace, click on your desired handshake(dap), and press mint! Once you mint it it will show that you have claimed it. In addition, you will also need a Metamask wallet.",
      id: 1,
    },
    {
      question: "Where is the data stored?",
      answer:
        "We store data on IPFS and will subsidize all NFTs storage on IPFS, so you're not responsible for maintaining your dap's NFT data.",
      id: 2,
    },
    {
      question: "Can I trade my Daps?",
      answer:
        "You own your daps digitally and are free to do anything you like with them. Daps follow the ERC-721 standard so you can trade them on platforms such as Opensea.",
      id: 3,
    },
  ];

  useEffect(() => {
    setQuestion(null);
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
            {questions.map((pair) => (
              <div>
                <div
                  className="bg-gray-200 cursor-pointer p-4 rounded-md flex justify-between items-center"
                  onClick={() => {
                    question === pair.id
                      ? setQuestion(null)
                      : setQuestion(pair.id);
                    console.log(question);
                  }}
                >
                  <h1 className="text-xl">{pair.question}</h1>
                  {question == pair.id ? (
                    <FiChevronUp size={24} />
                  ) : (
                    <FiChevronDown size={24} />
                  )}
                </div>
                {question === pair.id && (
                  <div className="p-2 text-lg bg-gray-50  rounded-md">
                    {pair.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
