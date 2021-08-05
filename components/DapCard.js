import Image from "next/image";
import svgHandshake from "../assets/svgHandshake.svg";

const DapCard = ({ title, gif }) => {
  return (
    // <div className="flex-auto p-4 bg-red-100 w-64">
    //   <div className="h-64 relative">
    //     <Image src={gif} alt="featured_dap" objectFit="cover" layout="fill" />
    //   </div>

    //   <div className="px-6 py-4 w-full bg-red-200">
    //     <div className="font-bold">{title}</div>
    //   </div>
    // </div>
    <div className="bg-red-200  group m-4 p-4 cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50">
      <Image src={gif} layout="responsive" height={1080} width={1920} />

      <div className="p-4 bg-red-100">
        <p className="font-bold truncate max-w-md">{title}</p>
        <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">
          {title}
        </h2>
        <p className="flex items-center opacity-0 group-hover:opacity-100">
          Gang Shit
        </p>
      </div>
    </div>
  );
};

export default DapCard;
