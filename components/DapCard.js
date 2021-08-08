import Image from "next/image";
import svgHandshake from "../assets/svgHandshake.svg";

const DapCard = ({ title, gif }) => {
  return (
    <div
      onClick={() => {
        console.log("PURCHASING DAP");
      }}
      className="shadow-lg m-4 group p-4 cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50"
    >
      <img src={gif} layout="responsive" height={1080} width={1920} />

      <div className="p-4">
        <p className="font-bold truncate max-w-md">{title}</p>
        <h2 className="mt-1 text-2xl transition-all duration-100 ease-in-out group-hover:font-bold">
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
