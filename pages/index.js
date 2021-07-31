import Head from "next/head";
import Image from "next/image";

import svgHandshake from "../assets/svgHandshake.svg";
import imgHandshake from "../assets/imgHandshake.png";
import DapCard from "../components/DapCard";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function Home() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div className="">
      <Head>
        <title>Dapper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="pb-8 md:pt-24 sm:pt-12 pt-6 container mx-auto flex flex-wrap flex-col items-center w-full text-gray-900 px-4">
        <div className="grid md:grid-cols-2 w-full grid-cols-1">
          <div className="2xl:pl-36 space-y-12 pt-2 md:order-1 order-2">
            <div className="space-y-1">
              <div className="xl:text-7xl md:text-6xl sm:text-7xl text-5xl font-semibold">
                Welcome to
              </div>
              <div className="xl:text-8xl lg:text-7xl sm:text-8xl text-7xl text-blue-600 font-bold">
                Dapper
              </div>
            </div>
            <div>
              <div className="text-2xl text-gray-700">
                The greeting we all know and love, now digitalized.
              </div>
            </div>
            <div className="space-x-8 flex">
              <button className="lg:p-4 p-2 bg-gray-800 ring-2 ring-gray-900 text-white rounded-sm hover:bg-gray-700 hover:ring-gray-800 delay-50 ease-in-out">
                Connect wallet
              </button>
              <button className="lg:p-4 p-2 bg-blue-600 ring-2 ring-blue-500 text-white rounded-sm hover:bg-blue-500 hover:ring-blue-400 delay-50 ease-in-out">
                Explore our marketplace &rarr;
              </button>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <Image src={imgHandshake} />
          </div>
        </div>
      </div>
      {/* WHAT IS DAPPER */}
      <div className=" h-auto p-64 bg-hero-pattern">
        <div className="flex justify-center items-center bg-blue-200 p-20 mx-auto">
          What is Dapper?
        </div>
      </div>
      {/*md:pt-24 sm:pt-12 pt-6 container mx-auto flex flex-wrap flex-col items-center*/}
      <div className="text-center w-full text-gray-900 px-12 md:pt-18 sm:pt-12 pt-6 container mx-auto ">
        <div className="text-2xl font-medium">Featured Daps</div>
        <Slider {...settings} className="">
          <DapCard title="1" />
          <DapCard title="2" />
          <DapCard title="3" />
        </Slider>
      </div>
    </div>
  );
}
