import { Fragment, useContext, useEffect } from "react";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { FaWallet, FaCopy } from "react-icons/fa";
import metamaskLogo from "../public/metamask.png";

const navigation = [
  { name: "Marketplace", href: "/marketplace", current: false },
  { name: "FAQ", href: "/faq", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const config = {
  CONTRACT_ADDR: "0xdB66AcA61A75F38101b40c94155Fb1A1a872115c",
  NET_ID: 80001,
  CHAIN_ID: "0x13881",
  CHAIN_NAME: "Matic Testnet Mumbai",
  RPC_URL:
    "https://rpc-mumbai.maticvigil.com/v1/a8f72913d3433046ab491c005256aec91a7a92b0",
  BLOCK_EXPLORER_URL: "https://explorer-mainnet.maticvigil.com/",
  ABI_URL: "contract/Dapper.json",
};

const Navbar = (props) => {
  useEffect(() => {
    if (props.account) {
      console.log(props.account, "PROPS");
    }
  }, [props]);

  return (
    <Disclosure as="nav" className="shadow-md text-gray-900">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <a
                    href="/"
                    className="text-2xl text-gray-900 font-semibold sm:bg-red-100 bg-blue-100 md:bg-green-100 lg:bg-yellow-100 xl:bg-pink-100"
                  >
                    Dapper
                  </a>
                </div>
                <div className="hidden sm:block sm:ml-6 w-full">
                  <div className="flex space-x-4 justify-end">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-900 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="bg-gray-200 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-gray-200">
                          <div className="text-gray-900">
                            <FaWallet size={24} />
                          </div>
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-72 text-sm rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                        >
                          {props.account.length > 0 ? (
                            <>
                              <div className="px-4 py-3 font-semibold flex justify-between items-center border-b">
                                <div>My wallet</div>
                                <div
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      props.account
                                    );
                                  }}
                                  className="cursor-pointer text-xs font-medium text-gray-500 flex items-center space-x-1"
                                >
                                  <div>{`${props.account.substr(
                                    0,
                                    6
                                  )}...${props.account.substr(-4)}`}</div>

                                  <FaCopy className="text-black" />
                                </div>
                              </div>
                              <Menu.Item>
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  My collection
                                </a>
                              </Menu.Item>
                              <Menu.Item
                                onClick={() => {
                                  const switchMaticChain = async () => {
                                    await ethereum
                                      .request({
                                        method: "wallet_addEthereumChain",
                                        params: [
                                          {
                                            chainId: config.CHAIN_ID,
                                            chainName: config.CHAIN_NAME,
                                            nativeCurrency: {
                                              name: "MATIC Token",
                                              symbol: "MATIC", // 2-6 characters long
                                              decimals: 18,
                                            },
                                            rpcUrls: [config.RPC_URL],
                                            blockExplorerUrls: [
                                              config.BLOCK_EXPLORER_URL,
                                            ],
                                          },
                                        ],
                                      })
                                      .then(async () => {
                                        console.log("worked?");
                                        window.location.reload(false);
                                        props.setMaticConnected(true);
                                      });
                                  };
                                  switchMaticChain();
                                }}
                              >
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Switch chain
                                </a>
                              </Menu.Item>

                              <div className="flex items-center px-4 space-x-2 py-2 text-xs font-medium text-gray-500">
                                <div>Total balance:</div>
                                <div>{props.balance}</div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="px-4 py-3 font-semibold flex justify-between items-center border-b">
                                Your wallet is not connected!
                              </div>
                              <div className="px-4 py-2 text-gray-600 font-medium text-xs">
                                Please select a wallet to connect to:
                              </div>
                              {props.account.length == 0 && props.connected && (
                                <div
                                  onClick={() => {
                                    window.ethereum
                                      .request({
                                        method: "eth_requestAccounts",
                                      })
                                      .catch((err) => {
                                        console.log(err, "err");
                                      });
                                  }}
                                  className="flex items-center space-x-1 px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                  <div className="relative h-8 w-8">
                                    <Image
                                      src={metamaskLogo}
                                      objectFit="cover"
                                      layout="fill"
                                    />
                                  </div>

                                  <div className="font-bold tracking-wide">
                                    MetaMask
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-900 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
