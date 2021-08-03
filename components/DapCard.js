import Image from "next/image";
import svgHandshake from "../assets/svgHandshake.svg";

const DapCard = ({ title, gif }) => {
  return (
    <div className="p-10 flex justify-center">
      <div className="max-w-sm rounded overflow-hidden shadow-lg w-full">
        <div className="h-64 relative">
          <Image src={gif} alt="featured_dap" objectFit="cover" layout="fill" />
        </div>

        <div className="px-6 py-4 text-center">
          <div className="font-bold text-xl mb-2">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default DapCard;
