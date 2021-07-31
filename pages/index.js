import Head from "next/head";
import Image from "next/image";

import Footer from "../components/Footer";
import svgHandshake from "../assets/svgHandshake.svg";
import imgHandshake from "../assets/imgHandshake.png";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Dapper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="pt-24 container px-4 mx-auto flex flex-wrap flex-col items-center w-full text-gray-900">
        {/* <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="text-5xl font-semibold tracking-wide text-gray-900">
            Dapper
          </h1>
          <div className="text-xl font-medium text-gray-600">Placeholder</div>
        </div>
        <div className="absolute top-0">
          <Image src={svgHandshake} />
        </div> */}
        <div className="grid grid-cols-2 w-full">
          <div className="pl-36 space-y-12 pt-2">
            <div className="space-y-1">
              <div className="text-7xl font-semibold">Welcome to</div>
              <div className="text-blue-600 font-bold text-8xl">Dapper</div>
            </div>
            <div>
              <div className="text-2xl text-gray-700">
                The greeting we all know and love, now digitalized.
              </div>
            </div>
            <div className="space-x-8">
              <button className="p-4 bg-gray-800 ring-2 ring-gray-900 text-white rounded-sm hover:bg-gray-700 hover:ring-gray-800 delay-50 ease-in-out">
                Connect wallet
              </button>
              <button className="p-4 bg-blue-600 ring-2 ring-blue-500 text-white rounded-sm hover:bg-blue-500 hover:ring-blue-400 delay-50 ease-in-out">
                Explore our marketplace &rarr;
              </button>
            </div>
          </div>

          <div>
            <Image src={imgHandshake} />
          </div>
        </div>
      </div>

      {/* <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by editing{" "}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            pages/index.js
          </code>
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <a
            href="https://nextjs.org/docs"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
            <p className="mt-4 text-xl">
              Find in-depth information about Next.js features and API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Learn &rarr;</h3>
            <p className="mt-4 text-xl">
              Learn about Next.js in an interactive course with quizzes!
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Examples &rarr;</h3>
            <p className="mt-4 text-xl">
              Discover and deploy boilerplate example Next.js projects.
            </p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Deploy &rarr;</h3>
            <p className="mt-4 text-xl">
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer> */}
    </div>
  );
}
